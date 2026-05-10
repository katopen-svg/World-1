#!/usr/bin/env node
/**
 * build.mjs
 *
 * pages-md/*.md → pages/*.html へ変換するシンプルなビルダー。
 *
 * 使い方:
 *   node build.mjs              # 全ページをビルド
 *   node build.mjs <slug>       # 単一ページのみビルド（例: 0-0_world1の始まり）
 *
 * 仕様:
 * - pages-md/ 直下の .md を marked で HTML 化
 * - _ で始まるファイル（_layout.md など）はテンプレ扱いでビルド対象外
 * - 各 HTML には styles.css へのリンクと、ヘッダー/フッターを自動付与
 * - インライン HTML（<div class="callout"> など）はそのままパススルー
 * - index.html は pages-md/ の全ファイルから自動生成（ステージ別グルーピング）
 */

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const ROOT = dirname(fileURLToPath(import.meta.url));
const MD_DIR = join(ROOT, "pages-md");
const OUT_DIR = join(ROOT, "pages");

// ───────────────────────────────────────────────
// marked 設定: HTML パススルー有効、見出しに id 自動付与
// ───────────────────────────────────────────────
marked.use({
  gfm: true,
  breaks: true,  // 単一改行 = <br>（Notion風）
  pedantic: false,
});

// ───────────────────────────────────────────────
// テンプレート
// ───────────────────────────────────────────────
function pageTemplate({ title, body, slug }) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)} | World1</title>
<link rel="stylesheet" href="../styles.css">
</head>
<body>
<header class="site-header">
  <a href="../index.html" class="site-header__home">← 目次に戻る</a>
</header>
<main class="lecture">
${body}
</main>
<footer class="site-footer">
  <p>World1 — AIでリサーチ業務を自動化して月5万達成</p>
</footer>
<script>
// stage-checklist: 全部 ✓ で .all-checked が付く（チェック数を問わない）
document.querySelectorAll('.stage-checklist').forEach(list => {
  const checkboxes = list.querySelectorAll('input[type="checkbox"]');
  if (checkboxes.length === 0) return;
  const update = () => {
    const all = [...checkboxes].every(cb => cb.checked);
    list.classList.toggle('all-checked', all);
  };
  checkboxes.forEach(cb => cb.addEventListener('change', update));
});
</script>
<script>
(function() {
  var WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxpOswPhEs6HACs0XA0pNS88zj9dHRyGkInlQLTQH81UZaJBe4tl1PiP2tI9A3xw0Cz/exec';
  function init() {
    var params = new URLSearchParams(window.location.search);
    var email = params.get('email');
    var stageId = params.get('stageId');
    var rowIndex = params.get('rowIndex');
    if (!email || !stageId || !rowIndex) return;
    var wrap = document.createElement('div');
    wrap.style.cssText = 'margin:60px auto 40px;max-width:500px;padding:0 20px;text-align:center;';
    var btn = document.createElement('a');
    btn.href = WEBAPP_URL + '?action=complete&email=' + encodeURIComponent(email) + '&stageId=' + encodeURIComponent(stageId) + '&rowIndex=' + rowIndex;
    btn.textContent = '\u2705 このアクションを完了する';
    btn.style.cssText = 'display:block;padding:18px 32px;background:linear-gradient(135deg,#22c55e,#16a34a);color:white;font-weight:bold;font-size:18px;text-decoration:none;border-radius:14px;box-shadow:0 6px 16px rgba(34,197,94,0.3);';
    var note = document.createElement('p');
    note.textContent = '\u62bc\u3059\u3068\u30b9\u30d7\u30b7\u3068\u30af\u30a8\u30b9\u30c8\u4e00\u89a7\u306e\u4e21\u65b9\u306b\u30c1\u30a7\u30c3\u30af\u304c\u5165\u308a\u307e\u3059';
    note.style.cssText = 'margin-top:12px;color:#6b7280;font-size:14px;';
    wrap.appendChild(btn);
    wrap.appendChild(note);
    document.body.appendChild(wrap);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
</body>
</html>
`;
}

// ───────────────────────────────────────────────
// スタンドアロンページ（ルート直下のMDをHTML化、index/教材本体とは独立）
// ───────────────────────────────────────────────
function standaloneTemplate({ title, body }) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<main class="lecture">
${body}
</main>
<footer class="site-footer">
  <p>World1 — 受講生向け配布資料</p>
</footer>
</body>
</html>
`;
}

function buildStandalonePage(filename) {
  const path = join(ROOT, filename);
  if (!existsSync(path)) return null;
  const md = readFileSync(path, "utf8");
  const title = extractTitle(md);
  let body = marked.parse(md);
  body = wrapH1Pipe(body);
  const html = standaloneTemplate({ title, body });
  const outName = filename.replace(/\.md$/, ".html");
  writeFileSync(join(ROOT, outName), html, "utf8");
  return outName;
}

function indexTemplate({ stages }) {
  const stageBlocks = stages.map(stage => `
  <section class="stage-block">
    <h2 class="stage-block__title">${escapeHtml(stage.label)}</h2>
    <ol class="stage-block__list">
${stage.items.map(item => `      <li><a href="pages/${item.slug}.html">${escapeHtml(item.title)}</a></li>`).join("\n")}
    </ol>
  </section>`).join("");

  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>World1 講座 — 目次</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<main class="lecture lecture--index">
  <h1 class="hero">World1</h1>
  <p class="hero__sub">AIでリサーチ業務を自動化して月5万達成</p>
${stageBlocks}
</main>
<footer class="site-footer">
  <p>World1 — AIでリサーチ業務を自動化して月5万達成</p>
</footer>
</body>
</html>
`;
}

// ───────────────────────────────────────────────
// ヘルパー
// ───────────────────────────────────────────────
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractTitle(md) {
  const m = md.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : "(無題)";
}

function detectStage(slug) {
  // 0-0_xxx → w1-0
  // 1-3_xxx → w1-1
  // 2.5-0_xxx → w1-2.5（裏ゴール）
  // 3-0_xxx → w1-3 ...
  const m = slug.match(/^([\d.]+)-/);
  if (!m) return { key: "other", label: "その他" };
  const step = m[1];
  if (step === "0") return { key: "w1-0", label: "w1-0｜World1の始まり" };
  if (step === "1") return { key: "w1-1", label: "w1-1｜道具の準備" };
  if (step === "2") return { key: "w1-2", label: "w1-2｜AI半自動化5ステップ" };
  if (step === "2.5") return { key: "w1-2.5", label: "w1-2.5｜裏ゴール（Addness連携）" };
  if (step === "3") return { key: "w1-3", label: "w1-3｜実案件を取りにいく" };
  if (step === "4") return { key: "w1-4", label: "w1-4｜実案件をやり切る" };
  if (step === "5") return { key: "w1-5", label: "w1-5｜月5万への道筋" };
  return { key: "other", label: "その他" };
}

function listMarkdownFiles() {
  const all = readdirSync(MD_DIR).filter(f => f.endsWith(".md") && !f.startsWith("_"));
  return all.sort((a, b) => {
    // 数字順ソート（0-0, 1-0, 1-2, 2-0, 2.5-0, 3-0, ...）
    // EX系は通常の番号より後 + EX内は番号順（EX0, EX1, ..., EX）
    const parse = s => {
      const numMatch = s.match(/^([\d.]+)-(\d+)/);
      if (numMatch) return [parseFloat(numMatch[1]) * 1000, parseInt(numMatch[2])];
      const exMatch = s.match(/^([\d.]+)-EX(\d*)/);
      if (exMatch) {
        const sub = exMatch[2] === "" ? 9999 : parseInt(exMatch[2]);
        return [parseFloat(exMatch[1]) * 1000 + 500, sub];
      }
      return [9999, 9999];
    };
    const [a1, a2] = parse(a);
    const [b1, b2] = parse(b);
    return a1 - b1 || a2 - b2 || a.localeCompare(b);
  });
}

// ───────────────────────────────────────────────
// h1 のタイトル「メイン｜サブ」を改行可能なセグメントに分解
// ───────────────────────────────────────────────
function wrapH1Pipe(html) {
  // h1 内に ｜ または | が含まれていれば、両側を nowrap セグメントに分割
  return html.replace(
    /<h1([^>]*)>([^<]+?)<\/h1>/g,
    (m, attrs, content) => {
      const idx = content.search(/[|｜]/);
      if (idx === -1) return m;
      const before = content.slice(0, idx).trim();
      const pipe = content[idx];
      const after = content.slice(idx + 1).trim();
      return `<h1${attrs}><span class="title-seg">${before}</span>${pipe}<span class="title-seg">${after}</span></h1>`;
    }
  );
}

// ───────────────────────────────────────────────
// ビルド
// ───────────────────────────────────────────────
function buildPage(file) {
  const md = readFileSync(join(MD_DIR, file), "utf8");
  const slug = file.replace(/\.md$/, "");
  const title = extractTitle(md);
  let body = marked.parse(md);
  body = wrapH1Pipe(body);
  const html = pageTemplate({ title, body, slug });
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, `${slug}.html`), html, "utf8");
  return { slug, title };
}

function buildIndex(builtPages) {
  const stageMap = new Map();
  for (const p of builtPages) {
    const stage = detectStage(p.slug);
    if (!stageMap.has(stage.key)) {
      stageMap.set(stage.key, { key: stage.key, label: stage.label, items: [] });
    }
    stageMap.get(stage.key).items.push(p);
  }
  // 順序: 数値順
  const stages = [...stageMap.values()].sort((a, b) => {
    const ord = ["w1-0", "w1-1", "w1-2", "w1-2.5", "w1-3", "w1-4", "w1-5", "other"];
    return ord.indexOf(a.key) - ord.indexOf(b.key);
  });
  const html = indexTemplate({ stages });
  writeFileSync(join(ROOT, "index.html"), html, "utf8");
}

// ───────────────────────────────────────────────
// メイン
// ───────────────────────────────────────────────
function main() {
  const arg = process.argv[2];
  const files = listMarkdownFiles();

  if (files.length === 0) {
    console.log("⚠ pages-md/ に .md がありません。終了。");
    return;
  }

  const targets = arg ? files.filter(f => f.replace(/\.md$/, "") === arg) : files;
  if (targets.length === 0) {
    console.log(`⚠ 一致するファイルがありません: ${arg}`);
    return;
  }

  const built = targets.map(f => {
    const r = buildPage(f);
    console.log(`✓ ${r.slug}.html`);
    return r;
  });

  // index は全ページから常に再生成
  const all = files.map(f => {
    const md = readFileSync(join(MD_DIR, f), "utf8");
    return { slug: f.replace(/\.md$/, ""), title: extractTitle(md) };
  });
  buildIndex(all);
  console.log(`✓ index.html (${all.length} pages)`);

  // ───────────────────────────────────────────────
  // スタンドアロンページのビルド（ルートにある独立配布物）
  // ───────────────────────────────────────────────
  const standalones = ["受講生スターターガイド.md"];
  for (const f of standalones) {
    const out = buildStandalonePage(f);
    if (out) console.log(`✓ ${out} (standalone)`);
  }
}

main();

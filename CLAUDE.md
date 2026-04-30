# AI Lesson 03 — World1 講座 HTML 教材

Notion/Medium 風の HTML 46ページで構成される World1 講座を、ヒアリング協働で作るプロジェクト。

---

## 📋 プロジェクト概要

- **目的**: 副業ゼロ・AI未経験の受講生が Claude Code で月5万を稼ぐまでの講座
- **形式**: Web 公開（GitHub Pages 想定）の HTML 46ページ
- **配信**: URL 共有が主、ローカル配布も可
- **執筆方法**: 「私が定型質問でヒアリング → 加藤さんが答える → 私が HTML 化 → レビュー」のサイクル

---

## 📁 ファイル構造

```
AI-lesson03/
├── README.md              # リポジトリ説明
├── CLAUDE.md              # このファイル（作業引き継ぎ用）
├── package.json
├── build.mjs              # MD → HTML ビルダー
├── styles.css             # 共通CSS（Notion/Medium 風）
├── index.html             # 自動生成された目次
├── pages/                 # ビルド出力（.html）
├── pages-md/              # 元データ（.md）
│   ├── _layout.md         # 共通レイアウト雛形
│   ├── _sample_design-preview.md    # CSS デモ（_ 始まりはビルド対象外）
│   └── X-Y_xxx.md
├── content-interview/     # ヒアリング素材（.md）
│   ├── _template.md       # 質問テンプレート
│   └── X-Y_xxx.md
└── assets/images/         # SVG 挿絵
```

---

## 🛠 ビルド方法

```bash
cd /Users/ryoto_kato/Desktop/AI-lesson03/
node build.mjs              # 全ページビルド
node build.mjs <slug>       # 単一ページのみビルド
```

`pages-md/*.md` を読み込み、`marked` で HTML 化、`pages/*.html` に出力。`index.html` も自動生成。

`_layout.md` `_sample_*.md` のように `_` で始まるファイルはビルド対象外。

---

## 🎯 受講生プロフィール（コンテンツ作成の前提）

- 副業をやってみたいけど、何から始めればいいか分からない
- AI ってよく聞くけど、ほとんど触ったことがない
- プログラミングなんて当然できない
- でも、月5万くらいは自分の力で稼げるようになりたい

---

## 🎨 デザイン・トーン方針

### CSS デザイン
- **方向性**: Notion/Medium 風カードUI
- **配色**: 白背景、本文 #2d2d2d、callout 5種（info/tip/warn/danger/success）
- **フォント**: Noto Sans JP（Web フォント）+ JetBrains Mono
- **最大幅**: 720px 中央寄せ
- **モバイル対応**: 〜640px でレイアウト調整

### 文体
- **口語、カジュアル**：「〜ですよね」「〜なんです」
- **感覚的な言葉**：「試す」「直す」「本番」のように、難しい言葉を避ける
- **具体例で説明**：抽象的な説明より、模擬案件のリアルな例を使う
- **比喩で導入**：投資の少額テスト、料理の味見、など日常の体験で例える

### 改行ルール
- `marked` の `breaks: true` で単一改行 = `<br>`（Notion風）
- 1文ごとに改行を入れて呼吸の間を作る
- タイトルの ｜ は build.mjs が自動でセグメント分割（CJK で意図しない改行が入らないように）

---

## ⚙️ 確定済みの設計判断（重要）

### 1. AI半自動化「3ステップ」に絞る（旧:5フェーズ）
- 旧設計の 5 フェーズは抽象度が高く、各ステップに 2-3 タスク詰まっていた
- 副業ゼロ層には負担大なので **3 ステップに簡素化**
- **試す**（少額テスト）→ **直す**（具体的指摘）→ **本番**（全件納品）
- 「次回用にメモ」は **おまけページ** として独立（任意）

### 2. ツール構成は 2 つだけ
- Claude Code（**デスクトップアプリ版**、ターミナルでは ない）
- スプレッドシート（Google Sheets）
- **Cursor は使わない**（旧プランから削除）
- Node.js は「おいおい」

### 3. 模擬案件は楽天キッチン雑貨 200 社
- 加藤さんの実装経験（楽天コスメ）に近い類題
- 一貫性のため w1-2 の全ページで同じ例を使用
- **マニュアル文書を Claude Code に読み込ませる** 流れが前提

### 4. checkpoint ページは 2 つのモード制
- **普通モード**：マニュアル渡して自分で 3 ステップ
- **サポートモード**：「ガッチリサポートプロンプト」をコピペ → Claude が教師役
- どちらでも達成すれば clear

### 5. 動画は完全廃止
- 旧プランの動画教材は全廃
- 全部 HTML で完結
- 必要に応じて挿絵（SVG）で補強

---

## 📝 ページのテンプレート構造

各ページは原則これに沿う：

```markdown
# タイトル｜サブタイトル

<img src="../assets/images/hero.svg" alt="..." class="hero-image">

> **ゴール**: このページを読み終えた時の状態を1〜2行で。

## 比喩・つかみ

「○○な人いますか？いないですよね。」型の比喩から入る（投資、料理、買い物など日常体験）

## 模擬案件で見てみる

楽天キッチン雑貨 200 社の文脈で具体例

## 自分の案件への当てはめ方

step-card で受講生が真似できるアクション

## 次のアクション

→ 次のページへのリンク
```

### よく使うクラス

| クラス | 用途 |
|---|---|
| `hero-image` | ページ冒頭の大きな挿絵 |
| `section-image` | 本文中の小さな挿絵 |
| `callout callout--info/tip/warn/danger/success` | 補足カード |
| `step-card` | 番号付きステップ |
| `terminal-block` | ターミナル風コードブロック |
| `compare-table` | Before/After 2カラム |
| `checkpoint` | チェックリスト |
| `stage-checklist` + `stage-clear-banner` | インタラクティブ達成バナー（ステージクリア時） |
| `os-grid` | Mac/Windows 並列レイアウト |

### インタラクティブ checkpoint（ステージクリア用）

```html
<div class="stage-checklist">
<p class="stage-checklist__title">👇 全部 ✓ できたらステージクリア</p>

<label class="check-item">
<input type="checkbox" class="c-1">
<span>項目 1</span>
</label>
<!-- ... 任意の数 ... -->

<div class="stage-clear-banner">
<div class="stage-clear-banner__emoji">🎉</div>
<p class="stage-clear-banner__title">w1-N STAGE CLEAR!</p>
<p class="stage-clear-banner__sub">サブメッセージ</p>
</div>
</div>
```

`build.mjs` に注入された JS が、全 `input` が checked になると自動で `.all-checked` クラスを付ける（CSS でバナー表示）。チェック数は何個でもOK。

---

## 📊 ページ進捗状況（2026-04-30）

### ✅ w1-0（1ページ完了）
- 0-0 World1の始まり

### ✅ w1-1（6ページ完了）
- 1-0 w1-1攻略
- 1-2 Claude Codeの役割
- 1-3 スプレッドシートの役割
- 1-4 作業フォルダの作り方
- 1-5 道具の役割を1枚で整理（w1-1 checkpoint）

### 🔄 w1-2（5ページ完了 / 6ページ予定）
- 2-0 w1-2攻略（3ステップの全体像）
- 2-1 試す（投資の比喩）
- 2-2 直す（料理の味見の比喩）
- 2-3 本番（投資の本格投入の比喩 + 投資詐欺ジョーク）
- 2-4 通し攻略（w1-2 checkpoint、2モード制）
- ⏳ **2-5 おまけ：メモを残す**（次にやる）

### ⏳ w1-3（未着手、7ページ予定）
- 3-0 w1-3攻略
- 3-1〜3-6 案件選びと応募

### ⏳ w1-4（未着手、8ページ予定）
- 4-0 w1-4攻略
- 4-1〜4-7 実案件納品

### ⏳ w1-5（未着手、6ページ予定）
- 5-0 w1-5攻略
- 5-1〜5-5 月5万への道筋

---

## 🖼 既存の挿絵 SVG 一覧（assets/images/）

| ファイル | 使用ページ | 内容 |
|---|---|---|
| `world1-journey.svg` | 0-0 | 5ステージ + ゴール のジャーニーマップ |
| `revenue-stairs.svg` | 0-0 | 月1万→3万→5万の階段＋トロフィー |
| `two-tools-flow.svg` | 1-0, 1-5 | あなた→Claude Code→スプシ→クライアント |
| `claude-code-ui-mockup.svg` | 1-0 | Claude Code デスクトップアプリのUIイメージ |
| `w1-1-actions-map.svg` | 1-0 | w1-1 の 4 アクション + 所要時間 |
| `claude-code-action.svg` | 1-2 | 指示→Claude→完了タスクのフロー |
| `claude-to-sheet.svg` | 1-3 | Claude Code がスプシに自動書き込み |
| `folder-goal.svg` | 1-4 | テスト01/案件001 の 2 階層フォルダツリー |
| `mac-newfolder.svg` | 1-4 | Mac Finder の右クリック→新規フォルダ |
| `windows-newfolder.svg` | 1-4 | Windows Explorer の右クリック→新規→フォルダー |
| `three-steps-flow.svg` | 2-0 | 試す→直す→本番 の3カード |
| `w1-2-actions-map.svg` | 2-0 | w1-2 の 4 アクション + おまけ |
| `chat-try-3.svg` | 2-1 | 試すフェーズの会話例（マニュアル添付）|
| `chat-fix.svg` | 2-2 | 直すフェーズの会話例（評価3.8の指摘） |
| `chat-production.svg` | 2-3 | 本番フェーズの会話例（200件完了+URL） |

---

## 🚀 次のタスク

1. **2-5 おまけ：メモを残す**（任意ページ、次回再利用のためのテンプレ化方法）
2. **w1-3 全ページ**（案件を取りにいく：7ページ）
3. **w1-4 全ページ**（実案件をやり切る：8ページ）
4. **w1-5 全ページ**（月5万への道筋：6ページ + index 完成）
5. **GitHub Pages デプロイ**（`.github/workflows/pages.yml`）

---

## 🤝 ヒアリングフロー

各ページの作成サイクル：

1. AI（私）が **4つくらいの focused question** を加藤さんに投げる
   - Q1. ゴール
   - Q2. つかみ（比喩）
   - Q3. 構成・例
   - Q4. ビジュアル / インタラクション

2. 加藤さんが回答（A/B/C/D 選択 + 自由回答）

3. AI が `content-interview/X-Y_xxx.md` に回答を記録

4. AI が `pages-md/X-Y_xxx.md` を執筆

5. 必要なら `assets/images/` に SVG 挿絵を追加

6. ビルド + ブラウザで開いて加藤さんに見せる

7. 加藤さんが OK / 修正点を返す → 反映 → 次のページへ

---

## 💡 加藤さんスタイル（よく出る指示）

- 「比喩はもっと身近に」（カレー → 投資 / 子犬 → 投資）
- 「言葉は感覚的に」（フェーズ → ステップ、半自動化 → 試す/直す/本番）
- 「○○さんは出さない」（"加藤さん"より"模擬案件"）
- 「2レベル制」（普通 vs サポートモード）
- 「ジョークも入れて」（投資詐欺の余談など）
- 「タイトルの改行が見づらい」→ 自動分割対応済み
- 「キャラはやっぱり消して」のような迅速な改修も歓迎

# AI Lesson 03 — World1 HTML 教材

Notion/Medium 風の HTML 46ページで構成される World1 講座。受講生は Web 公開された URL からブラウザで読む。

## 構造

```
AI-lesson03/
├── README.md              # このファイル
├── index.html             # 目次（46ページへのリンク）
├── styles.css             # 共通CSS
├── pages/                 # ビルド出力（HTML 46ページ）
├── pages-md/              # 元データ（Markdown 46ページ）
├── content-interview/     # ヒアリング素材
├── assets/images/         # スクリーンショット類
└── build.mjs              # MD → HTML ビルダー
```

## 執筆フロー

各アクションの内容は「ヒアリング → 執筆 → レビュー」のサイクルで作る。

1. **ヒアリング**: AI が `content-interview/_template.md` の質問を投げる
2. **回答**: 加藤さんがチャットで答える
3. **執筆**: AI が `pages-md/<id>_<title>.md` に Markdown 化
4. **ビルド**: `node build.mjs` で `pages/<id>_<title>.html` を生成
5. **レビュー**: 加藤さんがブラウザで開いてチェック

## ビルド

```bash
node build.mjs
```

`pages-md/*.md` を読み込み、`styles.css` を参照する HTML を `pages/` に出力する。

## 公開（GitHub Pages）

`.github/workflows/pages.yml` で push 時に自動デプロイ（後で設定）。

## 優先順位

| 優先度 | アクション数 | 内容 |
|---|---|---|
| 1 | 6本 | 0-0, 1-0, 1-2, 1-3, 1-4, 1-5（w1-0/w1-1） |
| 2 | 18本 | 2-0〜2-11, 2.5-0〜2.5-5（w1-2 + 裏ゴール） |
| 3 | 7本 | 3-0〜3-6（w1-3） |
| 4 | 8本 | 4-0〜4-7（w1-4） |
| 5 | 7本 | 5-0〜5-5（w1-5） + index.html 完成 |

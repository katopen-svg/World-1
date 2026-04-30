# デザインプレビュー（全要素テスト）

> **ゴール**: このページは全 CSS コンポーネントの見た目をブラウザで確認するためのサンプルです。実際の講座コンテンツではありません。

## 段落とインライン要素

これは普通の段落です。**太字** や *斜体*、それから `インラインコード` も使えます。本文のリンクは [このように](https://example.com) 表示され、ホバーで色が変わります。

## 番号付きリスト

1. ステップ 1：ターミナルを開く
2. ステップ 2：コマンドを実行する
3. ステップ 3：結果を確認する

## 引用ブロック（ゴール表示用）

> 受講生がこのアクションを終えた時、Claude Code がスプシに書き込めるようになる。

## コードブロック

```bash
cd ~/Desktop/AI-work/案件001_練習
claude
```

```javascript
// JavaScript の例
const message = "Hello, Claude Code";
console.log(message);
```

## ターミナルブロック（カスタム）

<div class="terminal-block">
node -v
</div>

<div class="terminal-block">
npm install -g @anthropic-ai/claude-code
</div>

## Callout — 5 種類

<div class="callout callout--info">
<strong>情報</strong>: これは情報のコールアウトです。補足説明や前提情報を伝える時に使います。
</div>

<div class="callout callout--tip">
<strong>ヒント</strong>: 効率を上げるテクニックや、こうすると楽というアドバイスを書きます。
</div>

<div class="callout callout--warn">
<strong>注意</strong>: つまずきやすいポイントや、間違えるとリカバリが大変な箇所の警告。
</div>

<div class="callout callout--danger">
<strong>危険</strong>: 個人情報や認証情報を取り扱う場面など、絶対にやってはいけないこと。
</div>

<div class="callout callout--success">
<strong>成功</strong>: 完了状態の確認や、ここまで来たら大丈夫という成功フィードバック。
</div>

## ステップカード

<div class="step-card">
<span class="step-card__num">1</span><strong>プロジェクトフォルダを作成</strong>

デスクトップに「AI-work」フォルダを作って、その中に「案件001_練習」を作る。
</div>

<div class="step-card">
<span class="step-card__num">2</span><strong>ターミナルでフォルダに移動</strong>

`cd ~/Desktop/AI-work/案件001_練習` を実行。
</div>

## 比較表（Before/After）

<div class="compare-table">
<div class="compare-table__bad">
案件文をそのままAIに渡して、AIが「人気」を解釈してしまう。
</div>
<div class="compare-table__good">
「評価4.0以上、レビュー50件以上」と数値で定義してから渡す。
</div>
</div>

## チェックポイント

<div class="checkpoint">

- ターミナルが開ける
- `node -v` でバージョンが表示される
- Claude Code が起動する

</div>

## FAQ

<div class="faq">
<p class="faq__q">Claude Code は無料で使えますか？</p>
<p class="faq__a">いいえ、月額のサブスクリプション（Pro プラン以上）が必要です。</p>
</div>

<div class="faq">
<p class="faq__q">プログラミング経験がないと無理ですか？</p>
<p class="faq__a">不要です。Claude Code は日本語で会話するだけで動きます。</p>
</div>

## キーボードキー

ターミナルを開く: <kbd class="kbd">⌘</kbd> + <kbd class="kbd">Space</kbd> → 「ターミナル」と入力

保存: <kbd class="kbd">⌘</kbd> + <kbd class="kbd">S</kbd>

## 通常テーブル

| 道具 | 役割 | 主な使い場面 |
|---|---|---|
| Claude Code | AI実行係 | リサーチ実行、データ整形、書き込み |
| スプレッドシート | 納品場所 | 成果物の納品、案件履歴の管理 |

---

## 次のアクション

→ ここに次のページへのリンクを置く想定

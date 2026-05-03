# Claude in Chrome を入れる｜Claude にブラウザを操作してもらう準備

> **ゴール**: Chrome に「Claude for Chrome」拡張機能をインストールして、Claude Code から「クラウドワークスを開いて」と頼むと、本当にChromeが動き出す状態を作る。

## このページで何をするか

[3-EX 応募の完全自動化](./3-EX_応募の完全自動化.html) の **Path A**（Claude Code 直接実行）を回すには、Claude が **あなたのChromeブラウザを見ながらクリックや入力ができる状態** にしておく必要があります。

そのための専用拡張機能が **Claude for Chrome**。Chrome に1回入れて、1回つなぐだけ。**所要時間 5〜10分**。

<div class="callout callout--info">
<strong>なぜ「拡張機能」を使うの？</strong><br>
Claude Code は、そのままだと「文字でやりとり」しかできません。Chrome 拡張を入れることで、ブラウザの画面を <strong>「見る・クリック・入力」</strong> という3つの動作ができるようになります。<br>
これで「クラウドワークスを開いて、リスト作成案件を10件持ってきて」みたいな指示が動くようになります。
</div>

---

## 全体の流れ

| ステップ | やること | 所要時間 |
|---|---|---|
| 1 | Chrome を開く | 30秒 |
| 2 | Chrome ウェブストアで「Claude for Chrome」を探す | 1分 |
| 3 | 「Chromeに追加」を押してインストール | 1分 |
| 4 | ツールバーにピン留めする | 30秒 |
| 5 | 拡張機能を「Connect（接続）」する | 1分 |
| 6 | Claude Code 側から動作確認 | 1〜2分 |

<div class="callout callout--tip">
<strong>必要なもの</strong>: Chrome ブラウザ（最新版）と、Claude Code Desktop（[1-1で導入済み](./1-1_claude-codeをインストール.html)）。それだけ。
</div>

---

## ステップ1｜Chrome を開く

<div class="step-card">
<span class="step-card__num">1</span><strong>Chrome を起動する</strong>

普段使っている Chrome で OK。Safari や Edge は <strong>使えません</strong>（拡張機能が Chrome 専用なので）。
</div>

<div class="callout callout--warn">
<strong>Chromeを使ったことがない方は</strong>: <code>https://www.google.com/chrome/</code> から先にインストールしてください（5分）。Mac標準のSafariや、Windows標準のEdgeでは動きません。
</div>

---

## ステップ2｜Chrome ウェブストアで拡張機能を探す

<div class="step-card">
<span class="step-card__num">1</span><strong>アドレスバーにこのURLを貼り付ける</strong>

<div class="terminal-block">
<pre><code>https://chromewebstore.google.com/</code></pre>
</div>

Enterを押すと「Chrome ウェブストア」のページに飛びます。
</div>

<div class="step-card">
<span class="step-card__num">2</span><strong>左上の検索欄に「<code>Claude for Chrome</code>」と入力</strong>

候補が複数出てくるので、<strong>作者が「anthropic.com」</strong> となっているものを選択。これが本物です。
</div>

<div class="callout callout--warn">
<strong>偽物に注意</strong>: 「Claude」と名前が付いた拡張機能は他にもあります。<strong>必ず作者が「anthropic.com」のもの</strong>を選んでください。それ以外はデータを抜き取る危険があります。
</div>

---

## ステップ3｜「Chromeに追加」でインストール

<div class="step-card">
<span class="step-card__num">1</span><strong>拡張機能のページにある青いボタン「Chromeに追加」を押す</strong>
</div>

<div class="step-card">
<span class="step-card__num">2</span><strong>「拡張機能を追加」のダイアログで承認</strong>

ポップアップで「権限を要求しています」と出ます。<strong>ブラウザのタブを読む権限</strong> などが必要になりますが、これは正しい挙動です（Claudeが画面を見るために必要）。「拡張機能を追加」を押してOK。
</div>

<div class="step-card">
<span class="step-card__num">3</span><strong>ツールバー右上に「Claude のアイコン」が現れる</strong>

Chromeの右上、アドレスバーの右隣あたりに、<strong>Cマークのアイコン</strong> が新しく追加されているはず。
</div>

---

## ステップ4｜拡張機能を「ピン留め」する

このままだと拡張機能アイコンが隠れて使いにくいので、**常に見える位置に固定** します。

<div class="step-card">
<span class="step-card__num">1</span><strong>ツールバー右上の「🧩 パズルピース」アイコンをクリック</strong>

インストールされている拡張機能の一覧がポップアップで表示されます。
</div>

<div class="step-card">
<span class="step-card__num">2</span><strong>「Claude」の右にある「📌 画びょうマーク」をクリック</strong>

押した瞬間にアイコンの色が変わって、ツールバーに固定されます。<br>
これで拡張機能が常に見える位置にきました。
</div>

```
[アドレスバー]    🧩  📌Claude  ← この状態が完成形
```

---

## ステップ5｜拡張機能を「Connect（接続）」する

<div class="step-card">
<span class="step-card__num">1</span><strong>固定した「Claude」アイコンをクリック</strong>

ポップアップが開いて、「Connect」または「ブラウザを接続」のようなボタンが見えるはず。
</div>

<div class="step-card">
<span class="step-card__num">2</span><strong>「Connect」を押す</strong>

「ブラウザに名前をつけてください」と聞かれることがあります。<br>
<strong>「<code>Browser 1</code>」や「<code>My Chrome</code>」</strong>のように、自分でわかる名前でOK。
</div>

<div class="step-card">
<span class="step-card__num">3</span><strong>接続完了を待つ</strong>

ポップアップに「Connected」「接続済み」のような表示が出れば成功です。
</div>

---

## ステップ6｜Claude Code 側から動作確認

ここまでが「Chrome側の準備」。次は **Claude Code 側で「ちゃんとつながったか」を確認** します。

<div class="step-card">
<span class="step-card__num">1</span><strong>Claude Code を起動して、案件用フォルダを開く</strong>

[1-4 で作った作業フォルダ](./1-4_作業フォルダの作り方.html)（例: <code>案件001</code>）を開きます。
</div>

<div class="step-card">
<span class="step-card__num">2</span><strong>チャット欄に下のメッセージを送る</strong>

<div class="terminal-block">
<pre><code>Chrome拡張で接続したブラウザは見えてる？
list_connected_browsers で確認して。</code></pre>
</div>
</div>

<div class="step-card">
<span class="step-card__num">3</span><strong>Claudeから「Browser 1 が接続されています」のような返事が来たら成功</strong>

返事に <code>deviceId</code>（長いランダムな文字列）と <code>name</code>（自分でつけた名前）が含まれていればOK。
</div>

<div class="callout callout--tip">
<strong>もう1個試してみる</strong>: 「<code>Yahoo!Japan のトップページを開いて、画面を見せて</code>」と頼んでみてください。Chromeで Yahoo! が開いてスクショが返ってきたら、拡張機能が完璧に動いている証拠です。
</div>

---

## ⚠️ よくあるエラーと対処

### エラー①｜「Connect」を押しても Claude Code 側に出てこない

**原因**: 拡張機能と Claude Code の通信が一時的に詰まっている。

**対処**：
1. 拡張機能アイコンを押して **「Disconnect」→ もう一度「Connect」**
2. それでもダメなら **Chrome を一度終了 → 再起動 → もう一度Connect**
3. それでもダメなら **Claude Code Desktop も再起動**

### エラー②｜「権限がない」と言われる

**原因**: Chrome側で拡張機能の権限が足りない。

**対処**：
- ツールバーの「Claude」アイコンを **右クリック → 「サイトの読み取りと変更」→「すべてのサイトで許可」** に設定。

### エラー③｜「Cookie が切れました」と言われる

**原因**: Chrome のログインセッションが2週間以上経って失効している。

**対処**：
- 普通の使い方で **Chromeでクラウドワークスやその他のサイトに手動で1回ログインし直す**だけでOK。Cookieが新しくなれば、Claude側でもまた使えます。

### エラー④｜偽物の拡張機能を入れてしまった

**対処**：
1. ツールバーの拡張機能アイコンを **右クリック → 「Chromeから削除」**
2. ステップ2からやり直して、**作者が「anthropic.com」** のものを選ぶ

---

## ✓ できたら、ステージクリア！

<div class="stage-checklist">
<p class="stage-checklist__title">👇 全部 ✓ できたら Claude in Chrome 導入完走</p>

<label class="check-item">
<input type="checkbox" class="c-1">
<span>Chrome ウェブストアで「Claude for Chrome」を見つけて、本物（anthropic.com）を確認した</span>
</label>

<label class="check-item">
<input type="checkbox" class="c-2">
<span>「Chromeに追加」で拡張機能をインストールした</span>
</label>

<label class="check-item">
<input type="checkbox" class="c-3">
<span>📌 ピン留めして、ツールバーに常時表示させた</span>
</label>

<label class="check-item">
<input type="checkbox" class="c-4">
<span>拡張機能で「Connect」を押して接続した</span>
</label>

<label class="check-item">
<input type="checkbox" class="c-5">
<span>Claude Code 側で「list_connected_browsers」で確認できた</span>
</label>

<label class="check-item">
<input type="checkbox" class="c-6">
<span>「Yahoo!のトップページを開いて」と頼んでChromeが動くのを確認した</span>
</label>

<div class="stage-clear-banner">
<div class="stage-clear-banner__emoji">🌐</div>
<p class="stage-clear-banner__title">ブラウザの目と手をGET！</p>
<p class="stage-clear-banner__sub">これで Claude が Chrome を操作できるようになりました。次は応募の完全自動化に進めます。</p>
</div>
</div>

---

## 次のアクションへ

ブラウザを操作する道具がそろいました。次は **応募作業の完全自動化** に進みます。

**次のアクション** → [3-EX 応募の完全自動化（任意）](./3-EX_応募の完全自動化.html)

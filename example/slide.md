---
lang: 'ja'
title: "Markdownでスライドを書いてVivliostyleで組んでプレゼン"
link:
  - rel: 'stylesheet'
    href: 'author.css'
---

# Markdownでスライドを書いてVivliostyleで組んでプレゼン #

## 表紙{.cover}

### 研究会{.conference}

プレゼン学会 第3回研究発表会

### 著者{.author}

yamahige

### 版一覧{.version-list}

#### 版{.version}

##### 版名{.version-name}

v2

##### 日付{.date}

2025-04-03

#### 版{.version}

##### 版名{.version-name}

v1

##### 日付{.date}

2025-03-17

## はじめに

この記事では、研究会発表のスライドを想定して、HTML+CSSで作るスライドいいところをあげてみます。

- 学会の研究会での発表ならば、元になる論文／予稿があって、テキストで主張する表現はできています
- ヘッダーやフッターに挿入する項目（「日付」、「研究会名」、など）や書式（「スライド番号/総スライド数」、など）が研究室などで指導されていたりします

## テキストが図を回り込んでくれる

-	HTML+CSSでは、テキストが図を回り込むのが普通です。
- なお、改行の位置で「あれ？」と思ったみなさん、自動的な改行の位置を調整できるのです。次のスライドで説明します。
-	色は匂へど散りぬるを我が世誰ぞ常ならむ有為の奥山今日越えて浅き夢見し酔ひもせず。色は匂へど散りぬるを我が世誰ぞ常ならむ有為の奥山今日越えて浅き夢見し酔ひもせず
-	色は匂へど散りぬるを我が世誰ぞ常ならむ有為の奥山今日越えて浅き夢見し酔ひもせず。

![](figure/circle.svg){style="float: block-start inline-end; float-reference: page; inline-size: 20em;"}

## 改行位置の調整

自動的に折り返される改行の位置を調整できます。

<div style="word-break: normal;">

![](figure/figure.svg){style="float: inline-end; inline-size: 17em;"}

`word-break: normal;` 既定の規則で改行します:

-	HTML+CSSでは、テキストが図を回り込むのが普通です。
-	色は匂へど散りぬるを我が世誰ぞ常ならむ有為の奥山今日越えて浅き夢見し酔ひもせず。

</div>

<div>

![](figure/figure.svg){style="clear: both; float: inline-end; inline-size: 17em;"}

`word-break: auto-phrase;` 日本語として、より自然な位置で改行します:

-	HTML+CSSでは、テキストが図を回り込むのが普通です。
-	色は匂へど散りぬるを我が世誰ぞ常ならむ有為の奥山今日越えて浅き夢見し酔ひもせず。
- ことばが古いせいか、「いろは歌」ではそうでもない…

</div>

このスライド全体には`word-break: auto-phrase;`と設定されています。

## 約物の前後の空白の詰め

"「"や"（"といった約物が行頭・行末にきたり連続したりする場合の空白の詰めを制御できます。
スライドはテキストが短く箇条書きも多いので、行頭は揃ってる方がテキストのまとまりを見やすいでしょう。

<div style="text-spacing-trim: space-all;">

`text-spacing-trim: space-all;`で、約物の空白を詰めません。

- 「色は匂へど散りぬるを我が世誰ぞ常ならむ有為の奥山今日越えて浅き夢見し酔ひもせず。」
- ヘッダーやフッターに挿入する項目（「日付」、「研究会名」、など）が研究室などで指導されていたりします

</div>

<div style="text-spacing-trim: trim-both;">

`text-spacing-trim: trim-both;`で、行頭行末や連続する約物の空白を詰めます。

- 「色は匂へど散りぬるを我が世誰ぞ常ならむ有為の奥山今日越えて浅き夢見し酔ひもせず。」
- ヘッダーやフッターに挿入する項目（「日付」、「研究会名」、など）が研究室などで指導されていたりします

</div>

このスライド全体には`text-spacing-trim: trim-both;`と設定されています

## ヘッダーとフッター

- スライド本文のテキストを抜き出して、ヘッダーやフッターに表示できます
    * 発表のタイトルやセクションの見出し
    * 日付、発表者、研究会名など
- 総スライド数を数えてくれて、その値を自動生成するテキストに含められます

### ヘッダー／フッターはCSSのマージン・ボックス

ヘッダーやフッターを表示するには、CSSのマージン・ボックスを利用します。マージン・ボックスは、`@top-left`や`@bottom-right-corner`など、側面とコーナーの合計16個の場所が定義されています<span class="fn">CSS Paged Media Module Level 3 - 5. Page-Margin Boxes https://www.w3.org/TR/css-page-3/#margin-boxes</span><span class="fn">CSS - @page - とほほのWWW入門 https://www.tohoho-web.com/css/rule/page.htm</span>。

<div id="page-margin-table">

| コーナー | | | | コーナー |
|---:|:---:|:---:|:---:|:---|
| top-left-corner | top-left | top-center | top-right | top-right-corner |
| left-top | | | | right-top |
| left-middle | | | | right-middle |
| left-bottom | | | | right-bottom |
| bottom-left-corner | bottom-left | bottom-center | bottom-right | bottom-right-corner |

</div>

### スライド本文のテキストを抜き出して表示

スライド本文から自動的に抜き出して表示できると、本文を修正したときの修正漏れを防げます。

これには、CSSの名前付き文字列(named string<span class="fn">1.1. Named strings - CSS Generated Content for Paged Media Module https://www.w3.org/TR/css-gcpm-3/#named-strings</span>)という仕組みを使います。
ざっくり言うと

1. 抜き出したいテキストに印を付ける
1. その印を手がかりとしてテキストに名前を付ける
1. その名前を使って、表示したい場所にテキストを生成する

簡単な方から、次の順番で説明します:

1. 発表のタイトルやセクションの見出し
1. 発表のタイトル、日付、発表者、研究会名など

### 発表のタイトルやセクションの見出し

発表タイトルには`h1`、セクションの見出しには`h2`というHTML既定の印(タグ)を付けますね。`h2`見出しを、自動生成した番号付きで各スライドの`@top-right`マージンに表示するとします。

`string-set`プロパティを使って、生成した番号に、例えば`chapter-number`という名前を、テキストに`chapter`という名前を付けます。

```css
h2 {
    string-set: chapter-number content(before), chapter content();
}
```

`content(before)`は`h2`の`::before`疑似要素の内容を示します。`content()`は`content(text)`という意味で、`h2`のテキストを示します。

そして、`@top-right`マージンの`content`プロパティの値で、`string`関数の中でこれらの名前を使ってテキストを参照します。`first`によって、そのスライド中の最初の見出しを使います。

```css
@page {
    @top-right { content: string(chapter-number, first) " " string(chapter, first); }
}
```

### 日付、発表者、研究会名など - その1

「研究会名」といったHTML既定の印（タグ）はないので、印の工夫から始めます。

Vivliostyle用のMarkdownとして開発されている、VFM (Vivliostyle Flavored Markdown)<span class="fn">[Vivliostyleに特化したMarkdown - VFMの使い方](https://gihyo.jp/article/2024/03/vivliostyle-02)</span>は、Markdownの見出しに応じてsection要素を生成して階層化してくれます<span class="fn">[セクション分け - Sectionization](https://gihyo.jp/article/2024/03/vivliostyle-02#gh9ILAwmxz)</span>。これを利用します。


#### 印を付ける

VFMで「研究会名」という見出しに`conference`クラスを設定すると、次のようなHTMLが生成されます:

<div style="display: flex; flex-direction: row; column-gap: 1em;">

<div class="arrow-l2r">

```md
### 研究会名{.conference}

第3回 プレゼン研究発表会
```
</div>

```html
<section class="level3" aria-labelledby="研究会名">
  <h3 class="conference" id="研究会名">研究会名</h3>
  <p>第3回 プレゼン研究発表会</p>
</section>
```

</div>

`"第3回 プレゼン研究発表会"`に印が付きました。`:has(> .conference) > p`というセレクターで取り出せます。

#### 名前を付ける{.new-slide}

ここで次のようなCSSを適用すると、`"第3回 プレゼン研究発表会"`に`string-conference`という名前が付きます。

```css
h2.conference {
    display: none;
}
:has(> .conference) > p {
    string-set: string-conference content();
}
```

#### フッターに生成する

`@bottom-center`マージンに研究会名名を表示します。

```css
@page {
    @bottom-center { content: string(string-conference); }
}
```

### 日付、発表者、研究会名など - その2

「研究会名」を識別する印（タグ）を前提としないような、印の工夫から始めます。

#### 印を付ける

VFMで次のように書いて、`@bottom-center`マージンに表示したい項目に`bottom-center`クラスを設定すると、次のようなHTMLが生成されます:

<div style="display: flex; flex-direction: row; column-gap: 1em;">

<div class="arrow-l2r">

```md
### 研究会名{.bottom-center}

第3回 プレゼン研究発表会
```
</div>

```html
<section class="level3" aria-labelledby="研究会名">
  <h3 class="bottom-center" id="研究会名">研究会名</h3>
  <p>第3回 プレゼン研究発表会</p>
</section>
```

</div>

`"第3回 プレゼン研究発表会"`に印が付きました。`:has(> .bottom-center) > p`というセレクターで取り出せます。

#### 名前を付ける{.new-slide}

ここで次のようなCSSを適用すると、`"第3回 プレゼン研究発表会"`に`string-bottom-center`という名前が付きます。

```css
:has(> .bottom-center) > p:first-of-type {
    string-set: bottom-center content();
}
```

#### フッターに生成する

`@bottom-center`マージンに表示します。

```css
@page {
    @bottom-center { content: string(string-bottom-center); }
}
```

### 日付、発表者、研究会名など - 検討

印を付けるために見出し`##`や`###`に`.conference`クラスを設定して利用しました。このことを覚えておいて、スライド区切りの設定などで**必ず反映**します。

その1方式とその2方式、どちらがよいかは運用しだいでしょうか。

#### その1方式

- Markdownを見ただけでは、フッター中央に何が表示されるか分かりません。何を表示するかはCSS側で決めます。
- CSSには`.conference`(を直下に持つ`section`の最初の`p`)をフッター中央に表示すると書いてあります。`.conference`はMarkdown(というかHTML)側が勝手に決めた印(クラス)ですが、CSSはこれに依存しています。

#### その2方式

- CSSを見ただけでは、フッター中央に何が表示されるか分かりません。何を表示するかはMarkdown側で`.bottom-center`クラスを指定して決めます。
- これはMarkdown側にスタイル情報を含めることを意味します。

### スライド番号 / 総スライド数

各スライドに番号（ページ番号）があると、Q&Aタイムで各スライドにランダムアクセスしやすいです。また、総スライド数が表示されていると、発表者本人だけでなく座長や聴いてる人たちも安心ですね。

スライド番号（ページ番号）や総スライド数（総ページ数）は、それぞれ`page`と`pages`カウンターに設定されています。

そこで、CSSに次のように書くだけで、右下マージンに「スライド番号 / 総スライド数」が表示されます。

```css
@page {
  @bottom-right {
      content: counter(page) " / " counter(pages);
  }
}
```

## 参考文献を脚注や文末脚注として表示できる

参考文献を脚注で、各スライドの下部に表示することがあります。該当箇所に脚注参照(footnote call)を挿入して、脚注本体をスライド下部に表示する（脚注）か、最後のスライドにまとめて表示（文末脚注）します。

#### 各スライドの下部に表示する例

- Wordでは、脚注や文末脚注の参照を挿入する場所にカーソルを置いて「挿入」-「脚注…」を選びます 。脚注や文末脚注は、後から相互に変換できます<span class="fn">[脚注と文末脚注を挿入する Microsoftサポート](https://support.microsoft.com/ja-jp/office/%E8%84%9A%E6%B3%A8%E3%81%A8%E6%96%87%E6%9C%AB%E8%84%9A%E6%B3%A8%E3%82%92%E6%8C%BF%E5%85%A5%E3%81%99%E3%82%8B-61f3fb1a-4717-414c-9a8f-015a5f3ff4cb)</span>。
- ちなみに、CSS (Cascading Style Sheets)でも脚注を実現できます<span class="fn">CSS Generated Content for Paged Media Module 2. Footnotes [https://www.w3.org/TR/css-gcpm-3/#footnotes](https://www.w3.org/TR/css-gcpm-3/#footnotes)</span>。

#### 最後のスライドにまとめて表示する例

- Wordでは、脚注や文末脚注の参照を挿入する場所にカーソルを置いて「挿入」-「脚注…」を選びます 。脚注や文末脚注は、後から相互に変換できます[^word]。
- ちなみに、CSS (Cascading Style Sheets)でも脚注を実現できます[^CSS]。

[^word]: [脚注と文末脚注を挿入する Microsoftサポート](https://support.microsoft.com/ja-jp/office/%E8%84%9A%E6%B3%A8%E3%81%A8%E6%96%87%E6%9C%AB%E8%84%9A%E6%B3%A8%E3%82%92%E6%8C%BF%E5%85%A5%E3%81%99%E3%82%8B-61f3fb1a-4717-414c-9a8f-015a5f3ff4cb)
[^CSS]: CSS Generated Content for Paged Media Module 2. Footnotes [https://www.w3.org/TR/css-gcpm-3/#footnotes](https://www.w3.org/TR/css-gcpm-3/#footnotes)

## 適切なところで改行してくれる

- このスライドのタイトルは1行に収まらないくらい長いので自動的に改行しています。自然なところで改行してるように見えますし、ほぼ同じ長さの2行になっています。
- しかし、Markdownを見るとタイトルには改行が入っていません。

<div style="display: flex; flex-direction: column; column-gap: 1em;">

<div class="arrow-t2b">

```md
# Markdownでスライドを書いてVivliostyleで組んでプレゼン #
```
</div>

<div style="word-break: auto-phrase; text-wrap: balance; font-size: large; font-weight: bold; inline-size: 80%; margin-inline: auto; text-align: center;">Markdownでスライドを書いてVivliostyleで組んでプレゼン</div>

</div>

CSSで次の設定を使うと、これを実現できます。

- `word-break: auto-phrase;`で、ことばとして自然なところで改行します。
- `text-wrap: balance;`で、行の文字数が均等になるように改行します。

## スライドとしての基本的なスタイル設定

「A4◯◯枚の論文」ではなく「プレゼンのスライド」であるために、以下のようなお膳立てが必要です。

### `##`と`###`でスライドを区切る

- `##`(HTMLの`h2`)と`###`(HTMLの`h3`)を既定のスライド区切りにしておきます
    * CSSとしては、**それらを直下に持つ`section`要素**を1枚のスライドに対応させます
    * ヘッダー／フッターに表示するため導入した`.conference`クラスなど、便利な印を設定した`h2`や`h3`をスライドの区切りから除外します
- 任意でスライをを区切るために`.new-slide`といったクラスを用意しておくと便利です
- `##`(HTMLの`h2`)と`###`(HTMLの`h3`)でスライドを区切らなくできるように`.keep-slide`といったクラスも用意しておくと便利です。VFMが生成する`section`に直接スタイル(`style`属性)を設定できないので、CSS側でこのようなお膳立てが必要です。
- もっと深いレベルまで既定でスライド区切りにした方が使いやすいか、それとも`h2`まででよいかは、興味深いところです

```css
.new-slide, section:has(> h2), section:has(> h3:not(.conference, .bottom-center)) {
    break-before: page;
}
.keep-slide, section:has(> h2.keep-slide, > h3.keep-slide) {
    break-before: auto;
}
```

### 用紙サイズをA5横くらいに設定

A5横を基本に4:3や16:9になるように調整すると、見出しなど既定の文字サイズがほどよい大きさだと思います。

### アウトライン番号{.keep-slide}

アウトライン(`section`構造)に、「1.」、「1.1」などと番号が振ってあると、今どこの話をしてるのか、聞き手が理解する助けになります

### プレゼンはVivliostyle Viewer、Vivliostyleプレビュー、またはPDFで{.keep-slide}

「名前を付けて保存…」または「プリント…」からPDFで保存して、プレゼンはPDFでやります。「スライドショー」はありません。「アニメーション」はありません。「ノート」もありません…

### 長い章節

さて、このスライド（ページ）は「6. スライドとしての基本的なスタイル設定」の続きです。こういう場合、どうしましょう…
- 「6. スライドとしての基本的なスタイル設定 (続き)」などの見出しを付ける。
- 次スライドに溢れないように、文字を小さくする。

## 表

<table class="result">
<thead>
<tr><td></td><th colspan="2">Levenshtein距離</th><th colspan="2">Hamming距離</th><th colspan="2">Caley距離</th><th colspan="2">Ulam距離</th></tr>
<tr><td></td><th>増加した問題数</th><th>割合</th><th>増加した問題数</th><th>割合</th><th>増加した問題数</th><th>割合</th><th>増加した問題数</th><th>割合</th></tr>
</thead>
<tbody>
<tr><th class="em">バブルソート</th><td>2,743,264</td><td class="em">75.6%</td><td>3,512,825</td><td>96.8%</td><td>3,624,619</td><td>99.9%</td><td>0</td><td class="em">0.0%</td></tr>
<tr><th class="em">ヒープソート</th><td>3,628,800</td><td class="em">100.0%</td><td>3,628,800</td><td>100.0%</td><td>3,628,800</td><td>100.0%</td><td>3,628,800</td><td class="em">100.0%</td></tr>
<tr><th>挿入ソート</th><td>1,339,176</td><td>36.9%</td><td>1,964,215</td><td>54.1%</td><td>3,443,878</td><td>94.9%</td><td>0</td><td>0.0%</td></tr>
<tr><th>マージソート</th><td>1,852,755</td><td>51.1%</td><td>2,432,789</td><td>67.0%</td><td>3,426,453</td><td>94.4%</td><td>0</td><td>0.0%</td></tr>
<tr><th>クイックソート</th><td>1,034,478</td><td>28.5%</td><td>0</td><td>0.0%</td><td>1,089,872</td><td>30.0%</td><td>872,908</td><td>24.1%</td></tr>
<tr><th>選択ソート</th><td>0</td><td>0.0%</td><td>0</td><td>0.0%</td><td>0</td><td>0.0%</td><td>0</td><td>0.0%</td></tr>
</tbody>
</table>

## 2次元の配置

<div id="colloc-eval">

![バブルソート](figures/co-matrix-bubble-small.png){.em}

![クイックソート](figures/co-matrix-quick-small.png)

![ヒープソート](figures/co-matrix-heap-small.png){.em}

![マージソート](figures/co-matrix-merge-small.png)

![選択ソート](figures/co-matrix-selection-small.png)

![挿入ソート](figures/co-matrix-insertion-small.png)
</div>

実際はヒープソートしている場合に、その結果(時間的な共起行列)をバブルソートで説明できるか …微妙

<!--
Web Publication (WebPub) Format
$ vivliostyle build slide.md -o web/ -f webpub
-->
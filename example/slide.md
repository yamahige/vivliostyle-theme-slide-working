---
lang: 'ja'
title: "Markdownでスライドを書いてVivliostyleで組んでプレゼン"
link:
  - rel: 'stylesheet'
    href: 'author.css'
---

# Markdownでスライドを書いてVivliostyleで組んでプレゼン #

### 著者{.author}

yamahige

### 版{.version .current}

#### 版名{.version-name}

v1

#### 日付{.date}

2025-04-03

### 版{.version}

#### 版名{.version-name}

v0

#### 日付{.date}

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

### CSSのマージン・ボックス

ヘッダーやフッターを表示するには、CSSのマージン・ボックスを利用します。マージン・ボックスは、`@top-left`や`@bottom-right-corner`など、側面とコーナーの合計16個が定義されています<span class="fn">CSS Paged Media Module Level 3 - 5. Page-Margin Boxes https://www.w3.org/TR/css-page-3/#margin-boxes</span><span class="fn">CSS - @page - とほほのWWW入門 https://www.tohoho-web.com/css/rule/page.htm</span>。

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

CSSの名前付き文字列(named string<span class="fn">1.1. Named strings - CSS Generated Content for Paged Media Module https://www.w3.org/TR/css-gcpm-3/#named-strings</span>)という仕組みを使います。
ざっくり言うと

1. 抜き出したいテキストに印を付ける
1. その印のついたテキストに名前を付ける
1. その名前を使って、表示したい場所にテキストを生成する

簡単な方から、次の順番で説明します:

1. 発表のタイトルやセクションの見出し
1. 発表のタイトル、日付、発表者、研究会名など

### 発表のタイトルやセクションの見出し

発表タイトルには`h1`、セクションの見出しには`h2`というHTML既定の印(タグ)を付けますね。`h2`見出しを、自動生成した番号付きで各スライドの`@top-right`マージンに表示するとします。

`string-set`プロパティを使って、`h2`の前に自動生成した番号に、例えば`chapter-number`という名前を、テキストに`chapter`という名前を付けます。

```css
h2 {
    string-set: chapter-number content(before), chapter content();
}
```

`content(before)`は`h2`の`::before`疑似要素の内容を示します。`content()`は`content(text)`という意味で、`h2`のテキストを示します。

そして、`@top-right`マージンの`content`プロパティの値で、`string`関数の中でこれらの名前を使ってテキストを参照します。

```css
@page {
    @top-right { content: string(chapter-number, first) " " string(chapter, first); }
}
```

### 日付、発表者、研究会名など

「研究会名」といったテキストにはHTML既定の印（タグ）がありません。そこで、印の工夫から始めます。

Vivliostyle用のMarkdownとして開発されている、VFM (Vivliostyle Flavored Markdown)<span class="fn">[Vivliostyleに特化したMarkdown - VFMの使い方](https://gihyo.jp/article/2024/03/vivliostyle-02)</span>は、Markdownの見出しに応じてsection要素を生成して階層化してくれます<span class="fn">[セクション分け - Sectionization](https://gihyo.jp/article/2024/03/vivliostyle-02#gh9ILAwmxz)</span>。これを利用します。


#### 印を付ける

VFMで次のように書いて、「著者」という見出しを用意して`author`クラスを設定すると、次のようなHTMLが生成されます:

<div style="display: flex; flex-direction: row; column-gap: 1em;">

<div class="arrow-l2r">

```md
### 著者{.author}

yamahige
```
</div>

```html
<section class="level3" aria-labelledby="著者">
  <h3 class="author" id="著者">著者</h3>
  <p>yamahige</p>
</section>
```

</div>

`"yamahige"`に印が付きました。`:has(> .author) > p`というセレクターで取り出せます。

#### 名前を付ける{.new-slide}

ここで次のようなCSSを適用すると、`"yamahige"`に`string-author`という名前が付きます。

```css
h2.author {
    display: none;
}
:has(> .author) > p:first-of-type {
    string-set: string-author content();
}
```

`p:first-of-type`は著者が複数いる場合を想定しています。

#### フッターに生成する

`@bottom-center`マージンに著者名を表示します。

```css
@page {
    @bottom-center { content: string(string-author); }
}
```

### 日付、発表者、研究会名など - 他の方法

「研究会名」といったテキストにはHTML既定の印（タグ）がありません。そこで、印の工夫から始めます。



#### 印を付ける

VFMで次のように書いて、`@bottom-center`マージンに表示したい項目に`bottom-center`クラスを設定すると、次のようなHTMLが生成されます:

<div style="display: flex; flex-direction: row; column-gap: 1em;">

<div class="arrow-l2r">

```md
### 著者{.bottom-center}

yamahige
```
</div>

```html
<section class="level3" aria-labelledby="著者">
  <h3 class="bottom-center" id="著者">著者</h3>
  <p>yamahige</p>
</section>
```

</div>

`"yamahige"`に印が付きました。`:has(> .bottom-center) > p`というセレクターで取り出せます。

#### 名前を付ける{.new-slide}

ここで次のようなCSSを適用すると、`"yamahige"`に`string-bottom-center`という名前が付きます。

```css
:has(> .bottom-center) > p:first-of-type {
    string-set: bottom-center content();
}
```

`p:first-of-type`は最初の段落を選ぶという意味です。

#### フッターに生成する

`@bottom-center`マージンに表示します。

```css
@page {
    @bottom-center { content: string(string-bottom-center); }
}
```

この方法だと、CSSを見ただけでは、フッター中央に何が表示されるか分かりません。何を表示するかはMarkdown側で指定します。これはMarkdown側にスタイル情報を含めることを意味します。

### スライド番号 / 総スライド数

各スライドに番号（ページ番号）があると、Q&Aでランダムアクセスしやすいです。また、総スライド数が表示されていると、発表者本人だけでなく座長や聴いてる人たちも安心です。

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

参考文献を脚注で表示することがあります。該当箇所に脚注参照(footnote call)を挿入して、脚注本体をスライド下部に表示する（脚注）か、最後のスライドにまとめて表示（文末脚注）します。

- Wordでは、脚注や文末脚注の参照を挿入する場所にカーソルを置いて「挿入」-「脚注…」を選びます 。脚注や文末脚注は、後から相互に変換できます[^word]。
- ちなみに、CSS (Cascading Style Sheets)でも脚注を実現できます[^CSS]。

[^word]: [脚注と文末脚注を挿入する Microsoftサポート](https://support.microsoft.com/ja-jp/office/%E8%84%9A%E6%B3%A8%E3%81%A8%E6%96%87%E6%9C%AB%E8%84%9A%E6%B3%A8%E3%82%92%E6%8C%BF%E5%85%A5%E3%81%99%E3%82%8B-61f3fb1a-4717-414c-9a8f-015a5f3ff4cb)
[^CSS]: CSS Generated Content for Paged Media Module 2. Footnotes [https://www.w3.org/TR/css-gcpm-3/#footnotes](https://www.w3.org/TR/css-gcpm-3/#footnotes)

## アジェンダ（目次）とアウトライン番号

### アジェンダ（目次）

- 発表の冒頭で「本発表のアジェンダです…」と、アウトラインを紹介することがありますね。
- Wordでは目次を自動生成して挿入できます。
    * 目次を2段組にできます。目次全体を選んで「フォーマット」-「段組み…」で設定します。
    * スライドの構成を変更したら、「フィールドの更新」で目次を更新できます。

### アウトライン番号

- 大きなまとまりの最初にも目次を表示して、そのまとまりの見出しを強調して、「これからココを話します」とやることがあります。今、どこの話をしてるのか、分かっててもらうのが重要なのです。
- ここでアウトライン、章節に番号が振ってあると助けになります。PowerPointにはこのようなアウトライン番号の機能がありませんが、Wordにはあります。
- スライドを作ってるときも、「表示」-「サイドバー」-「ナビゲーション」で、アウトラインを表示できます。

## 適切なところで改行してくれる

- `word-break: auto-phrase;`で、ことばとして自然なところで改行します。

- `text-wrap: balance;`で、行の文字数が均等になるように改行します。

<div style="word-break: auto-phrase; text-wrap: balance; font-size: xx-large; font-weight: bold; inline-size: 80%; margin-inline: auto; text-align: center;">Markdownでスライドを書いてVivliostyleで組んでプレゼン</div>

## スライドとしての基本的なスタイル設定

いいところもあるのですが、スライド用の既定値が見当たらないので、次のようなお膳立てが必要です。

### 用紙サイズをA5横くらいに設定

A5横を基本に4:3や16:9になるように調整すると、見出しなど既定の文字サイズがほどよい大きさだと思います。「ファイル」-「ページ設定」で設定します

### 「見出し1」でスライドを区切る

「見出し1」をスライドの区切りにしておきます。「見出し1」のスタイルで、「段落」-「段落前で改ページする」に✓を入れます。

### 余白を小さく、ヘッダー／フッターの位置を調整

PowerPointのスライドに余白はないですよね。Word既定の余白設定はプレゼンとしては広すぎるので調整します。合わせてヘッダーやフッターの位置も移動します。

### プレゼンはPDFで

「名前を付けて保存…」または「プリント…」からPDFで保存して、プレゼンはPDFでやります。「スライドショー」はありません。「アニメーション」はありません。「ノート」もありません…

### 行頭の記号の左側の空白を詰められます

テキストが短いので、行頭は揃ってる方が見やすいと思います。そこで、"「"文字の左側の空白を詰めます。
「フォーマット」-「スタイル…」から「標準」を選んで「変更…」をクリックし、「スタイルの変更」の「書式」から「段落…」-「体裁」タブで「行頭の記号を1/2の幅にする」をチェックします。

### 長い章節

さて、このスライド（ページ）は「6. スライドとしての基本的なスタイル設定」の続きです。こういう場合、どうしましょう…
- 「6. スライドとしての基本的なスタイル設定 (続き)」などの見出しを付ける。
- 次スライドに溢れないように、文字を小さくする。

## バックアップ

外から見えるように(可視化)して、処理(アルゴリズム)の理解を助ける

<figure class="--logic-grid-3-col --logic-right">
  <div>
    <ul>
      <li>ソートって何をするの？入力と出力の関係</li>
      <li>正解してるの？</li>
      <li><em>どのように</em>解いているのか?</li>
    </ul>
  </div>
  <div>可視化<br>
  </div>
  <div>
    <img src="figure/circle.svg" style="block-size: 9lh;">
  </div>
</figure>

## 方法

問題としてはソートを取り上げて、いくつかの分析手法を試みる。

- 題材: 数のソート

- 分析手法:
  * 何をしてるか？入力と出力の関係を調べる
  * 正解してるのか？正答率を評価する
  * 途中の解と~~正解~~ **最終的な解答**との距離の変化の分析する[^1]
  * 操作の時間的な共起(temporal co-occurrence)を分析する[^2]
  * 解の状態遷移における閉路(cycle)を分析する[^cycle] (今回はスキップ)

- 検証: あるアルゴリズムで実現されている振る舞いを、別のアルゴリズムで説明できるか？

[^1]: 山口 琢, 大場 みち子, コンピュータの整列処理で正解との距離は単調に減少するか?, 情報処理学会 研究報告コンピュータと教育(CE),2020-CE-157(6),1-8 (2020-10-31) , 2188-8930 <a class="url" href="http://id.nii.ac.jp/1001/00207490/">http://id.nii.ac.jp/1001/00207490/</a>

[^2]: 山口琢, 大場みち子, コンピューターの整列処理におけるデータ操作の時間的共起分析, 情報処理学会 研究報告コンピュータと教育(CE), Vol. 2020-CE-156, No. 1 pp.1—7, 2020-08-22 <a class="url" href="http://id.nii.ac.jp/1001/00206288/">http://id.nii.ac.jp/1001/00206288/</a>

[^cycle]: Yamaguchi, T., Matsuzawa, Y., Niimi, A., Oba, M. (2023). Cycles in State Transition as Trial-and-Errors in Solving Programming Exercises. In: Keane, T., Lewin, C., Brinda, T., Bottino, R. (eds) Towards a Collaborative Society Through Creative Learning. WCCE 2022. IFIP Advances in Information and Communication Technology, vol 685. Springer, Cham. <a class="url" href="https://doi.org/10.1007/978-3-031-43393-1_49">https://doi.org/10.1007/978-3-031-43393-1_49</a>

### 方法 > 題材: ソート

入力する問題

- 1から10の10個の数
- ${}_{10} \mathrm{ P }_{10} = 3,628,800$ 種類の並びを入力とする

### 方法 > 題材: 測定のタイミング

状態遷移の**状態**はどこか？

| アルゴリズム |状態 |
| ---- | ---- |
| バブルソート |交換直後の並び |
| クイックソート |交換直後の並び |
| ヒープソート |交換直後の並び |
| 選択ソート |交換直後の並び |
| マージソート |マージ直後の並び |
| 挿入ソート |挿入直後の並び |

## 手法: 最終的な解答との距離の変化の分析

解答との距離の変化の分析は、
- 問題解決の過程で**変化する解**を記録し、
- ~~正解~~ **最終的な解答**との間に**何らかの距離**を適用して、
- 解くプロセスの時間経過に伴う距離の変化を分析し、
- 解答者の解き方などを推定する

例えば、
> **推定**:  
途中で最終解答との**距離が大きくなる**ときには、  
**解答者が迷っている**と推定する

### 距離 1/2

次の距離を採用する。レーベンシュタイン距離（編集距離）は研究でよく使われる。

- ハミング距離(Hamming distance)
- レーベンシュタイン距離(Levenshtein distance)
- ケイリー距離(Cayley distance)
- ウラム距離(Ulam distance)

### 距離 2/2

各距離の説明:

- ハミング距離(Hamming distance)  
2つの並びの同じ位置にあって異なる要素の個数である。  
`(2,5,3,1,4)`と`(1,2,3,4,5)`の距離は、3だけが同じで他は異なるので、4である。
- レーベンシュタイン距離(Levenshtein distance)  
1要素の挿入・削除・置換(その要素を任意の別の要素に置き換える)操作を何回繰り返すと、一方の並びから他方の並びへ変わるかの操作回数である。断りなく編集距離というとレーベンシュタイン距離を指すことが多い。
- ケイリー距離(Cayley distance)  
「交換」操作によってのみ並びを変換して、一方の並びから他方の並びにいたるまでの変換の最小回数を距離とする。
- ウラム距離(Ulam distance)  
スマホのUIなどのドラッグ&ドロップに該当する操作をして、目的の並びになるまでの最小の操作数

### 検証

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

実際はヒープソートしている場合に、その結果(途中で最終解答から遠ざかる現象の発生頻度)をバブルソートで説明する…のは厳しいのではないか？

### 解答との距離の変化 > 考察

- ソートのプロセスでは必ずしも距離が減少(単調非増加)しない:
  * 距離が広がることがあるし、
  * 正解に達したにもかかわらず再び誤った順序に変わることすらある
- ソートアルゴリズムに**迷い**があるとは思えない
- そこで、これが反例となって、解答との距離が遠ざかるからといって「迷ってる」とは、一般的には言えない

しかし、
- 途中で遠ざからない「アルゴリズム x 距離」の組み合わせもある
- プロセスについて、距離から何らかの情報を引き出せるのではないか？

## 手法: 操作の時間的な共起

操作の時間的な共起分析は、
- 問題解決の過程で行われる操作について、
- いくつかの操作が**時間的に近くで行われる頻度**を集計する[^colloc]。

このように集計する動機は、テキスト分析における語の共起と同様

ある複数の操作が頻繁に時間的に近くで行われるとき、それらの操作は
- 何らかの定型操作であったり、
- 考え方の類似性の手がかりになったりする

と解釈できる。

[^colloc]: 山口 琢, 大場 みち子, 編集操作の時間的共起分析の提案, 情報処理学会 研究報告コンピュータと教育（CE）,2019-CE-151(9),1-7 (2019-09-28), 2188-8930 <a class="url" href="http://id.nii.ac.jp/1001/00199567/">http://id.nii.ac.jp/1001/00199567/</a>

### 時間的共起の例: 文章の並べ替え作文

<div style="display: grid; grid-template-columns: 1fr 1fr;">

<div>

![](figures/jigsaw-text-drag-and-drop.png){style="block-size: 15lh;"}
</div>
<div>

「ドラッグ&ドロップで並べ替えて、「オレオレ詐欺」の説明として、あなたが適切と思う文章を完成させなさい。」

文章では順番が重要ということを学ぶ教材[^jigsaw-text][^hayashi][^nishimura][^utada]
</div>
</div>

[^jigsaw-text]: 山口 琢, 大場 みち子, 高橋 慈子, 小林 龍生, ジグソー・テキストによる文並べ替え操作の測定, 情報処理学会 研究報告コンピュータと教育(CE), 2017-CE-142(27),1-6, 2017 <a class="url" href="http://id.nii.ac.jp/1001/00184931/">http://id.nii.ac.jp/1001/00184931/</a>

[^hayashi]: 林 浩一, 山口 琢, 大場 みち子, ロジカルシンキングにおける基本的関係についてのジグソー・テキストを用いた理解度評価, 情報処理学会 研究報告コンピュータと教育(CE), 2019-CE-151(13),1-8 (2019-09-28) , 2188-8930 <a class="url" href="http://id.nii.ac.jp/1001/00199571/">http://id.nii.ac.jp/1001/00199571/</a>

[^nishimura]: 西村 萌, 米澤 彩乃, 松澤 芳昭, パズル型プログラミング問題を利用した初学者の迷いや思考プロセスの個別分析の試み, 情報処理学会 研究報告コンピュータと教育(CE), 2023-CE-169(10),1-8 (2023-03-04) , 2188-8930 <a class="url" href="http://id.nii.ac.jp/1001/00225009/">http://id.nii.ac.jp/1001/00225009/</a>

[^utada]: 歌田 夢香, 加藤 輝実, 山口 琢, 大場 みち子, 新美 礼彦, アジャイル開発におけるプロダクトオーナー育成支援 ワークショップの実践, 実践的IT教育シンポジウム rePiT 論文集, 2024, 2024 巻, 第10回 実践的IT教育シンポジウム rePiT2024 in 京都, p. 35-42, 公開日 2024/03/07 <a class="url" href="https://doi.org/10.11309/repit.2024.0_35">https://doi.org/10.11309/repit.2024.0_35</a>

### 検証

<div id="colloc-eval">

![バブルソート](figures/co-matrix-bubble-small.png){.em}

![クイックソート](figures/co-matrix-quick-small.png)

![ヒープソート](figures/co-matrix-heap-small.png){.em}

![マージソート](figures/co-matrix-merge-small.png)

![選択ソート](figures/co-matrix-selection-small.png)

![挿入ソート](figures/co-matrix-insertion-small.png)
</div>

実際はヒープソートしている場合に、その結果(時間的な共起行列)をバブルソートで説明できるか …微妙

## 全体の考察: このような研究の意義

- 学校教育
  * 「答えのない課題解決に挑む」人材の育成[^3]
  * 試行錯誤の検出、内容の評価[^4]

- オフィス・アプリケーション
  * 情報の一貫性(coherence)、整合性(consistency)をもたらそうとする**操作**に基づく品質評価。望ましい行動。  
  vs. アウトプットの品質

[^3]: 中央教育審議会：幼稚園、小学校、中学校、高等学校及び特別支援学校の学習指導要領等の改善及び必要な方策等について(答申)(中教審第197号)、p.10、文部科学省（オンライン）<a class="url" href="https://www.mext.go.jp/b_menu/shingi/chukyo/chukyo0/toushin/1380731.htm">https://www.mext.go.jp/b_menu/shingi/chukyo/chukyo0/toushin/1380731.htm</a>

[^4]: 国立教育政策研究所 教育課程研究センター：「指導と評価の一体化」のための学習評価に関する参考資料(高等学校編) 情報、pp.54-59、（オンライン）、入手先<a class="url" href="https://www.nier.go.jp/kaihatsu/shidousiryou.html">https://www.nier.go.jp/kaihatsu/shidousiryou.html</a>

## 不良設定問題

- プロセスの分析が**正解の存在を前提としない**ことを示した
- 「解き方の選択」も出力と考えれば、入力に対する出力を分析するというスキームは、いぜんとして維持される。
- そのうえで、「解き方の選択に正解はない」はありえるだろう。

<!--
Web Publication (WebPub) Format
$ vivliostyle build slide.md -o web/ -f webpub
-->
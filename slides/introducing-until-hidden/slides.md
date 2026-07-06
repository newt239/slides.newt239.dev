---
theme: seriph
transition: slide-left
title: 'HTMLの新しい属性値hidden="until-found"'
titleTemplate: '%s'
htmlAttrs:
  lang: ja
mdc: true
seoMeta:
  ogImage: auto
  twitterCard: summary_large_image
layout: cover
class: text-center
---

# HTMLの新しい属性値`hidden="until-found"`

CA Tech Lounge LT会 2026年5月

<div class="pt-12 opacity-80">
  newt ( <a href="https://x.com/newt239" target="_blank">@newt239</a> )
</div>

---
layout: default
---

## `hidden`属性

- FAQのアコーディオン
- タブで切り替わるパネル
- 「もっと見る」で展開するセクション

実装が適切でないと......

<v-click>

- ページ内検索（`Cmd/Ctrl+F`）でヒットしない
- `https://example.com/#section-3` のような **URL のジャンプ** が効かない
- 検索エンジンの結果から、該当箇所に直接飛んできてもらいにくい

</v-click>

---
layout: default
---

## `hidden="until-found"` とは

ブラウザのページ内検索やURLフラグメントで「見つかった瞬間」に 自動的に開くようにするための機能

---
layout: default
---

## 実装例

````md magic-move {lines: true}
```html
<div>
  通常の表示
</div>
```

```html
<div hidden>
  DOMツリー上に表示されない
</div>
```

```html
<div hidden="until-found">
  Ctrl+F で見つかる
</div>
```
````

---
layout: default
---

## 仕組み

ブラウザは `hidden="until-found"` の要素に、内部的にこんな CSS を当てています。

```css {1|3|all}
/* 普通の hidden 属性は… */
[hidden]            { display: none; }

/* until-found は display:none ではなく */
[hidden="until-found"] { content-visibility: hidden; }
```

- 検索でマッチすると、ブラウザは **`hidden` 属性そのものを外す**

---
layout: default
---

## ところで、`<details>` でも同じことができる

ネイティブのアコーディオン要素 `<details>` / `<summary>` には、**閉じていてもページ内検索でヒットして、マッチしたら自動で開く** 挙動が組み込まれている。

```html
<details>
  <summary>Q. 営業時間は？</summary>
  10時〜19時です。<!-- 閉じていても Ctrl+F でヒットして自動で開く -->
</details>
```

- HTML Living Standard で `<details>` は **find-in-page / フラグメントナビゲーション / `scrollIntoView` で自動展開** することが定義されている
- **Chrome 97 (2022-01) / Firefox 139 (2025-05) / Safari 26.2 (2025-12)** で揃い、現在 **Baseline (Newly available)**

---
layout: default
---

## ⚠️ `<summary>` 内の見出しロールには注意

```html
<details>
  <summary><h3>営業時間は？</h3></summary>  <!-- この h3、読まれる？ -->
  10時〜19時です。
</details>
```

スクリーンリーダー × ブラウザの組み合わせによって **`<summary>` 内に置いた見出し（`<h2>`/`<h3>` 等）のロールが取りこぼされる** ことがある

- **JAWS**: `<summary>` 内の見出しセマンティクスが落ちる既知不具合（[a11ysupport.io](https://a11ysupport.io/tech/html/summary_element)）。**`H` キーでの見出しジャンプで該当見出しに飛べない**
- **TalkBack (Android)**: `<summary>` の中にネストされた見出しを **無視する**（Scott O'Hara 氏の検証）
- **VoiceOver (iOS/macOS)**: ロータの「見出し」では拾えるが、`<summary>` を直接読み上げる時に状態（開閉）と中身のテキストが安定しない報告あり
- **NVDA**: 見出しは概ね公開されるが、開閉の **状態変化アナウンスが鳴らない** 既知不具合

---
layout: default
---

## Baseline ステータス

- 2025年12月に Safari 26.2 で全エンジン揃った → 現在は **Baseline "Newly available"**
- 30 か月後には **Baseline "Widely available"** へ昇格予定（2028年中ごろ見込み）
- 古い Safari (≤ 26.1) や、サポート切れ環境は普通の `hidden` として処理 = **隠れたまま検索ヒットしない**
- 既存実装を壊さないProgressive Enhancementとして安全に導入できる

```js
// 必要なら beforematch の実装可否でフォールバック検出
if (!('onbeforematch' in HTMLElement.prototype)) {
  // 未対応環境では「全部開いて見せる」など代替動作に切り替える
}
```

---
layout: center
class: text-center
---

## まとめ

<div class="mt-8 text-left max-w-2xl mx-auto">

- `hidden="until-found"` は HTML のグローバル属性
- 折りたたみ UI 内のテキストがページ内検索で見つかるようになる
- 未対応環境でもフォールバックされるのですぐに導入可能

</div>

---
layout: default
---

## 参考リンク

- MDN: [`hidden` global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden)
- Chrome for Developers: [Making collapsed content accessible with `hidden=until-found`](https://developer.chrome.com/docs/css-ui/hidden-until-found)
- CSS-Tricks: [Covering `hidden=until-found`](https://css-tricks.com/covering-hiddenuntil-found/)
- WHATWG HTML 仕様: [The `hidden` attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute)
- web.dev: [content-visibility](https://web.dev/content-visibility/)
- Manuel Matuzović: [the `details` element and in-page search](https://matuzo.at/blog/2023/details-find-in-page)
- WHATWG HTML PR #6466: [auto-expand `<details>` for fragment navigation and find-in-page](https://github.com/whatwg/html/pull/6466)
- Scott O'Hara: [The details and summary elements, again](https://www.scottohara.me/blog/2022/09/12/details-summary.html)
- a11ysupport.io: [summary element support matrix](https://a11ysupport.io/tech/html/summary_element)

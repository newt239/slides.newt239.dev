---
theme: seriph
transition: slide-left
title: スマホを英語にしたら日本語が「中国語」になった話
titleTemplate: '%s'
htmlAttrs:
  lang: ja
mdc: true
layout: cover
class: text-center
---

# スマホを英語にしたら<br>日本語が「中国語」になった話

CJK フォントフォールバックの仕組み

<div class="pt-12 opacity-80">
  newt ( <a href="https://x.com/newt239" target="_blank">@newt239</a> )
</div>

---
layout: default
---

## 起きたこと

端末の言語設定を **English** にして mixi2（Android）を開いたら……

<v-click>

投稿中の漢字が **中国語っぽい字形** で表示された

</v-click>

<v-click>

- 文字化けではない。読める。でも「なんか違う」
- 同じ投稿でも Twitter (X) では普通の日本語字形のまま
- そして iOS 版の mixi2 では起きない

</v-click>

<v-click>

<div class="pt-4 text-xl">
これはバグ？ 仕様？ 🤔
</div>

</v-click>

---
layout: default
---

## 現象の正体 ①：CJK 統合漢字（Han Unification）

日中韓で微妙に字形が違う漢字を、Unicode は **同じコードポイントに統合** している

<div class="grid grid-cols-3 gap-4 pt-6 text-center">
  <div class="border rounded p-4">
    <div class="text-sm opacity-60">lang="ja"（日本語）</div>
    <div lang="ja" class="text-6xl pt-2">骨直次令</div>
  </div>
  <div class="border rounded p-4">
    <div class="text-sm opacity-60">lang="zh-CN"（簡体字）</div>
    <div lang="zh-CN" class="text-6xl pt-2">骨直次令</div>
  </div>
  <div class="border rounded p-4">
    <div class="text-sm opacity-60">lang="zh-TW"（繁体字）</div>
    <div lang="zh-TW" class="text-6xl pt-2">骨直次令</div>
  </div>
</div>

<div class="pt-6 text-center opacity-80">
上の3つ、<b>コードポイントは完全に同一</b>（U+9AA8 U+76F4 U+6B21 U+4EE4）
</div>

---
layout: center
class: text-center
---

## 現象の正体 ②

<div class="text-2xl leading-relaxed pt-4">

コードポイントだけでは<br>**どの字形（グリフ）を出すか決められない**

</div>

<v-click>

<div class="text-3xl pt-8">

→ レンダラは **locale（言語情報）** を手がかりに字形を選ぶ

</div>

</v-click>

<v-click>

<div class="pt-8 opacity-70">
今日の話はぜんぶこの一言に帰着します
</div>

</v-click>

---
layout: default
---

## 謎その 1：なぜ Twitter は崩れないのか

OS もブラウザ UI も英語なのに、ツイートの漢字は日本語字形のまま

<v-click>

<div class="pt-6">

**立てた仮説**

> 「投稿のメタデータとして言語情報を持っているのでは？」

</div>

</v-click>

---
layout: default
---

## 種明かし：投稿ごとの `lang` 属性

Twitter は **ツイートごとに言語を自動判定** し、`lang` フィールドとして保持している

```html
<!-- Web ではツイート本文にこう付く -->
<div lang="ja" dir="auto">日本語のツイート本文……</div>
```

- ブラウザのフォントエンジンが `lang="ja"` を見て **日本語のグリフバリアント** を選ぶ
- OS / UI が英語でも、本文側の言語宣言が勝つ

<v-click>

<div class="pt-4">

仮説はほぼ正解 🎉（厳密には「アカウントの言語設定」ではなく「**ツイートごとの自動判定結果**」）

</div>

</v-click>

---
layout: default
---

## 謎その 2：なぜ mixi2 は崩れたのか

mixi2 は **Flutter 製**（ライセンス表記から Noto 系フォント同梱も確認できる）

<v-click>

Flutter のテキストエンジンは字形解決に locale を参照する

- `TextStyle.locale` や `Localizations` で `ja` を明示していれば日本語字形
- 明示していなければ **ambient locale = 端末のシステム言語** に追従

</v-click>

<v-click>

<div class="pt-4">

システム言語が英語 → CJK の地域を決められない → **既定の CJK フォールバック** へ

→ バグではなく「**locale を pin していないだけ**」

</div>

</v-click>

---
layout: center
class: text-center
---

# でも、待って

<div class="text-2xl pt-8 leading-relaxed">

同じアプリ・同じ「locale 未指定」なのに

**なぜ iOS では崩れず、Android だけ崩れる？**

</div>

---
layout: default
---

## 解明の土台：Flutter の公式仕様

`TextStyle.locale` の API ドキュメントに答えの入り口がある

> Han Unification ブロックの文字は locale により字形が変わり、指定された locale を使ってどのグリフを使うかを決める。
> **locale が null の場合、フォント選択には「システム依存のアルゴリズム」が使われる**

<v-click>

<div class="pt-6">

つまり Flutter 自身の契約は：

- locale を渡せば → Flutter が字形を選ぶ
- 渡さなければ → **OS のネイティブなフォントフォールバックに委譲**

ここが iOS / Android の分岐点

</div>

</v-click>

---
layout: default
---

## iOS 側：優先言語リストを辿る

Core Text の `CTFontCopyDefaultCascadeListForLanguages` がフォールバックを担う

- **順序付きの言語コード配列**（優先言語リスト）を受け取り、フォールバック先を並べ替える
- アプリが言語を渡さない場合、このリストは端末の「**優先する言語の順序**」（設定 → 一般 → 言語と地域）になる

<v-click>

<div class="pt-4">

表示言語を英語にしても、日本のユーザーなら優先リストに **日本語が残っている**

英語は非 CJK → リスト下位の **ja** が CJK の字形決定に効く → **ヒラギノの日本語字形が維持される**

</div>

</v-click>

---
layout: default
---

## Android 側：簡体字デフォルトに収束

AOSP の `fonts.xml` / `font_fallback.xml`（Android 15+）がフォールバックを定義

- `<family lang="...">` の言語タグ付きファミリを、解決済みロケールと突き合わせる
- CJK は `ja` / `ko` / `zh-Hans` / `zh-Hant` に分かれている

<v-click>

<div class="pt-4">

最上位ロケールが非 CJK（英語）で、明示的な日本語指定がないとき——

> 欧米系・ラテン系のシステムロケールでは、他に明示指定がない限り
> **常に簡体字中国語（zh-Hans）の Han 字形をデフォルトにする**

iOS のような「優先リスト下位の ja を拾い直す」挙動は既定では効かない → **中国語字形に落ちる**

</div>

</v-click>

---
layout: default
---

## 結論：OS のフォールバック仕様が非対称だった

同じ「locale 未指定 → OS 任せ」でも……

<div class="grid grid-cols-2 gap-6 pt-6">
  <div class="border rounded p-4">
    <div class="text-xl font-bold"> iOS (Core Text)</div>
    <div class="pt-2">優先言語リストを順に辿る<br>→ 下位の <b>ja</b> が拾われて日本語字形</div>
  </div>
  <div class="border rounded p-4">
    <div class="text-xl font-bold">🤖 Android (fonts.xml)</div>
    <div class="pt-2">非 CJK ロケールでは<br>→ <b>簡体字（zh-Hans）デフォルト</b>に収束</div>
  </div>
</div>

<v-click>

<div class="pt-6 opacity-80">

⚠️ 補足：iOS が「壊れない」のは優先リストに ja が残っている前提。<br>
英語のみの端末なら **iOS でも崩れ得る**

</div>

</v-click>

---
layout: default
---

## 持ち帰り：実務での対処

<div class="pt-2">

**Flutter アプリなら**

1. `MaterialApp.locale` / `supportedLocales` や `TextStyle.locale` で `ja` を pin する（Android に効く）
2. 確実に保証したいなら **日本語フォント（Noto Sans JP 等）を同梱して明示適用**（唯一 OS のフォールバックに依存しない方法）

**Web なら**

3. `lang` 属性 + `:lang()` での font-family 指定が定石

```css
:lang(ja) { font-family: "Noto Sans JP", sans-serif; }
```

UGC の多言語混在なら、サーバ側で言語判定 → 出力要素に `lang` 付与が王道

</div>

<v-click>

<div class="pt-4 text-center text-2xl">

**文字コード ≠ グリフ。locale を明示せよ**

</div>

</v-click>

---
layout: default
---

## 参考文献

- Flutter — [`TextStyle.locale`](https://api.flutter.dev/flutter/painting/TextStyle/locale.html)（locale null 時は「システム依存のアルゴリズム」と明記）
- Apple Developer — [`CTFontCopyDefaultCascadeListForLanguages`](https://developer.apple.com/documentation/coretext/ctfontcopydefaultcascadelistforlanguages(_:_:))
- AOSP — [Fonts (`fonts.xml` / `font_fallback.xml`)](https://source.android.com/docs/core/display/fonts)
- W3C — [Language tags in HTML and XML / CJK フォントと `lang`](https://www.w3.org/International/questions/qa-html-language-declarations)
- Raph Levien — [Font fallback deep dive](https://raphlinus.github.io/rust/skribo/text/2019/04/04/font-fallback.html)

<div class="pt-8 text-center opacity-80">
ご清聴ありがとうございました
</div>

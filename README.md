# slides.newt239.dev

Slidev 製スライドを管理する monorepo（Bun workspaces + Turborepo + Vercel）。

- 各スライドは `slides/<slide-name>/` に置き、`https://slides.newt239.dev/slides/<slide-name>/` で公開される（**ディレクトリ名がそのまま URL になる**）
- スライド一覧ページ（`home/`）はビルド時に `scripts/update-slides-list.ts` が各 `slides/*/slides.md` の frontmatter `title` から自動生成する

## 新スライド作成

```sh
bun run new <slide-name>
```

## スライドプレビュー

```sh
cd slides/<slide-name>
bun run dev
```

## 全体ビルド

```sh
bun run build
```

一覧生成 → 各スライドと home を turbo でビルド（キャッシュ有効）→ `dist/` へ集約、の順で実行される。デプロイは Vercel がこのコマンドを実行し `dist/` を配信する。

## スライドの PDF エクスポート

```sh
cd slides/<slide-name>
bun run export
```

# slides.newt239.dev

Slidev 製スライドを管理する monorepo（pnpm workspaces + Turborepo + Vercel）。

- Node.js / pnpm のバージョンは `mise.toml`（および `.node-version`）で固定
- 各スライドは `slides/<slide-name>/` に置き、`https://slides.newt239.dev/slides/<slide-name>/` で公開される（**ディレクトリ名がそのまま URL になる**）
- スライド一覧ページ（`home/`）はビルド時に `scripts/update-slides-list.ts` が各 `slides/*/slides.md` の frontmatter `title` から自動生成する
- 依存パッケージは完全固定（exact pin）で、Dependabot が毎月まとめて更新 PR を作成し、CI が通れば自動マージされる

## セットアップ

```sh
mise install
pnpm install
```

## 新スライド作成

```sh
pnpm run new <slide-name>
```

## スライドプレビュー

```sh
cd slides/<slide-name>
pnpm run dev
```

## 全体ビルド

```sh
pnpm run build
```

一覧生成 → 各スライドと home を turbo でビルド（キャッシュ有効）→ `dist/` へ集約、の順で実行される。デプロイは Vercel がこのコマンドを実行し `dist/` を配信する。

## OGP 画像

各スライドは frontmatter の `seoMeta.ogImage: auto` により、ビルド時に 1 枚目のスライドから `og-image.png` を自動生成する（Playwright 使用）。

- 生成された `slides/<slide-name>/og-image.png` は**コミットする**。ファイルが存在する場合はビルド時の再生成をスキップするため、Vercel 上で Playwright や日本語フォントが不要になる
- 1 枚目のスライドを変更して OGP 画像を更新したい場合は、`og-image.png` を削除してローカルで `pnpm run build` を再実行し、生成し直したものをコミットする
- 複数スライドの画像を同時に生成し直す場合は `pnpm exec turbo run build --concurrency=1` を使う（生成用サーバーのポートが固定のため、並列ビルドだと衝突する）
- `og:image` の URL は OGP クローラー向けに絶対 URL である必要があるため、`scripts/assemble-dist.ts` が `dist/` 集約時に `https://slides.newt239.dev/...` へ書き換える

## スライドの PDF エクスポート

```sh
cd slides/<slide-name>
pnpm run export
```

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

interface PackageJson {
  name: string;
  version: string;
  scripts: Record<string, string>;
}

const [, , name] = process.argv;
if (!name) {
  console.error("Usage: pnpm run new <name>");
  process.exit(1);
}

const root = process.cwd();
const target = path.join(root, "slides", name);
if (fs.existsSync(target)) {
  console.error(`Error: ${target} already exists.`);
  process.exit(1);
}

fs.mkdirSync(target, { recursive: true });

// slides.md
const md = `---
theme: default
transition: slide
title: ${name}
titleTemplate: '%s'
htmlAttrs:
  lang: ja
---

# ${name}

- Your content here
`;
fs.writeFileSync(path.join(target, "slides.md"), md);

// package.json
const pkg: PackageJson = {
  name,
  version: "0.0.0",
  scripts: {
    dev: "slidev --open",
    build: `slidev build --base /slides/${name}/ --out dist`,
    export: "slidev export",
  },
};
fs.writeFileSync(
  path.join(target, "package.json"),
  JSON.stringify(pkg, null, 2)
);

// install dependencies (workspace 追加を lockfile に反映)
console.log("Running pnpm install at workspace root...");
execSync("pnpm install", { cwd: root, stdio: "inherit" });

// スライド一覧（home/src/slides.ts）を更新
execSync("node scripts/update-slides-list.ts", { cwd: root, stdio: "inherit" });

console.log(`Slide project created at slides/${name}`);

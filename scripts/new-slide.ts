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
  console.error("Usage: bun run scripts/new-slide.ts -- <name>");
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
theme: seriph
transition: slide
---
# ${name}

- Your content here
`;
fs.writeFileSync(path.join(target, "slides.md"), md);

// package.json
const basePath = `/slides/${name}/`;
const outPath = `../../dist/slides/${name}`;
const pkg: PackageJson = {
  name,
  version: "0.0.0",
  scripts: {
    dev: "slidev --open",
    build: `slidev build --base ${basePath} --out ${outPath}`,
    export: "slidev export",
  },
};
fs.writeFileSync(
  path.join(target, "package.json"),
  JSON.stringify(pkg, null, 2)
);

// install dependencies
console.log(`Installing dependencies in slides/${name}...`);
execSync("bun install", { cwd: target, stdio: "inherit" });

console.log(`Slide project created at slides/${name}`);
console.log(`  cd slides/${name}`);
console.log(`  bun run dev`);

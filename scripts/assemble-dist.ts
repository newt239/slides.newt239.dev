import { promises as fs } from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const distDir = path.join(root, "dist");

async function main() {
  await fs.rm(distDir, { recursive: true, force: true });

  // home（一覧ページ）→ dist/
  await fs.cp(path.join(root, "home/dist"), distDir, { recursive: true });

  // 各スライド → dist/slides/<name>/
  const slidesDir = path.join(root, "slides");
  const dirents = await fs.readdir(slidesDir, { withFileTypes: true });
  for (const dirent of dirents) {
    if (!dirent.isDirectory()) continue;
    const built = path.join(slidesDir, dirent.name, "dist");
    try {
      await fs.access(built);
    } catch {
      continue;
    }
    await fs.cp(built, path.join(distDir, "slides", dirent.name), {
      recursive: true,
    });
    console.log(`Copied ${dirent.name} -> dist/slides/${dirent.name}`);
  }
}

main().catch((error) => {
  console.error("Failed to assemble dist:", error);
  process.exit(1);
});

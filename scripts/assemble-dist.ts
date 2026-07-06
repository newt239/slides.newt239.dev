import { promises as fs } from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const distDir = path.join(root, "dist");
const siteOrigin = "https://slides.newt239.dev";

async function absolutizeOgImage(indexHtmlPath: string, baseUrl: string) {
  let html: string;
  try {
    html = await fs.readFile(indexHtmlPath, "utf-8");
  } catch {
    return;
  }
  const rewritten = html.replace(
    /(<meta[^>]*property="(?:og|twitter):image"[^>]*content=")([^"]+)(")/g,
    (match, prefix, url, suffix) => {
      if (/^https?:\/\//.test(url)) return match;
      const absolute = url.startsWith("/")
        ? `${siteOrigin}${url}`
        : `${baseUrl}/${url.replace(/^\.\//, "")}`;
      return `${prefix}${absolute}${suffix}`;
    }
  );
  if (rewritten !== html) {
    await fs.writeFile(indexHtmlPath, rewritten);
    console.log(`Absolutized og:image in ${indexHtmlPath}`);
  }
}

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
    for (const htmlName of ["index.html", "404.html"]) {
      await absolutizeOgImage(
        path.join(distDir, "slides", dirent.name, htmlName),
        `${siteOrigin}/slides/${dirent.name}`
      );
    }
    console.log(`Copied ${dirent.name} -> dist/slides/${dirent.name}`);
  }
}

main().catch((error) => {
  console.error("Failed to assemble dist:", error);
  process.exit(1);
});

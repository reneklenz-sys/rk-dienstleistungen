import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const iconsDir = join(root, "public", "icons");
const faviconPath = join(root, "public", "favicon.svg");

const sizes = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

async function main() {
  const svg = readFileSync(faviconPath, "utf8");
  mkdirSync(iconsDir, { recursive: true });

  for (const { name, size } of sizes) {
    const png = await sharp(Buffer.from(svg)).resize(size, size, { fit: "contain", background: "#121820" }).png().toBuffer();
    writeFileSync(join(iconsDir, name), png);
  }

  writeFileSync(join(iconsDir, "icon.svg"), svg);
  console.log(`PWA icons generated in public/icons (${sizes.map((item) => item.name).join(", ")})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brandingSource = "E:/05_GEWERBE/RK Dienstleitung/Branding";
const sourceSvgPath = join(root, "Branding", "Logo ohne BG.svg");

const CROP = { x: 515, y: 228, width: 590, height: 465 };

function extractPaths(raw) {
  const paths = [...raw.matchAll(/<path[^>]*d="([^"]+)"/g)].map((match) => match[1]);
  if (paths.length < 2) {
    throw new Error("Logo ohne BG.svg enthält nicht genug Pfade.");
  }
  return paths;
}

function markPaths(colors, paths) {
  return `<path fill="${colors.primaryDark}" d="${paths[0]}"/>
  <path fill="${colors.accentLight}" d="${paths[1]}"/>`;
}

function buildMarkSvg(colors, paths) {
  const { x, y, width, height } = CROP;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none" role="img" aria-label="René Klenz Logo">
  <g transform="translate(${-x} ${-y})">
    ${markPaths(colors, paths)}
  </g>
</svg>
`;
}

function syncBrandingFolder(dir, colors, markSvg, png, horizontalSvg, onDarkSvg, faviconSvg) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "logo-mark.svg"), markSvg);
  writeFileSync(join(dir, "logo-mark.png"), png);
  writeFileSync(join(dir, "brand-colors.json"), `${JSON.stringify(colors, null, 2)}\n`);
  writeFileSync(join(dir, "logo-horizontal.svg"), horizontalSvg);
  writeFileSync(join(dir, "logo-on-dark.svg"), onDarkSvg);
  writeFileSync(join(dir, "logo-monochrome.svg"), markSvg);
  writeFileSync(join(dir, "favicon.svg"), faviconSvg);

  const b64 = png.toString("base64");
  writeFileSync(join(dir, "logo-mark.base64.txt"), b64);
  writeFileSync(join(dir, "logo-source.js"), `window.RK_LOGO_B64=${JSON.stringify(b64)};\n`);
}

async function main() {
  const colors = JSON.parse(readFileSync(join(root, "Branding", "brand-colors.json"), "utf8"));
  const paths = extractPaths(readFileSync(sourceSvgPath, "utf8"));
  const markSvg = buildMarkSvg(colors, paths);
  const png = await sharp(Buffer.from(markSvg)).resize(1024, null, { fit: "inside" }).png().toBuffer();

  const markOnly = markPaths(colors, paths);
  const horizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" fill="none" role="img" aria-label="René Klenz — Digitale Dienstleistungen">
  <g transform="translate(8 10) scale(0.095) translate(${-CROP.x} ${-CROP.y})">
    ${markOnly}
  </g>
  <text x="108" y="54" fill="${colors.text}" font-family="'Segoe UI', Inter, system-ui, sans-serif" font-size="34" font-weight="600" letter-spacing="-0.02em">René Klenz</text>
  <text x="110" y="82" fill="${colors.textMuted}" font-family="'Segoe UI', Inter, system-ui, sans-serif" font-size="15" font-weight="500" letter-spacing="0.14em">DIGITALE DIENSTLEISTUNGEN</text>
</svg>
`;

  const onDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" fill="none" role="img" aria-label="René Klenz — Digitale Dienstleistungen">
  <g transform="translate(8 10) scale(0.095) translate(${-CROP.x} ${-CROP.y})">
    ${markOnly}
  </g>
  <text x="108" y="54" fill="${colors.textOnDark}" font-family="'Segoe UI', Inter, system-ui, sans-serif" font-size="34" font-weight="600" letter-spacing="-0.02em">René Klenz</text>
  <text x="110" y="82" fill="${colors.textMutedOnDark}" font-family="'Segoe UI', Inter, system-ui, sans-serif" font-size="15" font-weight="500" letter-spacing="0.14em">DIGITALE DIENSTLEISTUNGEN</text>
</svg>
`;

  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="${colors.faviconBg}"/><g transform="translate(3.5 5) scale(0.038) translate(${-CROP.x} ${-CROP.y})">${markOnly}</g></svg>
`;

  syncBrandingFolder(join(root, "public", "logo"), colors, markSvg, png, horizontalSvg, onDarkSvg, faviconSvg);
  syncBrandingFolder(join(root, "Branding"), colors, markSvg, png, horizontalSvg, onDarkSvg, faviconSvg);
  syncBrandingFolder(brandingSource, colors, markSvg, png, horizontalSvg, onDarkSvg, faviconSvg);

  writeFileSync(join(root, "public", "favicon.svg"), faviconSvg);
  writeFileSync(join(root, "Branding", "logo-source-master.svg"), readFileSync(sourceSvgPath, "utf8"));

  console.log(`Logo export crop=${CROP.width}x${CROP.height}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

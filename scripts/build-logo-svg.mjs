import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import potrace from "potrace";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "Branding", "logo-mark.png");
const outDir = join(root, "Branding");

async function traceLayer(buffer, color, params) {
  return new Promise((resolve, reject) => {
    potrace.trace(buffer, { ...params, color }, (error, svg) => {
      if (error) reject(error);
      else resolve(svg);
    });
  });
}

function extractPath(svg) {
  const match = svg.match(/<path[^>]*d="([^"]+)"[^>]*>/);
  return match?.[1] ?? "";
}

async function buildMask(filter) {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(info.width * info.height);

  for (let i = 0; i < info.width * info.height; i += 1) {
    const offset = i * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const a = data[offset + 3];

    if (a < 40) {
      out[i] = 255;
      continue;
    }

    const isBlue = b > 150 && b > r + 20 && g > 100;
    const isDark = r < 120 && g < 120 && b < 150 && !isBlue;

    if (filter === "blue" && isBlue) out[i] = 0;
    else if (filter === "dark" && isDark) out[i] = 0;
    else out[i] = 255;
  }

  return sharp(out, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();
}

async function main() {
  mkdirSync(outDir, { recursive: true });

  const darkMask = await buildMask("dark");
  const blueMask = await buildMask("blue");

  writeFileSync(join(outDir, "logo-layer-dark.png"), darkMask);
  writeFileSync(join(outDir, "logo-layer-blue.png"), blueMask);

  const traceOpts = {
    turdSize: 20,
    optTolerance: 0.08,
    threshold: 128,
  };

  const darkSvg = await traceLayer(darkMask, "#303040", traceOpts);
  const blueSvg = await traceLayer(blueMask, "#80c0e0", { ...traceOpts, turdSize: 8 });

  const darkPath = extractPath(darkSvg);
  const bluePath = extractPath(blueSvg);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552 564" role="img" aria-label="René Klenz">
  <path fill="#303040" fill-rule="evenodd" d="${darkPath}"/>
  <path fill="#252530" opacity="0.42" d="M248 292 L262 304 L318 360 L304 346 Z"/>
  <path fill="#80c0e0" d="${bluePath}"/>
</svg>
`;

  writeFileSync(join(outDir, "logo-mark.svg"), svg);
  writeFileSync(join(root, "public", "logo", "logo-mark.svg"), svg);

  console.log("dark path length", darkPath.length);
  console.log("blue path length", bluePath.length);
  console.log("written logo-mark.svg");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

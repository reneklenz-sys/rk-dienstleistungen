import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import potrace from "potrace";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brandingSource = "E:/05_GEWERBE/RK Dienstleitung/Branding";

const REF_DARK = [45, 74, 111];
const REF_LIGHT = [107, 163, 214];
const REF_MID = [72, 118, 162];
const BG_THRESHOLD = 238;
const CROP_PAD = 8;

function rgbDist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function removeBackground(data) {
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    if (Math.min(out[i], out[i + 1], out[i + 2]) >= BG_THRESHOLD) {
      out[i + 3] = 0;
    }
  }
  return out;
}

function findBounds(data, width, height) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] > 12) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  return {
    left: Math.max(0, minX - CROP_PAD),
    top: Math.max(0, minY - CROP_PAD),
    width: Math.min(width, maxX + CROP_PAD + 1) - Math.max(0, minX - CROP_PAD),
    height: Math.min(height, maxY + CROP_PAD + 1) - Math.max(0, minY - CROP_PAD),
  };
}

async function loadMaster() {
  const sourcePath = join(brandingSource, "logo-mark-preview.png");
  const { data, info } = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const cleaned = removeBackground(data);
  const bounds = findBounds(cleaned, info.width, info.height);

  return sharp(cleaned, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extract(bounds)
    .raw()
    .toBuffer({ resolveWithObject: true });
}

function buildMask(data, width, height, layer) {
  const out = Buffer.alloc(width * height);

  for (let i = 0; i < width * height; i += 1) {
    const offset = i * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const a = data[offset + 3];
    const px = [r, g, b];

    if (a < 20) {
      out[i] = 255;
      continue;
    }

    const dDark = rgbDist(px, REF_DARK);
    const dLight = rgbDist(px, REF_LIGHT);
    const dMid = rgbDist(px, REF_MID);
    const minD = Math.min(dDark, dLight, dMid);

    if (minD > 52) {
      out[i] = 255;
      continue;
    }

    const isLight = minD === dLight && dLight + 8 < dDark;
    const isDark = !isLight;

    if (layer === "light" && isLight) out[i] = 0;
    else if (layer === "dark" && isDark) out[i] = 0;
    else out[i] = 255;
  }

  return out;
}

function traceLayer(buffer, width, height) {
  const png = sharp(buffer, { raw: { width, height, channels: 1 } }).png().toBuffer();

  return new Promise((resolve, reject) => {
    png.then((input) => {
      potrace.trace(
        input,
        {
          turdSize: 2,
          optTolerance: 0.18,
          threshold: 128,
          color: "#000000",
          background: "#ffffff",
        },
        (error, svg) => {
          if (error) reject(error);
          else resolve(svg);
        },
      );
    }).catch(reject);
  });
}

function extractPaths(svg) {
  return [...svg.matchAll(/<path[^>]*d="([^"]+)"/g)].map((match) => match[1]);
}

async function main() {
  const colors = JSON.parse(readFileSync(join(root, "Branding", "brand-colors.json"), "utf8"));
  const { data, info } = await loadMaster();
  const { width, height } = info;

  const darkMask = buildMask(data, width, height, "dark");
  const lightMask = buildMask(data, width, height, "light");

  const outDir = join(root, "Branding");
  mkdirSync(outDir, { recursive: true });
  await sharp(darkMask, { raw: { width, height, channels: 1 } }).png().toFile(join(outDir, "logo-layer-dark.png"));
  await sharp(lightMask, { raw: { width, height, channels: 1 } }).png().toFile(join(outDir, "logo-layer-light.png"));

  const [darkSvg, lightSvg] = await Promise.all([
    traceLayer(darkMask, width, height),
    traceLayer(lightMask, width, height),
  ]);

  const darkPaths = extractPaths(darkSvg);
  const lightPaths = extractPaths(lightSvg);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none" role="img" aria-label="René Klenz">
${darkPaths.map((path) => `  <path fill="var(--logo-dark, ${colors.primaryDark})" fill-rule="evenodd" d="${path}"/>`).join("\n")}
${lightPaths.map((path) => `  <path fill="var(--logo-accent, ${colors.accentLight})" d="${path}"/>`).join("\n")}
</svg>
`;

  const targets = [
    join(root, "public", "logo", "logo-mark.svg"),
    join(root, "Branding", "logo-mark.svg"),
  ];
  mkdirSync(join(root, "public", "logo"), { recursive: true });
  for (const file of targets) {
    writeFileSync(file, svg);
  }

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(join(root, "public", "logo", "logo-mark.png"), png);
  writeFileSync(join(root, "Branding", "logo-mark.png"), png);

  console.log(`Vector logo ${width}x${height}`);
  console.log(`Paths: dark=${darkPaths.length}, light=${lightPaths.length}`);
  console.log(`Dark path chars: ${darkPaths.join("").length}`);
  console.log(`Light path chars: ${lightPaths.join("").length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

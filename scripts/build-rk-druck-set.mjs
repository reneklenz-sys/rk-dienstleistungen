import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const branding = join(root, "Branding");
const outRoot = "E:/05_GEWERBE/RK Dienstleitung/druck-set-rk-dienstleistung";

function readColors() {
  return JSON.parse(readFileSync(join(branding, "brand-colors.json"), "utf8"));
}

function readMarkSvg() {
  return readFileSync(join(branding, "logo-mark.svg"), "utf8");
}

function readHorizontal() {
  return readFileSync(join(branding, "logo-horizontal.svg"), "utf8");
}

function readOnDark() {
  return readFileSync(join(branding, "logo-on-dark.svg"), "utf8");
}

function monoMarkSvg(color) {
  const mark = readMarkSvg();
  return mark
    .replace(/fill="#2B3442"/g, `fill="${color}"`)
    .replace(/fill="#7DD3FC"/g, `fill="${color}"`);
}

async function svgToPng(svg, width) {
  return sharp(Buffer.from(svg)).resize(width, null, { fit: "inside" }).png().toBuffer();
}

async function previewOnBackground(svg, bg, width = 1200, height = 800) {
  const logo = await sharp(Buffer.from(svg)).resize(Math.round(width * 0.42), null, { fit: "inside" }).png().toBuffer();
  return sharp({
    create: { width, height, channels: 3, background: bg },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toBuffer();
}

function writeText(path, content) {
  writeFileSync(path, content, "utf8");
}

async function main() {
  const colors = readColors();
  const dirs = {
    logos: join(outRoot, "01-logos"),
    qr: join(outRoot, "02-qr-code"),
    symbol: join(outRoot, "03-symbol-favicon"),
    preview: join(outRoot, "04-vorschau"),
    pdf: join(outRoot, "05-pdf"),
  };

  Object.values(dirs).forEach((dir) => mkdirSync(dir, { recursive: true }));

  const markSvg = readMarkSvg();
  const horizontalSvg = readHorizontal();
  const onDarkSvg = readOnDark();
  const monoDark = monoMarkSvg(colors.primaryDark);
  const monoWhite = monoMarkSvg("#ffffff");

  writeFileSync(join(dirs.logos, "logo-source-master.svg"), readFileSync(join(branding, "Logo ohne BG.svg")));
  writeFileSync(join(dirs.logos, "logo-mark-fuer-hellen-hintergrund.svg"), markSvg);
  writeFileSync(join(dirs.logos, "logo-horizontal-fuer-hellen-hintergrund.svg"), horizontalSvg);
  writeFileSync(join(dirs.logos, "logo-horizontal-fuer-dunklen-hintergrund.svg"), onDarkSvg);
  writeFileSync(join(dirs.logos, "logo-einfarbig-anthrazit-fuer-hellen-hintergrund.svg"), monoDark);
  writeFileSync(join(dirs.logos, "logo-einfarbig-weiss-fuer-dunklen-hintergrund.svg"), monoWhite);

  const logoExports = [
    ["logo-mark-fuer-hellen-hintergrund.png", markSvg, 1600],
    ["logo-horizontal-fuer-hellen-hintergrund.png", horizontalSvg, 1600],
    ["logo-horizontal-fuer-dunklen-hintergrund.png", onDarkSvg, 1600],
    ["logo-einfarbig-anthrazit-fuer-hellen-hintergrund.png", monoDark, 1600],
    ["logo-einfarbig-weiss-fuer-dunklen-hintergrund.png", monoWhite, 1600],
  ];

  for (const [name, svg, width] of logoExports) {
    writeFileSync(join(dirs.logos, name), await svgToPng(svg, width));
  }

  writeFileSync(join(dirs.symbol, "logo-mark-favicon.svg"), readFileSync(join(branding, "favicon.svg")));
  writeFileSync(join(dirs.symbol, "logo-mark-512.png"), await svgToPng(markSvg, 512));
  writeFileSync(join(dirs.symbol, "logo-mark-1024.png"), await svgToPng(markSvg, 1024));
  writeFileSync(join(dirs.symbol, "logo-mark-einfarbig-anthrazit-ohne-text.svg"), monoDark);
  writeFileSync(join(dirs.symbol, "logo-mark-einfarbig-weiss-ohne-text.svg"), monoWhite);
  writeFileSync(join(dirs.symbol, "logo-mark-einfarbig-anthrazit-ohne-text.png"), await svgToPng(monoDark, 1024));
  writeFileSync(join(dirs.symbol, "logo-mark-einfarbig-weiss-ohne-text.png"), await svgToPng(monoWhite, 1024));

  writeFileSync(
    join(dirs.preview, "vorschau-logo-mark-auf-hell.png"),
    await previewOnBackground(markSvg, colors.onMark),
  );
  writeFileSync(
    join(dirs.preview, "vorschau-logo-mark-auf-anthrazit.png"),
    await previewOnBackground(markSvg, colors.faviconBg),
  );
  writeFileSync(
    join(dirs.preview, "vorschau-logo-weiss-auf-anthrazit.png"),
    await previewOnBackground(monoWhite, colors.faviconBg),
  );
  writeFileSync(
    join(dirs.preview, "vorschau-logo-horizontal-auf-hell.png"),
    await previewOnBackground(horizontalSvg, colors.onMark),
  );

  writeText(
    join(outRoot, "05-pdf", "HINWEIS-PDF.txt"),
    "Für PDF: SVG-Dateien aus 01-logos direkt an die Druckerei geben.\nDie meisten Druckereien importieren SVG besser als vorgefertigte PDF.\n",
  );

  writeText(
    join(outRoot, "README-Druckerei.txt"),
    `Druck-Set René Klenz — Digitale Dienstleistungen

01-logos
- logo-mark-fuer-hellen-hintergrund.svg/png — Markenzeichen für helle Flächen
- logo-horizontal-fuer-hellen-hintergrund.svg/png — Logo mit Name für Briefpapier/Web
- logo-horizontal-fuer-dunklen-hintergrund.svg/png — helle Schrift auf dunklem Hintergrund
- logo-einfarbig-anthrazit / logo-einfarbig-weiss — einfarbig für Stift, Textil, Prägung
- logo-source-master.svg — Original-Reserve (Photopea-Export)

03-symbol-favicon
- logo-mark-512.png / 1024.png — App, Favicon, kleine Werbemittel
- logo-mark-einfarbig-*-ohne-text — nur Monogramm, ohne Schriftzug

04-vorschau
- Vorschau auf hell (#F8FAFC) und anthrazit (#1F2937)

05-pdf
- Hinweis: SVG aus 01-logos bevorzugen

Empfehlung: Wenn möglich SVG verwenden. PNG nur, wenn kein Vektor akzeptiert wird.
`,
  );

  writeText(
    join(outRoot, "FARBEN-UND-DRUCKHINWEISE.txt"),
    `Markenfarben — ${colors.name}

Primary Anthrazit: ${colors.primaryDark}
Primary Mittel:      ${colors.primaryMid}
Akzent Cyan hell:    ${colors.accentLight}
Akzent Cyan mittel:  ${colors.accentMid}
Hintergrund hell:    ${colors.onMark}
Favicon / Dunkel:    ${colors.faviconBg}
Text hell:           ${colors.text}
Text auf dunkel:     ${colors.textOnDark}

Hinweis für Druck: RGB/HEX-Werte für Bildschirm und Digitaldruck.
Für Offset/Flexo CMYK oder Pantone beim Drucker abgleichen lassen.
`,
  );

  writeText(
    join(outRoot, "CI-KURZGUIDE-RK-Dienstleistung.txt"),
    `CI Kurzguide — René Klenz

Logo
- Monogramm R+K, Anthrazit + Cyan
- Auf hellem Hintergrund: logo-mark oder logo-horizontal
- Auf dunklem Hintergrund: logo-einfarbig-weiss oder horizontal für dunklen Hintergrund
- Nicht verzerren, nicht zu klein skalieren, Freiraum um das Logo lassen

Farben
- Anthrazit ${colors.primaryDark} + Cyan ${colors.accentLight}
- Keine fremden Blautöne mischen

Schriften (Website)
- Display: Cormorant Garamond
- Fließtext: DM Sans

Do
- ruhig, hochwertig, viel Weißraum
- Vektor bevorzugen

Don't
- Logo auf unruhigen Fotos ohne Kontrast
- Schatten oder 3D-Effekte hinzufügen
- Farben willkürlich ändern
`,
  );

  console.log(`Druck-Set erstellt: ${outRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

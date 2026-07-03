import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "references", "nextcrush");
const baseUrl = process.env.NEXTCRUSH_URL ?? "http://localhost:8080";

const shots = [
  { name: "01-landing", path: "/", width: 1440, height: 900 },
  { name: "02-preise", path: "/preise", width: 1440, height: 900 },
  { name: "03-mobile", path: "/", width: 390, height: 844 },
];

async function main() {
  mkdirSync(outDir, { recursive: true });

  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });

  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: { width: shot.width, height: shot.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto(`${baseUrl}${shot.path}`, { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForTimeout(1800);
    await page.screenshot({ path: join(outDir, `${shot.name}.png`) });
    console.log(`Saved ${shot.name}.png`);
    await context.close();
  }

  await browser.close();

  writeFileSync(
    join(outDir, "manifest.json"),
    JSON.stringify(
      shots.map((shot) => ({
        src: `/references/nextcrush/${shot.name}.png`,
        name: shot.name,
      })),
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

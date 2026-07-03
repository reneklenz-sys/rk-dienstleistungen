import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "references", "hausarztpraxis-klaetschke");

const shots = [
  { name: "01-hero", scrollY: 0 },
  { name: "02-leistungen", scrollY: 900 },
  { name: "03-team", scrollY: 1800 },
  { name: "04-kontakt", scrollY: 3200 },
  { name: "05-mobile", scrollY: 0, width: 390, height: 844 },
];

async function main() {
  mkdirSync(outDir, { recursive: true });

  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto("https://www.hausarztpraxis-klaetschke.de/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  for (const shot of shots) {
    if (shot.width && shot.height) {
      await page.setViewportSize({ width: shot.width, height: shot.height });
      await page.goto("https://www.hausarztpraxis-klaetschke.de/", { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(1200);
    } else {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);
      await page.waitForTimeout(800);
    }

    await page.screenshot({
      path: join(outDir, `${shot.name}.png`),
      fullPage: false,
    });
    console.log(`Saved ${shot.name}.png`);
  }

  await browser.close();
  writeFileSync(
    join(outDir, "manifest.json"),
    JSON.stringify(
      shots.map((shot) => ({
        src: `/references/hausarztpraxis-klaetschke/${shot.name}.png`,
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

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const envPath = join(root, ".env.local");
const examplePath = join(root, ".env.example");

function run(command) {
  return execSync(command, { cwd: root, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
}

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split("\n")
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index), line.slice(index + 1)];
      }),
  );
}

function writeEnvFile(path, values) {
  const lines = [
    `NEXT_PUBLIC_SITE_URL=${values.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`,
    `NEXT_PUBLIC_SANITY_PROJECT_ID=${values.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
    `NEXT_PUBLIC_SANITY_DATASET=${values.NEXT_PUBLIC_SANITY_DATASET || "production"}`,
    `NEXT_PUBLIC_SANITY_API_VERSION=${values.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-28"}`,
    "",
    "# Optional — nur für private Datasets oder Preview.",
    `SANITY_API_READ_TOKEN=${values.SANITY_API_READ_TOKEN || ""}`,
    "",
  ];
  writeFileSync(path, lines.join("\n"), "utf8");
}

function extractProjectId(output) {
  const match = output.match(/Project ID:\s*([a-z0-9]+)/i) || output.match(/id:\s*['"]?([a-z0-9]+)/i);
  return match?.[1] ?? null;
}

function findExistingProject() {
  try {
    const list = run("npx sanity projects list --json");
    const projects = JSON.parse(list);
    const hit =
      projects.find((project) => /rk dienstleistungen/i.test(project.displayName || project.title || "")) ||
      projects[0];
    return hit?.id ?? null;
  } catch {
    return null;
  }
}

const current = readEnvFile(envPath);
const example = readEnvFile(examplePath);
const existingId = current.NEXT_PUBLIC_SANITY_PROJECT_ID || example.NEXT_PUBLIC_SANITY_PROJECT_ID;
const hasValidId =
  existingId && existingId !== "your-project-id" && existingId !== "replace-with-project-id";

if (hasValidId) {
  writeEnvFile(envPath, { ...example, ...current, NEXT_PUBLIC_SANITY_PROJECT_ID: existingId });
  console.log(`✓ .env.local ist bereit (Project ID: ${existingId})`);
  process.exit(0);
}

let projectId = findExistingProject();

if (!projectId) {
  console.log("→ Lege Sanity-Projekt an …");
  try {
    const created = run('npm run sanity:create-project');
    projectId = extractProjectId(created);
  } catch (error) {
    const output = `${error.stdout || ""}\n${error.stderr || ""}`.trim();
    projectId = extractProjectId(output);
    if (!projectId) {
      console.error("\nSanity-Setup fehlgeschlagen. Bitte zuerst einloggen:\n");
      console.error("  npx sanity login --provider github\n");
      console.error("Danach erneut:\n");
      console.error("  npm run sanity:setup\n");
      if (output) console.error(output);
      process.exit(1);
    }
  }
}

if (!projectId) {
  console.error("Konnte keine Project ID ermitteln. Bitte manuell in .env.local eintragen.");
  process.exit(1);
}

writeEnvFile(envPath, { ...example, ...current, NEXT_PUBLIC_SANITY_PROJECT_ID: projectId });
console.log(`✓ Sanity verbunden — Project ID: ${projectId}`);
console.log("→ Dev-Server neu starten, dann http://localhost:3000/studio öffnen");

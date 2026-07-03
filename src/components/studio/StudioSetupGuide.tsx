"use client";

import Link from "next/link";

export function StudioSetupGuide() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-5 py-16 text-foreground">
      <div className="glass-panel max-w-xl rounded-[calc(var(--surface-radius)+4px)] p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Sanity Studio</p>
        <h1 className="mt-3 font-display text-3xl font-medium tracking-tight">CMS noch nicht verbunden</h1>
        <p className="mt-4 leading-7 text-muted">
          Das Studio braucht eine Sanity Project ID in <code className="text-foreground">.env.local</code>. Ohne diese
          Datei läuft die Website mit Fallback-Inhalten — das Studio aber nicht.
        </p>

        <ol className="mt-8 grid gap-4 text-sm leading-7 text-foreground/90">
          <li>
            <span className="font-semibold text-foreground">1.</span> Einloggen (GitHub oder Google):
            <pre className="mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-muted">
              npx sanity login --provider github
            </pre>
          </li>
          <li>
            <span className="font-semibold text-foreground">2.</span> Projekt anlegen und{" "}
            <code className="text-foreground">.env.local</code> schreiben:
            <pre className="mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-muted">
              npm run sanity:setup
            </pre>
          </li>
          <li>
            <span className="font-semibold text-foreground">3.</span> Dev-Server neu starten und{" "}
            <code className="text-foreground">/studio</code> erneut öffnen
          </li>
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/de"
            className="primary-glass-button inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
          >
            Zur Website
          </Link>
          <a
            href="https://www.sanity.io/docs/nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-preset-button inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
          >
            Sanity Docs ↗
          </a>
        </div>
      </div>
    </div>
  );
}

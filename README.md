# RK Dienstleistungen

Portfolio-Website von René Klenz — Next.js, Sanity CMS, Dark Mode, PWA.

## Start

```bash
npm install
npm run dev
```

- Website: [http://localhost:3000/de](http://localhost:3000/de)
- CMS Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## Sanity Studio verbinden

Ohne `.env.local` zeigt `/studio` eine Setup-Anleitung. Die Website läuft parallel mit Fallback-Inhalten.

```bash
npx sanity login --provider github
npm run sanity:setup
```

`npm run sanity:setup` legt das Sanity-Projekt an (falls nötig) und schreibt die Project ID automatisch in `.env.local`. Dev-Server neu starten, dann `/studio` öffnen.

## Scripts

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Production-Build |
| `npm run sanity:setup` | Sanity-Projekt anlegen + `.env.local` schreiben |
| `npm run sanity:create-project` | Nur Sanity-Projekt anlegen |
| `npm run sanity:deploy` | Studio bei Sanity hosten |
| `npm run reference:capture-nextcrush` | Referenz-Screenshots für nextCrush |

## Akzent-Presets

Im Studio unter **Design Preset → Farb-Preset**: Anthrazit & Cyan, Amethyst, Graphit, Champagner, Ozean.

## Referenz-Screenshots

Im Studio unter **Projekt / Referenz → Screenshots** — Bilder und Alt-Texte pflegen.

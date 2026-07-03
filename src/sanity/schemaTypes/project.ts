import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projekt / Referenz",
  type: "document",
  orderings: [{ title: "Reihenfolge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "shortDescription", title: "Kurzbeschreibung", type: "localizedText" }),
    defineField({ name: "description", title: "Ausführliche Beschreibung", type: "localizedText" }),
    defineField({ name: "category", title: "Kategorie", type: "localizedString" }),
    defineField({
      name: "clientType",
      title: "Kunde oder Eigenprojekt",
      type: "string",
      initialValue: "client",
      options: {
        list: [
          { title: "Kundenprojekt", value: "client" },
          { title: "Eigenprojekt", value: "ownProject" },
        ],
      },
    }),
    defineField({ name: "year", title: "Jahr", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "concept",
      options: {
        list: [
          { title: "Konzept", value: "concept" },
          { title: "In Arbeit", value: "inProgress" },
          { title: "Live", value: "live" },
          { title: "Abgeschlossen", value: "completed" },
        ],
      },
    }),
    defineField({ name: "technologies", title: "Technologien", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "services", title: "Leistungen", type: "localizedStringList" }),
    defineField({
      name: "screenshots",
      title: "Screenshots / Referenzbilder",
      description: "Für die Startseiten-Showcase-Karussell und die Projekt-Detailseite. Reihenfolge per Drag & Drop.",
      type: "array",
      of: [{ type: "projectScreenshot" }],
    }),
    defineField({ name: "liveLink", title: "Live-Link", type: "url" }),
    defineField({ name: "githubLink", title: "GitHub-Link", type: "url" }),
    defineField({ name: "previewLink", title: "Preview-Link", type: "url" }),
    defineField({ name: "caseStudyText", title: "Case-Study-Text", type: "localizedText" }),
    defineField({ name: "outcome", title: "Ergebnis / Mehrwert", type: "localizedText" }),
    defineField({ name: "featured", title: "Featured-Projekt", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Reihenfolge", type: "number", initialValue: 1 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

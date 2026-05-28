import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
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
    defineField({ name: "eyebrow", title: "Label", type: "localizedString" }),
    defineField({ name: "summary", title: "Kurzfassung", type: "localizedText" }),
    defineField({ name: "challenge", title: "Ausgangslage", type: "localizedText" }),
    defineField({ name: "solution", title: "Lösung", type: "localizedText" }),
    defineField({ name: "result", title: "Ergebnis", type: "localizedText" }),
    defineField({ name: "metrics", title: "Ergebnisse / Merkmale", type: "localizedStringList" }),
    defineField({ name: "project", title: "Verknüpftes Projekt", type: "reference", to: [{ type: "project" }] }),
    defineField({
      name: "gallery",
      title: "Bilder",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "order", title: "Reihenfolge", type: "number", initialValue: 1 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

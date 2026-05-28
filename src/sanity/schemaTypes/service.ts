import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Leistung",
  type: "document",
  orderings: [{ title: "Reihenfolge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", title: "Titel", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Beschreibung", type: "localizedText" }),
    defineField({ name: "tags", title: "Tags", type: "localizedStringList" }),
    defineField({ name: "order", title: "Reihenfolge", type: "number", initialValue: 1 }),
    defineField({ name: "visible", title: "Sichtbar", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "title.de", subtitle: "description.de" },
  },
});

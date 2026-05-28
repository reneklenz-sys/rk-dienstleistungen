import { defineField, defineType } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Ablauf-Schritt",
  type: "document",
  orderings: [{ title: "Reihenfolge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", title: "Titel", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Beschreibung", type: "localizedText" }),
    defineField({ name: "order", title: "Reihenfolge", type: "number", initialValue: 1 }),
    defineField({ name: "visible", title: "Sichtbar", type: "boolean", initialValue: true }),
  ],
});

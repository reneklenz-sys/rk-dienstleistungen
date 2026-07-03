import { defineField, defineType } from "sanity";

export const labProduct = defineType({
  name: "labProduct",
  title: "Produkt / Lab",
  type: "document",
  orderings: [{ title: "Reihenfolge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", title: "Titel", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.de", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Beschreibung", type: "localizedText" }),
    defineField({ name: "type", title: "Typ", type: "localizedString" }),
    defineField({ name: "status", title: "Status", type: "localizedString" }),
    defineField({ name: "highlights", title: "Highlights", type: "localizedStringList" }),
    defineField({
      name: "externalLink",
      title: "Externer Link",
      type: "url",
      description: "Optional — z. B. YouTube-Kanal oder Live-Produkt außerhalb der Website.",
    }),
    defineField({
      name: "images",
      title: "Bilder / Screenshots",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "order", title: "Reihenfolge", type: "number", initialValue: 1 }),
    defineField({ name: "visible", title: "Sichtbar", type: "boolean", initialValue: true }),
  ],
});

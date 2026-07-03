import { defineField, defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Deutsch / Englisch Text",
  type: "object",
  fields: [
    defineField({ name: "de", title: "Deutsch", type: "string" }),
    defineField({ name: "en", title: "Englisch", type: "string" }),
  ],
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Deutsch / Englisch Langtext",
  type: "object",
  fields: [
    defineField({ name: "de", title: "Deutsch", type: "text", rows: 4 }),
    defineField({ name: "en", title: "Englisch", type: "text", rows: 4 }),
  ],
});

export const localizedStringList = defineType({
  name: "localizedStringList",
  title: "Deutsch / Englisch Liste",
  type: "object",
  fields: [
    defineField({
      name: "de",
      title: "Deutsch",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "en",
      title: "Englisch",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "SEO-Titel", type: "localizedString" }),
    defineField({ name: "description", title: "SEO-Beschreibung", type: "localizedText" }),
    defineField({ name: "image", title: "Open-Graph-Bild", type: "image" }),
    defineField({
      name: "noIndex",
      title: "Nicht indexieren",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const projectScreenshot = defineType({
  name: "projectScreenshot",
  title: "Screenshot",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternativtext",
      type: "localizedString",
      description: "Kurz beschreiben, was auf dem Screenshot zu sehen ist.",
    }),
  ],
  preview: {
    select: { title: "alt.de", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Screenshot", media };
    },
  },
});

export const sectionSetting = defineType({
  name: "sectionSetting",
  title: "Abschnitt",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Abschnitt",
      type: "string",
      options: {
        list: [
          { title: "Leistungen", value: "services" },
          { title: "Warum ich", value: "why" },
          { title: "Featured Projects", value: "featured" },
          { title: "Case Studies", value: "caseStudies" },
          { title: "Produkte / Labs", value: "labs" },
          { title: "Ablauf", value: "process" },
          { title: "Über mich", value: "about" },
          { title: "Kontakt", value: "contact" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visible",
      title: "Sichtbar",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

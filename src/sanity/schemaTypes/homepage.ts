import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Startseite",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Interner Titel", type: "string", initialValue: "Startseite" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "designPreset", title: "Design Preset", type: "reference", to: [{ type: "designPreset" }] }),
    defineField({
      name: "sections",
      title: "Abschnittsreihenfolge und Sichtbarkeit",
      type: "array",
      of: [{ type: "sectionSetting" }],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Label", type: "localizedString" }),
        defineField({ name: "title", title: "Headline", type: "localizedText" }),
        defineField({ name: "lead", title: "Intro", type: "localizedText" }),
        defineField({ name: "primaryCta", title: "Primärer CTA", type: "localizedString" }),
        defineField({ name: "secondaryCta", title: "Sekundärer CTA", type: "localizedString" }),
        defineField({ name: "proofPoints", title: "Proof Points", type: "localizedStringList" }),
      ],
    }),
    defineField({
      name: "why",
      title: "Warum ich",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titel", type: "localizedString" }),
        defineField({ name: "lead", title: "Intro", type: "localizedText" }),
        defineField({ name: "points", title: "Punkte", type: "localizedStringList" }),
      ],
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "featuredCaseStudies",
      title: "Featured Case Studies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({
      name: "featuredLabs",
      title: "Featured Produkte / Labs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "labProduct" }] }],
    }),
    defineField({
      name: "about",
      title: "Über mich",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titel", type: "localizedString" }),
        defineField({ name: "text", title: "Text", type: "localizedText" }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Kontakt",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titel", type: "localizedString" }),
        defineField({ name: "lead", title: "Intro", type: "localizedText" }),
        defineField({ name: "email", title: "E-Mail", type: "string" }),
        defineField({ name: "phone", title: "Telefon", type: "string" }),
        defineField({ name: "cta", title: "CTA", type: "localizedString" }),
      ],
    }),
  ],
});

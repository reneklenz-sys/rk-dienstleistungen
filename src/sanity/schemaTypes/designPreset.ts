import { defineField, defineType } from "sanity";

export const designPreset = defineType({
  name: "designPreset",
  title: "Design Preset",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Preset-Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "colorPreset",
      title: "Farb-Preset",
      type: "string",
      initialValue: "anthraciteCyan",
      options: {
        list: [
          { title: "Anthrazit & Cyan", value: "anthraciteCyan" },
          { title: "Amethyst", value: "amethyst" },
          { title: "Graphit", value: "graphite" },
          { title: "Champagner", value: "champagne" },
          { title: "Ozean", value: "ocean" },
        ],
      },
      description: "Akzentfarbe für Buttons, Tags, Aurora und Logo — im Studio live vergleichen.",
    }),
    defineField({
      name: "fontPreset",
      title: "Schrift-Preset",
      type: "string",
      initialValue: "modern",
      options: {
        list: [
          { title: "Modern", value: "modern" },
          { title: "Editorial", value: "editorial" },
          { title: "Klar", value: "clear" },
        ],
      },
    }),
    defineField({
      name: "radiusPreset",
      title: "Form-/Rundungs-Preset",
      type: "string",
      initialValue: "round",
      options: {
        list: [
          { title: "Soft", value: "soft" },
          { title: "Round", value: "round" },
          { title: "Pill", value: "pill" },
        ],
      },
    }),
    defineField({
      name: "surfaceStyle",
      title: "Oberflächenstil",
      type: "string",
      initialValue: "premiumGlass",
      options: {
        list: [
          { title: "Klar", value: "clear" },
          { title: "Milchglas", value: "frosted" },
          { title: "Premium Glass", value: "premiumGlass" },
        ],
      },
    }),
    defineField({
      name: "logoColorMode",
      title: "Logo-Farben",
      type: "string",
      initialValue: "original",
      options: {
        list: [
          { title: "Original", value: "original" },
          { title: "An Preset anpassen", value: "adaptToPreset" },
        ],
      },
    }),
    defineField({
      name: "darkModeDefault",
      title: "Darkmode-Standard",
      type: "string",
      initialValue: "dark",
      options: {
        list: [{ title: "Dunkel", value: "dark" }],
      },
    }),
    defineField({ name: "accentColor", title: "Akzentfarbe", type: "string", initialValue: "#7c5cff" }),
    defineField({ name: "accentSoftColor", title: "Weiche Akzentfarbe", type: "string", initialValue: "#d9d2ff" }),
    defineField({
      name: "heroVariant",
      title: "Hero-Variante",
      type: "string",
      initialValue: "calm",
      options: {
        list: [
          { title: "Calm", value: "calm" },
          { title: "Product", value: "product" },
          { title: "Editorial", value: "editorial" },
        ],
      },
    }),
  ],
});

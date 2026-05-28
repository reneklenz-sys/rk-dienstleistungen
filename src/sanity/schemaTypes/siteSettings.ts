import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Website-Name", type: "string" }),
    defineField({ name: "email", title: "E-Mail", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({
      name: "defaultLocale",
      title: "Standardsprache",
      type: "string",
      initialValue: "de",
      options: {
        list: [
          { title: "Deutsch", value: "de" },
          { title: "Englisch", value: "en" },
        ],
      },
    }),
    defineField({
      name: "themeDefault",
      title: "Theme-Standard",
      type: "string",
      initialValue: "system",
      options: {
        list: [
          { title: "System", value: "system" },
          { title: "Hell", value: "light" },
          { title: "Dunkel", value: "dark" },
        ],
      },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
    defineField({ name: "seo", title: "Default SEO", type: "seo" }),
  ],
});

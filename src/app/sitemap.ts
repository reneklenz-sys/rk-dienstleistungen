import type { MetadataRoute } from "next";

import { fallbackHomepage } from "@/data/fallback";
import { locales } from "@/lib/i18n";

const baseUrl = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
  }));

  const projects = locales.flatMap((locale) =>
    fallbackHomepage.projects.map((project) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
    })),
  );

  const caseStudies = locales.flatMap((locale) =>
    fallbackHomepage.caseStudies.map((study) => ({
      url: `${baseUrl}/${locale}/case-studies/${study.slug}`,
      lastModified: new Date(),
    })),
  );

  return [...home, ...projects, ...caseStudies];
}

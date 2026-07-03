import type { MetadataRoute } from "next";

import { fallbackHomepage } from "@/data/fallback";
import { legalPageKeys } from "@/data/legal";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

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

  const projectIndex = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/projects`,
    lastModified: new Date(),
  }));

  const caseStudies = locales.flatMap((locale) =>
    fallbackHomepage.caseStudies.map((study) => ({
      url: `${baseUrl}/${locale}/case-studies/${study.slug}`,
      lastModified: new Date(),
    })),
  );

  const legal = locales.flatMap((locale) =>
    [...legalPageKeys, "sitemap"].map((page) => ({
      url: `${baseUrl}/${locale}/${page}`,
      lastModified: new Date(),
    })),
  );

  return [...home, ...projectIndex, ...projects, ...caseStudies, ...legal];
}

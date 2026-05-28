import { fallbackHomepage } from "@/data/fallback";
import type { CaseStudy, HomepageData, Project } from "@/types/content";

import { sanityClient } from "./client";
import { caseStudyBySlugQuery, homepageQuery, projectBySlugQuery } from "./queries";

export async function getHomepageData(): Promise<HomepageData> {
  if (!sanityClient) return fallbackHomepage;

  try {
    const data = await sanityClient.fetch<Partial<HomepageData> | null>(
      homepageQuery,
      {},
      { next: { revalidate: 60 } },
    );

    if (!data) return fallbackHomepage;

    return {
      ...fallbackHomepage,
      ...data,
      seo: data.seo || fallbackHomepage.seo,
      designPreset: data.designPreset || fallbackHomepage.designPreset,
      sectionOrder: data.sectionOrder?.length ? data.sectionOrder : fallbackHomepage.sectionOrder,
      hiddenSections: data.hiddenSections || [],
      hero: data.hero || fallbackHomepage.hero,
      why: data.why || fallbackHomepage.why,
      services: data.services?.length ? data.services : fallbackHomepage.services,
      projects: data.projects?.length ? data.projects : fallbackHomepage.projects,
      caseStudies: data.caseStudies?.length ? data.caseStudies : fallbackHomepage.caseStudies,
      labs: data.labs?.length ? data.labs : fallbackHomepage.labs,
      process: data.process?.length ? data.process : fallbackHomepage.process,
      about: data.about || fallbackHomepage.about,
      contact: data.contact || fallbackHomepage.contact,
    };
  } catch {
    return fallbackHomepage;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fallback = fallbackHomepage.projects.find((project) => project.slug === slug) || null;
  if (!sanityClient) return fallback;

  try {
    return (await sanityClient.fetch<Project | null>(
      projectBySlugQuery,
      { slug },
      { next: { revalidate: 60 } },
    )) || fallback;
  } catch {
    return fallback;
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const fallback = fallbackHomepage.caseStudies.find((study) => study.slug === slug) || null;
  if (!sanityClient) return fallback;

  try {
    return (await sanityClient.fetch<CaseStudy | null>(
      caseStudyBySlugQuery,
      { slug },
      { next: { revalidate: 60 } },
    )) || fallback;
  } catch {
    return fallback;
  }
}

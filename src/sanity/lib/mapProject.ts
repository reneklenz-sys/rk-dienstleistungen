import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import type { LocalizedString, Project, ProjectScreenshot } from "@/types/content";

import { sanityClient } from "./client";

type SanityScreenshot = {
  alt?: LocalizedString;
  image?: SanityImageSource;
};

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function screenshotUrl(image: SanityImageSource) {
  if (!builder) return "";
  return builder.image(image).width(1800).auto("format").quality(86).url();
}

export function mapProjectScreenshots(items?: SanityScreenshot[]): ProjectScreenshot[] | undefined {
  if (!items?.length) return undefined;

  const mapped = items
    .filter((item) => item.image)
    .map((item) => ({
      src: screenshotUrl(item.image!),
      alt: item.alt ?? { de: "Projekt-Screenshot", en: "Project screenshot" },
    }))
    .filter((item) => item.src);

  return mapped.length ? mapped : undefined;
}

export function normalizeProject(project: Partial<Project> & { slug: string }, fallback?: Project | null): Project {
  const base = fallback ?? (project as Project);

  return {
    ...base,
    ...project,
    screenshots: project.screenshots?.length ? project.screenshots : base.screenshots,
  };
}

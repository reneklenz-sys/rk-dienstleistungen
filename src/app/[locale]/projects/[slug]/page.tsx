import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { Tag } from "@/components/ui/Tag";
import { fallbackHomepage } from "@/data/fallback";
import { designStyle } from "@/design/tokens";
import { getText, isLocale, localizedPath, locales } from "@/lib/i18n";
import { getProjectBySlug } from "@/sanity/lib/fetch";
import type { Locale, Project } from "@/types/content";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const statusLabels = {
  de: { concept: "Konzept", inProgress: "In Arbeit", live: "Live", completed: "Abgeschlossen" },
  en: { concept: "Concept", inProgress: "In progress", live: "Live", completed: "Completed" },
} as const;

export function generateStaticParams() {
  return locales.flatMap((locale) => fallbackHomepage.projects.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "de";
  const project = await getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.seo ? getText(project.seo.title, locale) : project.title,
    description: project.seo ? getText(project.seo.description, locale) : getText(project.shortDescription, locale),
  };
}

function ProjectBody({
  project,
  locale,
  caseStudySlug,
}: {
  project: Project;
  locale: Locale;
  caseStudySlug?: string;
}) {
  const slides = project.screenshots ?? [];
  const hasMedia = slides.length > 0;

  const metaBlock = (
    <div className="grid gap-6 sm:grid-cols-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {locale === "de" ? "Ergebnis" : "Outcome"}
        </p>
        <p className="mt-2 leading-7 text-foreground">{getText(project.outcome, locale)}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{locale === "de" ? "Jahr" : "Year"}</p>
        <p className="mt-2 text-foreground">{project.year}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Stack</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Tag key={tech} variant="outline">
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );

  if (hasMedia) {
    return (
      <GlassCard className="overflow-hidden p-0">
        <div className="grid xl:grid-cols-[1fr_1.05fr]">
          <div className="p-7 sm:p-10">
            <div className="mb-6 flex flex-wrap gap-2">
              <Tag variant="brand">{getText(project.category, locale)}</Tag>
              <Tag variant={project.status === "live" ? "success" : "neutral"}>{statusLabels[locale][project.status]}</Tag>
            </div>
            <h1 className="font-display text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 text-pretty text-lg leading-8 text-muted">{getText(project.description, locale)}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.services[locale].map((service) => (
                <Tag key={service}>{service}</Tag>
              ))}
            </div>
            <div className="mt-10 border-t border-foreground/10 pt-10 dark:border-white/10">{metaBlock}</div>
            <div className="mt-10 border-t border-foreground/10 pt-10 dark:border-white/10">
              <h2 className="text-xl font-semibold text-foreground">Case Study</h2>
              <p className="mt-4 leading-8 text-muted">{getText(project.caseStudyText, locale)}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {caseStudySlug ? (
                <Button href={localizedPath(locale, `/case-studies/${caseStudySlug}`)}>
                  {locale === "de" ? "Ausführliche Case Study" : "Full case study"}
                </Button>
              ) : null}
              {project.liveLink ? (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-glass-button inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition hover:-translate-y-0.5"
                >
                  {locale === "de" ? "Live-Website öffnen" : "Open live website"} ↗
                </a>
              ) : null}
            </div>
          </div>
          <div className="border-t border-foreground/10 bg-foreground/[0.02] p-5 sm:p-7 xl:border-l xl:border-t-0 dark:border-white/10 dark:bg-white/[0.02]">
            <ImageCarousel slides={slides} locale={locale} />
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-7 sm:p-10">
      <div className="mb-6 flex flex-wrap gap-2">
        <Tag variant="brand">{getText(project.category, locale)}</Tag>
        <Tag variant={project.status === "live" ? "success" : "neutral"}>{statusLabels[locale][project.status]}</Tag>
      </div>
      <h1 className="font-display text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-muted">{getText(project.description, locale)}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.services[locale].map((service) => (
          <Tag key={service}>{service}</Tag>
        ))}
      </div>
      <div className="mt-10 border-t border-foreground/10 pt-10 dark:border-white/10">{metaBlock}</div>
      <div className="mt-10 border-t border-foreground/10 pt-10 dark:border-white/10">
        <h2 className="text-xl font-semibold text-foreground">Case Study</h2>
        <p className="mt-4 max-w-3xl leading-8 text-muted">{getText(project.caseStudyText, locale)}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {caseStudySlug ? (
          <Button href={localizedPath(locale, `/case-studies/${caseStudySlug}`)}>
            {locale === "de" ? "Ausführliche Case Study" : "Full case study"}
          </Button>
        ) : null}
        {project.liveLink ? (
          <Button href={project.liveLink}>{locale === "de" ? "Live-Website öffnen" : "Open live website"}</Button>
        ) : null}
      </div>
    </GlassCard>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const locale = rawLocale;
  const caseStudy = fallbackHomepage.caseStudies.find((study) => study.projectSlug === slug);

  return (
    <div style={designStyle(fallbackHomepage.designPreset)}>
      <Navigation locale={locale} />
      <main className="pb-16 pt-24 sm:pt-28">
        <Container>
          <Link className="text-sm font-semibold text-accent-bright transition hover:text-foreground" href={localizedPath(locale, "/#referenzen")}>
            ← {locale === "de" ? "Zurück zu den Referenzen" : "Back to work"}
          </Link>
          <div className="mt-8">
            <ProjectBody project={project} locale={locale} caseStudySlug={caseStudy?.slug} />
          </div>
        </Container>
      </main>
      <Footer locale={locale} />
    </div>
  );
}

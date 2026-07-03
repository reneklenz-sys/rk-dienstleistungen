import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { getText, localizedPath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { CaseStudy, Locale, Project } from "@/types/content";

import { ReferenceShowcase } from "./ReferenceShowcase";

/** Curated hero rotation on the homepage — not every project belongs here. */
const HOMEPAGE_SHOWCASE_MAX = 8;
/** Compact cards below the showcase — only real references, never lone concept cards. */
const HOMEPAGE_COMPACT_MAX = 4;
const HOMEPAGE_COMPACT_MIN = 2;

const statusLabels = {
  de: { concept: "Konzept", inProgress: "In Arbeit", live: "Live", completed: "Abgeschlossen" },
  en: { concept: "Concept", inProgress: "In progress", live: "Live", completed: "Completed" },
} as const;

function CompactProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <Link href={localizedPath(locale, `/projects/${project.slug}`)} className="group block h-full">
      <GlassCard as="article" className="flex h-full flex-col overflow-hidden p-0">
        <div className="h-1.5 bg-gradient-to-r from-[var(--accent-bright)] via-[var(--accent-light)] to-[var(--accent-soft)]" />
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="mb-7 flex flex-wrap items-center gap-2">
            <Tag variant="brand">{getText(project.category, locale)}</Tag>
            <Tag variant={project.status === "live" ? "success" : "neutral"}>
              {statusLabels[locale][project.status]}
            </Tag>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">{project.title}</h3>
          <p className="mt-4 flex-1 text-pretty leading-7 text-muted">{getText(project.shortDescription, locale)}</p>
          <p className="mt-8 text-sm font-semibold text-accent-bright transition group-hover:translate-x-1">
            {locale === "de" ? "Projekt ansehen →" : "View project →"}
          </p>
        </div>
      </GlassCard>
    </Link>
  );
}

export function ProjectsSection({
  projects,
  caseStudies,
  locale,
}: {
  projects: Project[];
  caseStudies: CaseStudy[];
  locale: Locale;
}) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const featuredWithScreenshots = sorted.filter((project) => project.featured && project.screenshots?.length);
  const showcase = featuredWithScreenshots.slice(0, HOMEPAGE_SHOWCASE_MAX);
  const showcaseSlugs = new Set(showcase.map((project) => project.slug));
  const compactCandidates = sorted.filter(
    (project) => !showcaseSlugs.has(project.slug) && project.status !== "concept",
  );
  const compact =
    compactCandidates.length >= HOMEPAGE_COMPACT_MIN ? compactCandidates.slice(0, HOMEPAGE_COMPACT_MAX) : [];
  const hiddenCount = sorted.length - showcase.length - compact.length;
  const showArchiveCta = hiddenCount >= 2;

  return (
    <section id="referenzen" className="section-shell">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <SectionLabel className="mb-3">{locale === "de" ? "Referenzen" : "Work"}</SectionLabel>
            <h2 className="font-display text-balance text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl">
              {locale === "de" ? "Referenzen, die für sich sprechen." : "Work that speaks for itself."}
            </h2>
            <p className="mt-5 text-pretty text-base leading-8 text-muted sm:text-lg">
              {locale === "de"
                ? "Echte Umsetzungen — von der Praxis-Website bis zum eigenen Produkt."
                : "Real builds — from a medical practice website to an own product."}
            </p>
          </div>

          {hiddenCount > 0 ? (
            <Link
              href={localizedPath(locale, "/projects")}
              className="shrink-0 text-sm font-semibold text-accent-bright transition hover:text-foreground"
            >
              {locale === "de" ? "Alle Referenzen →" : "All work →"}
            </Link>
          ) : null}
        </div>

        {showcase.length ? (
          <Reveal>
            <ReferenceShowcase projects={showcase} caseStudies={caseStudies} locale={locale} />
          </Reveal>
        ) : null}

        {compact.length ? (
          <div
            className={cn(
              "grid auto-rows-fr gap-5",
              showcase.length ? "mt-10" : "mt-12",
              compact.length > 1 ? "lg:grid-cols-2" : "max-w-2xl",
            )}
          >
            {compact.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80} className="h-full">
                <CompactProjectCard project={project} locale={locale} />
              </Reveal>
            ))}
          </div>
        ) : null}

        {showArchiveCta ? (
          <div className={cn("flex justify-center", showcase.length ? "mt-10" : "mt-12")}>
            <Link
              href={localizedPath(locale, "/projects")}
              className="primary-glass-button inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-semibold transition hover:-translate-y-0.5"
            >
              {locale === "de"
                ? `Alle ${sorted.length} Referenzen ansehen`
                : `View all ${sorted.length} projects`}
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

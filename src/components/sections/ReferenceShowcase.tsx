"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { Tag } from "@/components/ui/Tag";
import { getText, localizedPath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { CaseStudy, Locale, Project } from "@/types/content";

const AUTOPLAY_MS = 9000;

const statusLabels = {
  de: { concept: "Konzept", inProgress: "In Arbeit", live: "Live", completed: "Abgeschlossen" },
  en: { concept: "Concept", inProgress: "In progress", live: "Live", completed: "Completed" },
} as const;

function ReferencePanel({
  project,
  locale,
  caseStudySlug,
}: {
  project: Project;
  locale: Locale;
  caseStudySlug?: string;
}) {
  const slides = project.screenshots ?? [];

  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="grid xl:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-between p-7 sm:p-9 xl:min-h-[520px]">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Tag variant="brand">{locale === "de" ? "Referenz" : "Reference"}</Tag>
              <Tag variant={project.status === "live" ? "success" : "neutral"}>
                {statusLabels[locale][project.status]}
              </Tag>
              <Tag>{getText(project.category, locale)}</Tag>
            </div>

            <h3 className="font-display text-balance text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
              {project.title}
            </h3>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-muted">
              {getText(project.shortDescription, locale)}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Tag key={tech} variant="outline">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            <Button
              href={localizedPath(
                locale,
                caseStudySlug ? `/case-studies/${caseStudySlug}` : `/projects/${project.slug}`,
              )}
              variant="secondary"
            >
              {locale === "de" ? "Case Study lesen" : "Read case study"}
            </Button>
          </div>
        </div>

        <div className="border-t border-foreground/8 bg-foreground/[0.02] p-5 sm:p-7 xl:border-l xl:border-t-0 dark:border-white/10 dark:bg-white/[0.02]">
          {slides.length ? (
            <ImageCarousel slides={slides} locale={locale} />
          ) : (
            <div className="grid h-full min-h-[320px] place-items-center rounded-[calc(var(--surface-radius)-6px)] border border-dashed border-foreground/15 text-sm text-muted">
              {locale === "de" ? "Screenshots folgen" : "Screenshots coming soon"}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

export function ReferenceShowcase({
  projects,
  caseStudies = [],
  locale,
}: {
  projects: Project[];
  caseStudies?: CaseStudy[];
  locale: Locale;
}) {
  const caseStudyByProject = new Map(
    caseStudies.filter((study) => study.projectSlug).map((study) => [study.projectSlug!, study.slug]),
  );
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const total = projects.length;
  const multi = total > 1;
  const shouldAutoplay = multi && autoplayEnabled && !paused && !reducedMotion;

  const goTo = useCallback(
    (next: number) => {
      setIndex((current) => (next + total) % total);
    },
    [total],
  );

  useEffect(() => {
    setIndex((current) => (current >= total ? 0 : current));
  }, [total]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!shouldAutoplay) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [shouldAutoplay, total, index]);

  useEffect(() => {
    if (!multi) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".reference-carousel")) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, index, multi]);

  const handleFocusCapture = () => setPaused(true);

  const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (!next || !shellRef.current?.contains(next)) {
      setPaused(false);
    }
  };

  if (!total) return null;

  return (
    <div
      ref={shellRef}
      className="reference-showcase-shell mt-12"
      style={{ ["--reference-autoplay-duration" as string]: `${AUTOPLAY_MS}ms` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
    >
      {multi ? (
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label={locale === "de" ? "Referenzen auswählen" : "Select reference"}
            className="reference-showcase-tabs flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, projectIndex) => (
              <button
                key={project.slug}
                type="button"
                role="tab"
                id={`${listId}-tab-${project.slug}`}
                aria-selected={projectIndex === index}
                aria-controls={`${listId}-panel-${project.slug}`}
                className={cn(
                  "reference-showcase-tab shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                  projectIndex === index
                    ? "border-[var(--accent-bright)] bg-[var(--accent-bright)]/10 text-foreground"
                    : "border-foreground/10 text-muted hover:border-foreground/20 hover:text-foreground dark:border-white/10",
                )}
                onClick={() => setIndex(projectIndex)}
              >
                {project.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:shrink-0">
            {!reducedMotion ? (
              <button
                type="button"
                className="glass-control grid size-10 place-items-center rounded-full text-sm transition hover:scale-105"
                aria-pressed={autoplayEnabled}
                aria-label={
                  autoplayEnabled
                    ? locale === "de"
                      ? "Automatisches Durchlaufen pausieren"
                      : "Pause automatic slideshow"
                    : locale === "de"
                      ? "Automatisches Durchlaufen starten"
                      : "Start automatic slideshow"
                }
                onClick={() => setAutoplayEnabled((current) => !current)}
              >
                {autoplayEnabled ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
              </button>
            ) : null}
            <button
              type="button"
              className="glass-control grid size-10 place-items-center rounded-full text-lg transition hover:scale-105"
              aria-label={locale === "de" ? "Vorherige Referenz" : "Previous reference"}
              onClick={() => goTo(index - 1)}
            >
              ←
            </button>
            <p className="min-w-[4.5rem] text-center text-sm tabular-nums text-muted" aria-live="polite">
              {index + 1} / {total}
            </p>
            <button
              type="button"
              className="glass-control grid size-10 place-items-center rounded-full text-lg transition hover:scale-105"
              aria-label={locale === "de" ? "Nächste Referenz" : "Next reference"}
              onClick={() => goTo(index + 1)}
            >
              →
            </button>
          </div>
        </div>
      ) : null}

      <div className="relative">
        {projects.map((project, projectIndex) => (
          <div
            key={project.slug}
            id={`${listId}-panel-${project.slug}`}
            role="tabpanel"
            aria-labelledby={multi ? `${listId}-tab-${project.slug}` : undefined}
            aria-hidden={projectIndex !== index}
            inert={projectIndex !== index}
            className={cn(
              "transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              projectIndex === index
                ? "relative translate-y-0 opacity-100"
                : "pointer-events-none absolute inset-x-0 top-0 translate-y-3 opacity-0",
            )}
          >
            <ReferencePanel
              project={project}
              locale={locale}
              caseStudySlug={caseStudyByProject.get(project.slug)}
            />
          </div>
        ))}
      </div>

      {multi && shouldAutoplay ? (
        <div
          key={`autoplay-${index}`}
          className="reference-showcase-autoplay mt-4 h-0.5 overflow-hidden rounded-full bg-foreground/10 dark:bg-white/10"
          aria-hidden
        >
          <div className="reference-showcase-autoplay-fill h-full" />
        </div>
      ) : null}
    </div>
  );
}

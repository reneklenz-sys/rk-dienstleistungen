import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { designStyle } from "@/design/tokens";
import { getText, isLocale, localizedPath, locales } from "@/lib/i18n";
import { getHomepageData } from "@/sanity/lib/fetch";
import type { Locale } from "@/types/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const statusLabels = {
  de: { concept: "Konzept", inProgress: "In Arbeit", live: "Live", completed: "Abgeschlossen" },
  en: { concept: "Concept", inProgress: "In progress", live: "Live", completed: "Completed" },
} as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "de";

  return {
    title: locale === "de" ? "Alle Referenzen" : "All work",
    description:
      locale === "de"
        ? "Übersicht aller Projekte, Referenzen und Case Studies."
        : "Overview of all projects, references and case studies.",
  };
}

export default async function ProjectsIndexPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const data = await getHomepageData();
  const projects = [...data.projects].sort((a, b) => a.order - b.order);

  return (
    <div style={designStyle(data.designPreset)}>
      <Navigation locale={rawLocale} />
      <main className="section-shell pt-28 sm:pt-32">
        <Container>
          <Link
            className="text-sm font-semibold text-accent-bright transition hover:text-foreground"
            href={localizedPath(rawLocale, "/#referenzen")}
          >
            ← {rawLocale === "de" ? "Zur Startseite" : "Back to home"}
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {rawLocale === "de" ? "Portfolio" : "Portfolio"}
            </p>
            <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl">
              {rawLocale === "de" ? "Alle Referenzen" : "All work"}
            </h1>
            <p className="mt-5 text-pretty text-base leading-8 text-muted sm:text-lg">
              {rawLocale === "de"
                ? "Die vollständige Übersicht — skalierbar, ohne die Startseite zu überladen."
                : "The full overview — scalable without overloading the homepage."}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.slug} href={localizedPath(rawLocale, `/projects/${project.slug}`)} className="group block h-full">
                <GlassCard as="article" className="h-full overflow-hidden p-0">
                  <div className="h-1.5 bg-gradient-to-r from-[var(--accent-bright)] via-[var(--accent-light)] to-[var(--accent-soft)]" />
                  <div className="p-6 sm:p-7">
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                      <Tag variant="brand">{getText(project.category, rawLocale)}</Tag>
                      <Tag variant={project.status === "live" ? "success" : "neutral"}>
                        {statusLabels[rawLocale][project.status]}
                      </Tag>
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">{project.title}</h2>
                    <p className="mt-4 text-pretty leading-7 text-muted">{getText(project.shortDescription, rawLocale)}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Tag key={tech} variant="outline">
                          {tech}
                        </Tag>
                      ))}
                    </div>
                    <p className="mt-8 text-sm font-semibold text-accent-bright transition group-hover:translate-x-1">
                      {rawLocale === "de" ? "Projekt ansehen →" : "View project →"}
                    </p>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer locale={rawLocale} />
    </div>
  );
}

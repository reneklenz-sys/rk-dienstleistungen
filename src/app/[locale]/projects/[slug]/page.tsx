import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Navigation } from "@/components/layout/Navigation";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { fallbackHomepage } from "@/data/fallback";
import { designStyle } from "@/design/tokens";
import { getText, isLocale, localizedPath, locales } from "@/lib/i18n";
import { getProjectBySlug } from "@/sanity/lib/fetch";
import type { Locale } from "@/types/content";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

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

export default async function ProjectPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const locale = rawLocale;

  return (
    <div style={designStyle(fallbackHomepage.designPreset)}>
      <Navigation locale={locale} defaultTheme={fallbackHomepage.designPreset.defaultTheme} />
      <main className="py-14 sm:py-20">
        <Container>
          <Link className="text-sm font-semibold text-accent" href={localizedPath(locale, "/#referenzen")}>
            {locale === "de" ? "Zurück zu den Referenzen" : "Back to work"}
          </Link>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <GlassCard className="p-7 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                {getText(project.category, locale)}
              </p>
              <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.045em] text-foreground sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-7 text-pretty text-lg leading-8 text-muted">{getText(project.description, locale)}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.services[locale].map((service) => (
                  <span key={service} className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-muted dark:bg-white/10">
                    {service}
                  </span>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-7 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {locale === "de" ? "Ergebnis / Mehrwert" : "Outcome / value"}
              </h2>
              <p className="mt-4 leading-8 text-muted">{getText(project.outcome, locale)}</p>
              <dl className="mt-8 grid gap-5 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">{locale === "de" ? "Jahr" : "Year"}</dt>
                  <dd className="mt-1 text-muted">{project.year}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-foreground/10 px-3 py-1 text-xs text-muted dark:border-white/10">
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              {project.liveLink ? (
                <a className="mt-8 inline-flex text-sm font-semibold text-accent" href={project.liveLink} target="_blank" rel="noreferrer">
                  Live ansehen
                </a>
              ) : null}
            </GlassCard>
          </div>
          <GlassCard className="mt-6 p-7 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Case Study</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-muted">{getText(project.caseStudyText, locale)}</p>
          </GlassCard>
        </Container>
      </main>
    </div>
  );
}

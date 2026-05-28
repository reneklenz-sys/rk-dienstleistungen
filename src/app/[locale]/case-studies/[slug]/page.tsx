import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Navigation } from "@/components/layout/Navigation";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { fallbackHomepage } from "@/data/fallback";
import { designStyle } from "@/design/tokens";
import { getText, isLocale, localizedPath, locales } from "@/lib/i18n";
import { getCaseStudyBySlug } from "@/sanity/lib/fetch";
import type { Locale } from "@/types/content";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => fallbackHomepage.caseStudies.map((study) => ({ locale, slug: study.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "de";
  const study = await getCaseStudyBySlug(slug);

  if (!study) return {};

  return {
    title: study.seo ? getText(study.seo.title, locale) : study.title,
    description: study.seo ? getText(study.seo.description, locale) : getText(study.summary, locale),
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();

  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const locale = rawLocale;

  return (
    <div style={designStyle(fallbackHomepage.designPreset)}>
      <Navigation locale={locale} defaultTheme={fallbackHomepage.designPreset.defaultTheme} />
      <main className="py-14 sm:py-20">
        <Container>
          <Link className="text-sm font-semibold text-accent" href={localizedPath(locale, "/#referenzen")}>
            {locale === "de" ? "Zurück zu den Case Studies" : "Back to case studies"}
          </Link>
          <GlassCard className="mt-8 p-7 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              {getText(study.eyebrow, locale)}
            </p>
            <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold tracking-[-0.045em] text-foreground sm:text-7xl">
              {study.title}
            </h1>
            <p className="mt-7 max-w-4xl text-pretty text-lg leading-8 text-muted">{getText(study.summary, locale)}</p>
          </GlassCard>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {[
              [locale === "de" ? "Ausgangslage" : "Challenge", getText(study.challenge, locale)],
              [locale === "de" ? "Lösung" : "Solution", getText(study.solution, locale)],
              [locale === "de" ? "Ergebnis" : "Result", getText(study.result, locale)],
            ].map(([title, text]) => (
              <GlassCard key={title} className="p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
                <p className="mt-4 leading-8 text-muted">{text}</p>
              </GlassCard>
            ))}
          </div>
          <GlassCard className="mt-6 p-7 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {locale === "de" ? "Merkmale" : "Highlights"}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {study.metrics[locale].map((metric) => (
                <span key={metric} className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-muted dark:bg-white/10">
                  {metric}
                </span>
              ))}
            </div>
          </GlassCard>
        </Container>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
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

  const chapters = [
    { title: locale === "de" ? "Ausgangslage" : "Challenge", text: getText(study.challenge, locale) },
    { title: locale === "de" ? "Lösung" : "Solution", text: getText(study.solution, locale) },
    { title: locale === "de" ? "Ergebnis" : "Result", text: getText(study.result, locale) },
  ];

  return (
    <div style={designStyle(fallbackHomepage.designPreset)}>
      <Navigation locale={locale} />
      <main className="pb-16 pt-24 sm:pt-28">
        <Container>
          <Link className="text-sm font-semibold text-accent-bright transition hover:text-foreground" href={localizedPath(locale, "/#referenzen")}>
            ← {locale === "de" ? "Zurück zu den Referenzen" : "Back to work"}
          </Link>

          <GlassCard className="mt-8 p-7 sm:p-10">
            <SectionLabel>{getText(study.eyebrow, locale)}</SectionLabel>
            <h1 className="mt-5 max-w-4xl font-display text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              {study.title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-muted">{getText(study.summary, locale)}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {study.metrics[locale].map((metric) => (
                <Tag key={metric}>{metric}</Tag>
              ))}
            </div>

            <div className="mt-10 grid gap-6 border-t border-foreground/10 pt-10 md:grid-cols-3 dark:border-white/10">
              {chapters.map((chapter) => (
                <div key={chapter.title}>
                  <h2 className="text-lg font-semibold text-foreground">{chapter.title}</h2>
                  <p className="mt-3 leading-7 text-muted">{chapter.text}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Container>
      </main>
      <Footer locale={locale} />
    </div>
  );
}

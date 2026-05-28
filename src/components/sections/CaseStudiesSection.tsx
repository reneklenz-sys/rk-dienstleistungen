import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getText, localizedPath } from "@/lib/i18n";
import type { CaseStudy, Locale } from "@/types/content";

export function CaseStudiesSection({ caseStudies, locale }: { caseStudies: CaseStudy[]; locale: Locale }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="Case Studies"
          title={locale === "de" ? "Ein Blick hinter die Umsetzung." : "A look behind the build."}
          lead={locale === "de" ? "Hier geht es nicht nur um Oberfläche, sondern um Struktur, Pflegebarkeit und Wirkung." : "This is not only about the surface, but structure, maintainability and impact."}
        />
        <div className="mt-10 grid gap-5">
          {caseStudies.map((study, index) => (
            <Reveal key={study.slug} delay={index * 80}>
              <Link href={localizedPath(locale, `/case-studies/${study.slug}`)}>
                <GlassCard as="article" className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                      {getText(study.eyebrow, locale)}
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{study.title}</h3>
                  </div>
                  <div>
                    <p className="text-pretty text-lg leading-8 text-muted">{getText(study.summary, locale)}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {study.metrics[locale].map((metric) => (
                        <span key={metric} className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-muted dark:bg-white/10">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

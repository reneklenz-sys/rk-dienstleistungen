import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { getText, localizedPath } from "@/lib/i18n";
import type { CaseStudy, Locale, Project } from "@/types/content";

export function CaseStudiesSection({
  caseStudies,
  projects,
  locale,
}: {
  caseStudies: CaseStudy[];
  projects: Project[];
  locale: Locale;
}) {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeader
          eyebrow="Case Studies"
          title={locale === "de" ? "Ein Blick hinter die Umsetzung." : "A look behind the build."}
          lead={
            locale === "de"
              ? "Hier geht es nicht nur um Oberfläche, sondern um Struktur, Pflegebarkeit und Wirkung."
              : "This is not only about the surface, but structure, maintainability and impact."
          }
        />
        <div className="mt-10 grid gap-5">
          {caseStudies.map((study, index) => {
            const linkedProject = projects.find((project) => project.slug === study.projectSlug);
            const preview = linkedProject?.screenshots?.[0];

            return (
              <Reveal key={study.slug} delay={index * 80}>
                <Link href={localizedPath(locale, `/case-studies/${study.slug}`)}>
                  <GlassCard
                    as="article"
                    className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)] lg:items-center"
                  >
                    <div>
                      <SectionLabel>{getText(study.eyebrow, locale)}</SectionLabel>
                      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{study.title}</h3>
                      <p className="mt-5 text-pretty text-lg leading-8 text-muted">{getText(study.summary, locale)}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {study.metrics[locale].map((metric) => (
                          <Tag key={metric}>{metric}</Tag>
                        ))}
                      </div>
                      <p className="mt-8 text-sm font-semibold text-accent-bright">
                        {locale === "de" ? "Case Study lesen →" : "Read case study →"}
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-[calc(var(--surface-radius)-6px)] border border-foreground/10 bg-foreground/[0.03] dark:border-white/10 dark:bg-white/[0.04]">
                      {preview ? (
                        <div className="relative aspect-[16/11]">
                          <Image
                            src={preview.src}
                            alt={getText(preview.alt, locale)}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 1024px) 100vw, 420px"
                          />
                        </div>
                      ) : (
                        <div className="grid min-h-[220px] place-items-center p-6 text-center text-sm text-muted">
                          {locale === "de" ? "Projekt-Vorschau folgt" : "Project preview coming soon"}
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

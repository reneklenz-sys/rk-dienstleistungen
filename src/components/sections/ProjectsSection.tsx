import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getText, localizedPath } from "@/lib/i18n";
import type { Locale, Project } from "@/types/content";

const statusLabels = {
  de: {
    concept: "Konzept",
    inProgress: "In Arbeit",
    live: "Live",
    completed: "Abgeschlossen",
  },
  en: {
    concept: "Concept",
    inProgress: "In progress",
    live: "Live",
    completed: "Completed",
  },
} as const;

export function ProjectsSection({ projects, locale }: { projects: Project[]; locale: Locale }) {
  return (
    <section id="referenzen" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow={locale === "de" ? "Featured Projects" : "Featured work"}
          title={locale === "de" ? "Proof of Work statt leere Versprechen." : "Proof of work instead of empty claims."}
          lead={locale === "de" ? "Referenzen, eigene Konzepte und digitale Produkte zeigen, wie Design, CMS und praktische Nutzbarkeit zusammenkommen." : "References, own concepts and digital products show how design, CMS and practical usability come together."}
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {projects
            .sort((a, b) => a.order - b.order)
            .map((project, index) => (
              <Reveal key={project.slug} delay={index * 80}>
                <Link href={localizedPath(locale, `/projects/${project.slug}`)}>
                  <GlassCard as="article" className="group h-full overflow-hidden p-6 sm:p-7">
                    <div className="mb-7 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">
                        {getText(project.category, locale)}
                      </span>
                      <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-muted dark:bg-white/10">
                        {statusLabels[locale][project.status]}
                      </span>
                      <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-muted dark:bg-white/10">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-3xl font-semibold tracking-tight text-foreground">{project.title}</h3>
                    <p className="mt-4 text-pretty leading-7 text-muted">{getText(project.shortDescription, locale)}</p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-medium text-muted dark:border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="mt-8 text-sm font-semibold text-accent transition group-hover:translate-x-1">
                      {locale === "de" ? "Projekt ansehen" : "View project"}
                    </p>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
        </div>
      </Container>
    </section>
  );
}

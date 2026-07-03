import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { getText, localizedPath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { LabProduct, Locale } from "@/types/content";

const projectSlugs = new Set(["nextcrush"]);

function labLink(lab: LabProduct, locale: Locale) {
  if (lab.externalLink) return { href: lab.externalLink, external: true };
  if (projectSlugs.has(lab.slug)) {
    return { href: localizedPath(locale, `/projects/${lab.slug}`), external: false };
  }
  return null;
}

function labLinkLabel(lab: LabProduct, locale: Locale, external: boolean) {
  if (external) {
    return locale === "de" ? "Kanal öffnen ↗" : "Open channel ↗";
  }
  if (projectSlugs.has(lab.slug)) {
    return locale === "de" ? "Referenz ansehen →" : "View reference →";
  }
  return null;
}

export function LabsSection({ labs, locale }: { labs: LabProduct[]; locale: Locale }) {
  return (
    <section id="labs" className="section-shell">
      <Container>
        <SectionHeader
          eyebrow={locale === "de" ? "Eigene Produkte / Labs" : "Own products / labs"}
          title={locale === "de" ? "Eigene Projekte & Experimente." : "Own projects & experiments."}
          lead={
            locale === "de"
              ? "Webapps, Content und digitale Formate — neben der Client-Arbeit, als sichtbarer Beweis für technische Tiefe."
              : "Web apps, content and digital formats — alongside client work, as visible proof of technical depth."
          }
        />
        <div className={cn("mt-10 grid auto-rows-fr gap-5", labs.length > 1 ? "md:grid-cols-2" : "max-w-xl")}>
          {labs
            .sort((a, b) => a.order - b.order)
            .map((lab, index) => {
              const link = labLink(lab, locale);
              const linkLabel = link ? labLinkLabel(lab, locale, link.external) : null;

              const card = (
                <GlassCard as="article" className="flex h-full flex-col p-6">
                  <Tag variant="brand" className="mb-4">
                    {getText(lab.type, locale)}
                  </Tag>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">{getText(lab.title, locale)}</h3>
                  <p className="mt-4 flex-1 leading-7 text-muted">{getText(lab.description, locale)}</p>
                  <p className="mt-6 text-sm font-semibold text-accent-bright">{getText(lab.status, locale)}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {lab.highlights[locale].map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                  <div className="mt-auto pt-8">
                    {linkLabel ? (
                      <p className="text-sm font-semibold text-accent-bright transition group-hover:translate-x-1">
                        {linkLabel}
                      </p>
                    ) : (
                      <span className="block min-h-5" aria-hidden />
                    )}
                  </div>
                </GlassCard>
              );

              return (
                <Reveal key={lab.slug} delay={index * 70} className="h-full">
                  {link ? (
                    link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block h-full"
                      >
                        {card}
                      </a>
                    ) : (
                      <Link href={link.href} className="group block h-full">
                        {card}
                      </Link>
                    )
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
        </div>
      </Container>
    </section>
  );
}

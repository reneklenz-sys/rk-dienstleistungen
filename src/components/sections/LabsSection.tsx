import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getText } from "@/lib/i18n";
import type { LabProduct, Locale } from "@/types/content";

export function LabsSection({ labs, locale }: { labs: LabProduct[]; locale: Locale }) {
  return (
    <section id="labs" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow={locale === "de" ? "Eigene Produkte / Labs" : "Own products / labs"}
          title={locale === "de" ? "Eigene Projekte als sichtbarer Beweis." : "Own projects as visible proof."}
          lead={locale === "de" ? "Labs zeigen, wie Produktdenken, KI-Visuals, Content-Experimente und kleine Webapps praktisch aussehen können." : "Labs show what product thinking, AI visuals, content experiments and small web apps can look like in practice."}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {labs
            .sort((a, b) => a.order - b.order)
            .map((lab, index) => (
              <Reveal key={lab.slug} delay={index * 70}>
                <GlassCard as="article" className="h-full p-6">
                  <p className="mb-4 text-sm font-semibold text-accent">{getText(lab.type, locale)}</p>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">{getText(lab.title, locale)}</h3>
                  <p className="mt-4 leading-7 text-muted">{getText(lab.description, locale)}</p>
                  <p className="mt-6 text-sm font-semibold text-foreground">{getText(lab.status, locale)}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {lab.highlights[locale].map((item) => (
                      <span key={item} className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-muted dark:bg-white/10">
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
        </div>
      </Container>
    </section>
  );
}

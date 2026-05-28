import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getText } from "@/lib/i18n";
import type { Locale, Service } from "@/types/content";

export function ServicesSection({ services, locale }: { services: Service[]; locale: Locale }) {
  return (
    <section id="leistungen" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow={locale === "de" ? "Leistungen" : "Services"}
          title={locale === "de" ? "Alles, was ein moderner digitaler Auftritt braucht." : "Everything a modern digital presence needs."}
          lead={locale === "de" ? "Modular gedacht, damit aus einer Website später Landingpages, Inhalte, Labs oder Tools wachsen können." : "Modular by design, so a website can later grow into landing pages, content, labs or tools."}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services
            .filter((service) => service.visible !== false)
            .sort((a, b) => a.order - b.order)
            .map((service, index) => (
              <Reveal key={getText(service.title, locale)} delay={index * 55}>
                <GlassCard as="article" className="h-full p-6">
                  <p className="mb-6 text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">{getText(service.title, locale)}</h3>
                  <p className="mt-4 leading-7 text-muted">{getText(service.description, locale)}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags[locale].map((tag) => (
                      <span key={tag} className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-muted dark:bg-white/10">
                        {tag}
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

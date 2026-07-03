import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getText } from "@/lib/i18n";
import type { Locale, Service } from "@/types/content";

const serviceIcons = ["◆", "↗", "✦", "◎", "⚡", "∞"];

export function ServicesSection({ services, locale }: { services: Service[]; locale: Locale }) {
  return (
    <section id="leistungen" className="section-shell">
      <Container>
        <SectionHeader
          eyebrow={locale === "de" ? "Leistungen" : "Services"}
          title={locale === "de" ? "Was ich mache." : "What I do."}
          lead={
            locale === "de"
              ? "Websites, gezielte Landingpages und KI-Visuals — für alle, die einen professionellen Auftritt wollen, ohne Agentur-Paket."
              : "Websites, focused landing pages and AI visuals — for anyone who wants a professional presence without an agency package."
          }
        />
        <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services
            .filter((service) => service.visible !== false)
            .sort((a, b) => a.order - b.order)
            .map((service, index) => (
              <Reveal key={getText(service.title, locale)} delay={index * 55} className="h-full">
                <GlassCard as="article" className="flex h-full flex-col p-6 sm:p-7">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="service-icon" aria-hidden="true">
                      {serviceIcons[index % serviceIcons.length]}
                    </span>
                    <span className="text-xs font-semibold tracking-[0.2em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">{getText(service.title, locale)}</h3>
                  <p className="mt-4 flex-1 leading-7 text-muted">{getText(service.description, locale)}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags[locale].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-foreground/8 bg-foreground/[0.03] px-3 py-1 text-xs font-medium text-muted dark:border-white/10 dark:bg-white/[0.05]"
                      >
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

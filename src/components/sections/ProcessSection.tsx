import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getText } from "@/lib/i18n";
import type { Locale, ProcessStep } from "@/types/content";

export function ProcessSection({ steps, locale }: { steps: ProcessStep[]; locale: Locale }) {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeader
          eyebrow={locale === "de" ? "Ablauf" : "Process"}
          title={locale === "de" ? "Klarer Prozess, keine Blackbox." : "Clear process, no black box."}
          lead={
            locale === "de"
              ? "Vom ersten Gespräch bis zur Übergabe — transparent und ohne Agentur-Chaos."
              : "From first conversation to handover — transparent and without agency chaos."
          }
        />
        <div className="process-line mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps
            .sort((a, b) => a.order - b.order)
            .map((step, index) => (
              <Reveal key={getText(step.title, locale)} delay={index * 50} className="h-full">
                <GlassCard className="flex h-full flex-col p-6">
                  <p className="text-sm font-semibold tracking-[0.2em] text-accent">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{getText(step.title, locale)}</h3>
                  <p className="mt-4 flex-1 leading-7 text-muted">{getText(step.description, locale)}</p>
                </GlassCard>
              </Reveal>
            ))}
        </div>
      </Container>
    </section>
  );
}

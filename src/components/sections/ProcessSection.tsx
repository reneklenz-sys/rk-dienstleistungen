import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getText } from "@/lib/i18n";
import type { Locale, ProcessStep } from "@/types/content";

export function ProcessSection({ steps, locale }: { steps: ProcessStep[]; locale: Locale }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow={locale === "de" ? "Ablauf" : "Process"}
          title={locale === "de" ? "Klarer Prozess, keine Blackbox." : "Clear process, no black box."}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps
            .sort((a, b) => a.order - b.order)
            .map((step, index) => (
              <Reveal key={getText(step.title, locale)} delay={index * 50}>
                <div className="rounded-[var(--surface-radius)] border border-foreground/10 p-6 dark:border-white/10">
                  <p className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">{getText(step.title, locale)}</h3>
                  <p className="mt-4 leading-7 text-muted">{getText(step.description, locale)}</p>
                </div>
              </Reveal>
            ))}
        </div>
      </Container>
    </section>
  );
}

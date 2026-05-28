import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { getText } from "@/lib/i18n";
import type { HomepageData, Locale } from "@/types/content";

export function WhySection({ data, locale }: { data: HomepageData["why"]; locale: Locale }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <GlassCard className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                {locale === "de" ? "Warum ich" : "Why me"}
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {getText(data.title, locale)}
              </h2>
            </div>
            <div>
              <p className="text-pretty text-lg leading-8 text-muted">{getText(data.lead, locale)}</p>
              <div className="mt-8 grid gap-3">
                {data.points[locale].map((point) => (
                  <div key={point} className="rounded-3xl bg-foreground/[0.04] p-5 text-base font-medium leading-7 text-foreground dark:bg-white/[0.07]">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}

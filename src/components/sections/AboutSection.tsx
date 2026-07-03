import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getText } from "@/lib/i18n";
import type { HomepageData, Locale } from "@/types/content";

export function AboutSection({
  about,
  why,
  locale,
}: {
  about: HomepageData["about"];
  why: HomepageData["why"];
  locale: Locale;
}) {
  return (
    <section id="ueber-mich" className="section-shell">
      <Container>
        <Reveal>
          <GlassCard className="overflow-hidden p-7 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)] lg:items-start">
              <div>
                <SectionLabel className="mb-4">{locale === "de" ? "Über mich" : "About"}</SectionLabel>
                <h2 className="font-display text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                  {getText(why.lead, locale)}
                </h2>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted">{getText(about.text, locale)}</p>
              </div>

              <div className="glass-panel rounded-[calc(var(--surface-radius)-8px)] border border-accent-bright/20 bg-[color-mix(in_srgb,var(--panel-strong)_90%,transparent)] p-6 sm:p-7">
                <SectionLabel>{locale === "de" ? "Das bedeutet für dich" : "What that means for you"}</SectionLabel>
                <ul className="mt-6 grid gap-4">
                  {why.points[locale].map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-7 text-foreground/90 sm:text-[0.9375rem]">
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-bright"
                        aria-hidden
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}

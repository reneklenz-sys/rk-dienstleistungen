import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { getText } from "@/lib/i18n";
import type { HomepageData, Locale } from "@/types/content";

export function AboutSection({ about, locale }: { about: HomepageData["about"]; locale: Locale }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <GlassCard className="grid gap-7 p-7 sm:p-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                {locale === "de" ? "Über mich" : "About"}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {getText(about.title, locale)}
              </h2>
            </div>
            <p className="text-pretty text-lg leading-8 text-muted">{getText(about.text, locale)}</p>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}

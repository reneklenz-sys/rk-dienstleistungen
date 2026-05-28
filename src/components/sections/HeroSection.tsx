import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { getText, localizedPath } from "@/lib/i18n";
import type { HeroContent, Locale } from "@/types/content";

export function HeroSection({ hero, locale }: { hero: HeroContent; locale: Locale }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="surface-grid absolute inset-0 -z-10" />
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-6 max-w-2xl text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              {getText(hero.eyebrow, locale)}
            </p>
            <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-7xl lg:text-8xl">
              {getText(hero.title, locale)}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl">
              {getText(hero.lead, locale)}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#kontakt">{getText(hero.primaryCta, locale)}</Button>
              <Button href="#referenzen" variant="secondary">
                {getText(hero.secondaryCta, locale)}
              </Button>
            </div>
          </div>
          <GlassCard className="relative overflow-hidden p-5 sm:p-7">
            <div className="absolute right-6 top-6 size-24 rounded-full bg-[var(--accent)]/20 blur-2xl" />
            <div className="rounded-[calc(var(--surface-radius)-10px)] bg-foreground p-5 text-background shadow-2xl dark:bg-white dark:text-black">
              <div className="flex items-center justify-between border-b border-background/15 pb-5 text-sm">
                <span>Premium Web System</span>
                <span>CMS ready</span>
              </div>
              <div className="grid gap-3 py-6">
                {hero.proofPoints[locale].map((point) => (
                  <div key={point} className="rounded-2xl bg-background/10 p-4 text-sm font-medium">
                    {point}
                  </div>
                ))}
              </div>
              <div className="rounded-3xl bg-background/10 p-4">
                <p className="text-sm opacity-70">{locale === "de" ? "Nächster Schritt" : "Next step"}</p>
                <a className="mt-2 inline-flex text-lg font-semibold" href={localizedPath(locale, "/#kontakt")}>
                  {locale === "de" ? "Projektidee kurz prüfen" : "Check project idea"}
                </a>
              </div>
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}

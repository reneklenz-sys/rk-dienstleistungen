import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getText } from "@/lib/i18n";
import type { HeroContent, Locale } from "@/types/content";

export function HeroSection({ hero, locale }: { hero: HeroContent; locale: Locale }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-20 sm:pb-24 sm:pt-24">
      <Container>
        <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1.08fr)_minmax(300px,400px)] xl:gap-16">
          <Reveal>
            <div className="max-w-2xl">
              <div className="eyebrow-line">
                <span className="eyebrow">{getText(hero.eyebrow, locale)}</span>
              </div>
              <h1 className="font-display text-balance text-[2.75rem] font-medium leading-[1.06] tracking-[-0.02em] text-foreground sm:text-6xl xl:text-[4.25rem]">
                {getText(hero.title, locale)}
              </h1>
              <p className="mt-7 max-w-xl text-pretty text-[1.0625rem] leading-8 text-muted sm:text-lg">
                {getText(hero.lead, locale)}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="#kontakt">{getText(hero.primaryCta, locale)}</Button>
                <Button href="#referenzen" variant="secondary">
                  {getText(hero.secondaryCta, locale)}
                </Button>
              </div>

              <ul className="proof-list mt-12 max-w-lg">
                {hero.proofPoints[locale].map((point) => (
                  <li key={point} className="proof-list-item">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative mx-auto w-full max-w-[400px] xl:max-w-none">
              <div className="hero-portrait-frame relative overflow-hidden">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/rene-klenz.png"
                    alt={locale === "de" ? "René Klenz — Digitale Dienstleistungen" : "René Klenz — digital services"}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1280px) 90vw, 400px"
                  />
                </div>
              </div>
              <div className="mt-5 text-center xl:text-left">
                <p className="font-display text-2xl font-medium text-foreground">René Klenz</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  {locale === "de" ? "Digitale Dienstleistungen" : "Digital services"}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

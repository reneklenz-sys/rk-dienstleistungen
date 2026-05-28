import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { getText } from "@/lib/i18n";
import type { HomepageData, Locale } from "@/types/content";

export function ContactSection({ contact, locale }: { contact: HomepageData["contact"]; locale: Locale }) {
  const subject = locale === "de" ? "Projektanfrage" : "Project request";

  return (
    <section id="kontakt" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <GlassCard className="overflow-hidden p-7 sm:p-10">
            <div className="grid gap-9 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-accent">Kontakt</p>
                <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                  {getText(contact.title, locale)}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{getText(contact.lead, locale)}</p>
                <div className="mt-8">
                  <Button href={`mailto:${contact.email}?subject=${encodeURIComponent(subject)}`}>
                    {getText(contact.cta, locale)}
                  </Button>
                </div>
              </div>
              <div className="rounded-[calc(var(--surface-radius)-8px)] bg-foreground p-6 text-background dark:bg-white dark:text-black">
                <p className="text-sm opacity-70">{locale === "de" ? "Direkter Kontakt" : "Direct contact"}</p>
                <a className="mt-5 block text-xl font-semibold" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
                <a className="mt-3 block text-xl font-semibold" href={`tel:${contact.phone.replaceAll(" ", "")}`}>
                  {contact.phone}
                </a>
                <p className="mt-8 text-sm leading-6 opacity-70">
                  {locale === "de"
                    ? "Später kann hier eine Terminbuchung oder ein Kundenbereich ergänzt werden."
                    : "A booking flow or client area can be added here later."}
                </p>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}

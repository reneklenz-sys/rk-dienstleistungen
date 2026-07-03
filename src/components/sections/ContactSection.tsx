import { Mail, Phone, Timer, Video } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getText } from "@/lib/i18n";
import type { HomepageData, Locale } from "@/types/content";

export function ContactSection({ contact, locale }: { contact: HomepageData["contact"]; locale: Locale }) {
  const subject = locale === "de" ? "Kurze Anfrage — René Klenz" : "Quick inquiry — René Klenz";

  return (
    <section id="kontakt" className="section-shell">
      <Container>
        <Reveal>
          <GlassCard className="overflow-hidden p-7 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <SectionLabel className="mb-4">{locale === "de" ? "Kontakt" : "Contact"}</SectionLabel>
                <h2 className="font-display text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {getText(contact.title, locale)}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{getText(contact.lead, locale)}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={`mailto:${contact.email}?subject=${encodeURIComponent(subject)}`}>
                    {getText(contact.cta, locale)}
                  </Button>
                  {contact.phone ? (
                    <Button href={`tel:${contact.phone.replaceAll(" ", "")}`} variant="secondary">
                      {locale === "de" ? "Anrufen" : "Call"}
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="glass-panel rounded-[calc(var(--surface-radius)-8px)] border border-accent-bright/20 bg-[color-mix(in_srgb,var(--panel-strong)_90%,transparent)] p-6 sm:p-7">
                <SectionLabel>{locale === "de" ? "Direkter Kontakt" : "Direct contact"}</SectionLabel>

                <div className="mt-6 grid gap-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-4 transition hover:border-accent-bright/30 dark:border-white/10 dark:bg-white/[0.05]"
                  >
                    <Mail size={18} className="mt-0.5 shrink-0 text-accent-bright" aria-hidden />
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">E-Mail</span>
                      <span className="mt-1 block text-lg font-semibold text-foreground">{contact.email}</span>
                    </span>
                  </a>

                  {contact.phone ? (
                    <a
                      href={`tel:${contact.phone.replaceAll(" ", "")}`}
                      className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-4 transition hover:border-accent-bright/30 dark:border-white/10 dark:bg-white/[0.05]"
                    >
                      <Phone size={18} className="mt-0.5 shrink-0 text-accent-bright" aria-hidden />
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                          {locale === "de" ? "Telefon" : "Phone"}
                        </span>
                        <span className="mt-1 block text-lg font-semibold text-foreground">{contact.phone}</span>
                      </span>
                    </a>
                  ) : null}

                  <a
                    href="https://www.youtube.com/@DeepaLunX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-4 transition hover:border-accent-bright/30 dark:border-white/10 dark:bg-white/[0.05]"
                  >
                    <Video size={18} className="mt-0.5 shrink-0 text-accent-bright" aria-hidden />
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">YouTube</span>
                      <span className="mt-1 block text-lg font-semibold text-foreground">DeepaLunX ↗</span>
                    </span>
                  </a>

                  <div className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-4 dark:border-white/10 dark:bg-white/[0.05]">
                    <Timer size={18} className="mt-0.5 shrink-0 text-accent-bright" aria-hidden />
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        {locale === "de" ? "Antwortzeit" : "Response time"}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-foreground/90">
                        {locale === "de"
                          ? "In der Regel innerhalb von 1–2 Werktagen."
                          : "Usually within 1–2 business days."}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}

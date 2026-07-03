import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { Container } from "../ui/Container";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/content";

const footerLinks = {
  de: [
    ["Referenzen", "#referenzen"],
    ["Leistungen", "#leistungen"],
    ["Labs", "#labs"],
    ["Über mich", "#ueber-mich"],
    ["Kontakt", "#kontakt"],
  ],
  en: [
    ["Work", "#referenzen"],
    ["Services", "#leistungen"],
    ["Labs", "#labs"],
    ["About", "#ueber-mich"],
    ["Contact", "#kontakt"],
  ],
} as const;

const legalLinks = {
  de: [
    ["Impressum", "/impressum"],
    ["Datenschutz", "/datenschutz"],
    ["Cookie-Einstellungen", "/cookies"],
    ["Barrierefreiheit", "/barrierefreiheit"],
    ["Sitemap", "/sitemap"],
  ],
  en: [
    ["Legal notice", "/impressum"],
    ["Privacy policy", "/datenschutz"],
    ["Cookie settings", "/cookies"],
    ["Accessibility", "/barrierefreiheit"],
    ["Site map", "/sitemap"],
  ],
} as const;

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative mt-20 overflow-hidden pb-10 pt-16 sm:mt-24 sm:pt-20">
      <div className="site-footer-fade pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative z-[1]">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div>
            <Logo locale={locale} />
            <p className="mt-5 max-w-sm text-pretty text-sm leading-7 text-muted">
              {locale === "de"
                ? "Websites, CMS und KI-Content — direkt mit mir, ohne Agentur-Overhead."
                : "Websites, CMS and AI content — directly with me, without agency overhead."}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Navigation</p>
            <div className="flex flex-col gap-3">
              {footerLinks[locale].map(([label, href]) => (
                <a key={href} className="text-sm font-medium text-muted transition hover:text-foreground" href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {locale === "de" ? "Rechtliches" : "Legal"}
            </p>
            <div className="flex flex-col gap-3">
              {legalLinks[locale].map(([label, href]) => (
                <Link
                  key={href}
                  className="text-sm font-medium text-muted transition hover:text-foreground"
                  href={localizedPath(locale, href)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer-bottom mt-10 flex flex-col gap-4 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} René Klenz</p>
          <a
            href="https://www.youtube.com/@DeepaLunX"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition hover:text-foreground"
          >
            YouTube · DeepaLunX ↗
          </a>
        </div>
      </Container>
    </footer>
  );
}

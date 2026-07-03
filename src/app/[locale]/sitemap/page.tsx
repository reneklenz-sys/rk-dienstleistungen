import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { fallbackHomepage } from "@/data/fallback";
import { legalPageKeys, legalPages } from "@/data/legal";
import { getText, isLocale, localizedPath, locales } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const legalRoutes: Record<(typeof legalPageKeys)[number], string> = {
  impressum: "impressum",
  datenschutz: "datenschutz",
  cookies: "cookies",
  barrierefreiheit: "barrierefreiheit",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "de";

  return {
    title: locale === "de" ? "Sitemap" : "Site map",
    description:
      locale === "de"
        ? "Übersicht aller wichtigen Seiten und Bereiche."
        : "Overview of all important pages and sections.",
  };
}

export default async function HtmlSitemapPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale;
  const title = locale === "de" ? "Sitemap" : "Site map";

  return (
    <LegalPageShell locale={locale} title={title}>
      <section>
        <h2>{locale === "de" ? "Startseite" : "Homepage"}</h2>
        <ul>
          <li>
            <Link href={localizedPath(locale)}>{locale === "de" ? "Startseite" : "Home"}</Link>
          </li>
          <li>
            <a href={localizedPath(locale, "/#leistungen")}>{locale === "de" ? "Leistungen" : "Services"}</a>
          </li>
          <li>
            <a href={localizedPath(locale, "/#referenzen")}>{locale === "de" ? "Referenzen" : "Work"}</a>
          </li>
          <li>
            <a href={localizedPath(locale, "/#labs")}>{locale === "de" ? "Labs" : "Labs"}</a>
          </li>
          <li>
            <a href={localizedPath(locale, "/#ueber-mich")}>{locale === "de" ? "Über mich" : "About"}</a>
          </li>
          <li>
            <a href={localizedPath(locale, "/#kontakt")}>{locale === "de" ? "Kontakt" : "Contact"}</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>{locale === "de" ? "Projekte" : "Projects"}</h2>
        <ul>
          {fallbackHomepage.projects.map((project) => (
            <li key={project.slug}>
              <Link href={localizedPath(locale, `/projects/${project.slug}`)}>{project.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{locale === "de" ? "Case Studies" : "Case studies"}</h2>
        <ul>
          {fallbackHomepage.caseStudies.map((study) => (
            <li key={study.slug}>
              <Link href={localizedPath(locale, `/case-studies/${study.slug}`)}>{study.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{locale === "de" ? "Rechtliches" : "Legal"}</h2>
        <ul>
          {legalPageKeys.map((key) => (
            <li key={key}>
              <Link href={localizedPath(locale, `/${legalRoutes[key]}`)}>{getText(legalPages[key].title, locale)}</Link>
            </li>
          ))}
          <li>
            <Link href={localizedPath(locale, "/sitemap")}>{title}</Link>
          </li>
        </ul>
      </section>
    </LegalPageShell>
  );
}

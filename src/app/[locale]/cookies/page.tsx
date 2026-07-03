import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { legalPages } from "@/data/legal";
import { getText, isLocale, locales } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "de";

  return {
    title: getText(legalPages.cookies.title, locale),
    description: getText(legalPages.cookies.description, locale),
  };
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const page = legalPages.cookies;

  return (
    <LegalPageShell locale={rawLocale} title={getText(page.title, rawLocale)}>
      <div dangerouslySetInnerHTML={{ __html: getText(page.html, rawLocale) }} />
    </LegalPageShell>
  );
}

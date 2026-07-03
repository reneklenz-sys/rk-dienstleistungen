import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { PageSections } from "@/components/sections/PageSections";
import { designStyle } from "@/design/tokens";
import { getText, isLocale, locales } from "@/lib/i18n";
import { getHomepageData } from "@/sanity/lib/fetch";
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
  const data = await getHomepageData();

  return {
    title: getText(data.seo.title, locale),
    description: getText(data.seo.description, locale),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
      },
    },
    openGraph: {
      title: getText(data.seo.title, locale),
      description: getText(data.seo.description, locale),
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/rene-klenz.png",
          width: 1200,
          height: 1500,
          alt: locale === "de" ? "René Klenz — Digitale Dienstleistungen" : "René Klenz — digital services",
        },
      ],
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const data = await getHomepageData();

  return (
    <div style={designStyle(data.designPreset)}>
      <Navigation locale={rawLocale} />
      <main>
        <HeroSection hero={data.hero} locale={rawLocale} />
        <PageSections data={data} locale={rawLocale} />
      </main>
      <Footer locale={rawLocale} />
    </div>
  );
}

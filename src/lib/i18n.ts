import type { Locale, LocalizedString } from "@/types/content";

export const locales = ["de", "en"] as const;
export const defaultLocale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getText(value: LocalizedString | undefined, locale: Locale) {
  if (!value) return "";
  return value[locale] || value[defaultLocale] || "";
}

export function localizedPath(locale: Locale, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

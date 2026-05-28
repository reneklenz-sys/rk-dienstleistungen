import Link from "next/link";

import type { Locale } from "@/types/content";

export function LocaleSwitch({ locale, pathname = "" }: { locale: Locale; pathname?: string }) {
  const nextLocale: Locale = locale === "de" ? "en" : "de";
  const label = locale === "de" ? "EN" : "DE";
  const cleanPath = pathname.replace(/^\/(de|en)/, "");

  return (
    <Link className="glass-control min-h-10 rounded-full px-4 text-xs font-semibold text-foreground transition hover:-translate-y-0.5" href={`/${nextLocale}${cleanPath || ""}`}>
      {label}
    </Link>
  );
}

import Link from "next/link";

import { compactNavControlClass, controlActiveClass } from "@/lib/navControls";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/content";

export function LocaleSwitch({ locale, pathname = "" }: { locale: Locale; pathname?: string }) {
  const nextLocale: Locale = locale === "de" ? "en" : "de";
  const label = locale === "de" ? "EN" : "DE";
  const cleanPath = pathname.replace(/^\/(de|en)/, "");

  return (
    <Link
      className={cn(compactNavControlClass, controlActiveClass)}
      href={`/${nextLocale}${cleanPath || ""}`}
      aria-label={locale === "de" ? "Sprache auf Englisch wechseln" : "Sprache auf Deutsch wechseln"}
      title={locale === "de" ? "Deutsch" : "English"}
    >
      {label}
    </Link>
  );
}

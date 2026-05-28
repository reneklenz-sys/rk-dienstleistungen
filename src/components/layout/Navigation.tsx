import Link from "next/link";

import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/content";

import { Container } from "../ui/Container";
import { LocaleSwitch } from "../ui/LocaleSwitch";
import { ThemeToggle } from "../ui/ThemeToggle";

const navLabels = {
  de: [
    ["Leistungen", "#leistungen"],
    ["Referenzen", "#referenzen"],
    ["Labs", "#labs"],
    ["Kontakt", "#kontakt"],
  ],
  en: [
    ["Services", "#leistungen"],
    ["Work", "#referenzen"],
    ["Labs", "#labs"],
    ["Contact", "#kontakt"],
  ],
} as const;

export function Navigation({ locale, defaultTheme }: { locale: Locale; defaultTheme: "system" | "light" | "dark" }) {
  return (
    <header className="sticky top-0 z-50 py-4">
      <Container>
        <nav className="glass-nav flex items-center justify-between gap-4 rounded-full px-4 py-3">
          <Link href={localizedPath(locale)} className="flex items-center gap-3 font-semibold tracking-tight text-foreground">
            <span className="grid size-9 place-items-center rounded-full bg-foreground text-sm text-background">A</span>
            <span className="hidden sm:inline">Amos Digital</span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navLabels[locale].map(([label, href]) => (
              <a key={href} className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-foreground/5 hover:text-foreground dark:hover:bg-white/10" href={href}>
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <LocaleSwitch locale={locale} />
            <ThemeToggle defaultTheme={defaultTheme} />
          </div>
        </nav>
      </Container>
    </header>
  );
}

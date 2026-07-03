"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/ui/Logo";
import { InstallAppButton } from "@/components/ui/InstallAppButton";
import { compactNavControlClass, controlActiveClass } from "@/lib/navControls";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/content";

const navLabels = {
  de: [
    ["Leistungen", "#leistungen"],
    ["Referenzen", "#referenzen"],
    ["Labs", "#labs"],
    ["Über mich", "#ueber-mich"],
    ["Kontakt", "#kontakt"],
  ],
  en: [
    ["Services", "#leistungen"],
    ["Work", "#referenzen"],
    ["Labs", "#labs"],
    ["About", "#ueber-mich"],
    ["Contact", "#kontakt"],
  ],
} as const;

export function Navigation({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let currentScrolled = window.scrollY > 20;

    const updateScrollState = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 20;
      if (nextScrolled !== currentScrolled) {
        currentScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollState);
    };

    setScrolled(currentScrolled);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const showNavChrome = scrolled || menuOpen;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div
        className={cn(
          "pointer-events-auto mx-3 mt-3 sm:mx-5 radius-nav border border-transparent transition-[background-color,box-shadow,border-color,opacity] duration-300 ease-out",
          showNavChrome
            ? "nav-glass-edge border-border/60 bg-card/82 shadow-[var(--shadow-soft)] backdrop-blur-xl"
            : "bg-transparent shadow-none",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 sm:px-4">
          <Logo locale={locale} />

          <div className="hidden items-center gap-3 md:flex">
            {navLabels[locale].map(([label, href]) => (
              <a
                key={href}
                className="relative text-sm font-semibold text-foreground/70 transition-colors hover:text-accent"
                href={href}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <InstallAppButton locale={locale} />
            </div>

            <button
              type="button"
              className={cn(compactNavControlClass, controlActiveClass, "md:hidden")}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="pointer-events-auto fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-x-3 top-[4.75rem] sm:inset-x-5" onClick={(event) => event.stopPropagation()}>
            <div className="nav-mobile-panel radius-nav p-4">
              <div className="grid gap-1">
                {navLabels[locale].map(([label, href]) => (
                  <a
                    key={href}
                    className="nav-mobile-link nav-mobile-link-surface rounded-2xl px-4 py-3 text-base font-semibold transition-colors"
                    href={href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </div>

              <div className="mt-4 border-t border-border/40 pt-4">
                <InstallAppButton locale={locale} variant="menu" onDone={() => setMenuOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

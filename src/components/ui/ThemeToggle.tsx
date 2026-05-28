"use client";

import { useEffect, useState } from "react";

type ThemeChoice = "system" | "light" | "dark";

const labels: Record<ThemeChoice, string> = {
  system: "System",
  light: "Hell",
  dark: "Dunkel",
};

function applyTheme(theme: ThemeChoice) {
  const root = document.documentElement;
  root.dataset.theme = theme;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.classList.toggle("dark", theme === "dark" || (theme === "system" && prefersDark));
}

export function ThemeToggle({ defaultTheme = "system" }: { defaultTheme?: ThemeChoice }) {
  const [theme, setTheme] = useState<ThemeChoice>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (window.localStorage.getItem("theme") as ThemeChoice | null) || defaultTheme;
  });

  useEffect(() => {
    applyTheme(theme);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      const saved = window.localStorage.getItem("theme") as ThemeChoice | null;
      applyTheme(saved || theme);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme]);

  function cycleTheme() {
    const next: ThemeChoice = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
    window.localStorage.setItem("theme", next);
    applyTheme(next);
  }

  return (
    <button
      aria-label="Theme wechseln"
      className="glass-control min-h-10 rounded-full px-4 text-xs font-semibold text-foreground transition hover:-translate-y-0.5"
      type="button"
      onClick={cycleTheme}
    >
      {labels[theme]}
    </button>
  );
}

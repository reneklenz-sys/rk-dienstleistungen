"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import {
  applyThemeMode,
  getStoredThemeMode,
  storeThemeMode,
  themeModeOptions,
  type ThemeModeSetting,
} from "@/lib/themeMode";
import {
  compactNavControlClass,
  controlActiveClass,
  controlInactiveClass,
  controlItemClass,
  controlShellClass,
} from "@/lib/navControls";
import { cn } from "@/lib/utils";

const themeModeLabels: Record<ThemeModeSetting, string> = {
  system: "System",
  light: "Hell",
  dark: "Dunkel",
};

const themeModeIcons = {
  system: Monitor,
  light: Sun,
  dark: Moon,
} as const;

export function ThemeToggle({ defaultTheme = "system" }: { defaultTheme?: ThemeModeSetting }) {
  const [mode, setMode] = useState<ThemeModeSetting>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getStoredThemeMode();
    setMode(initial);
    applyThemeMode(initial);
    setMounted(true);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => applyThemeMode(getStoredThemeMode());
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const CurrentIcon = themeModeIcons[mode];
  const nextMode = themeModeOptions[(themeModeOptions.indexOf(mode) + 1) % themeModeOptions.length];

  function cycleTheme() {
    storeThemeMode(nextMode);
    setMode(nextMode);
    applyThemeMode(nextMode);
  }

  return (
    <button
      type="button"
      aria-label={
        mounted
          ? `Darstellung: ${themeModeLabels[mode]}. Wechsel zu ${themeModeLabels[nextMode]}`
          : "Darstellung wechseln"
      }
      title={mounted ? `Darstellung: ${themeModeLabels[mode]}` : undefined}
      className={cn(compactNavControlClass, controlActiveClass)}
      onClick={cycleTheme}
      suppressHydrationWarning
    >
      <CurrentIcon size={15} aria-hidden />
    </button>
  );
}

export function ThemeToggleMobile({ defaultTheme = "system" }: { defaultTheme?: ThemeModeSetting }) {
  const [mode, setMode] = useState<ThemeModeSetting>(defaultTheme);

  useEffect(() => {
    setMode(getStoredThemeMode());
  }, []);

  function selectMode(nextMode: ThemeModeSetting) {
    storeThemeMode(nextMode);
    setMode(nextMode);
    applyThemeMode(nextMode);
  }

  return (
    <div className={cn(controlShellClass, "grid w-full grid-cols-3")}>
      {themeModeOptions.map((option) => {
        const Icon = themeModeIcons[option];
        return (
          <button
            key={option}
            type="button"
            onClick={() => selectMode(option)}
            aria-label={`Darstellung: ${themeModeLabels[option]}`}
            aria-pressed={mode === option}
            className={cn(
              controlItemClass,
              "gap-2 py-3 text-sm normal-case",
              mode === option ? controlActiveClass : controlInactiveClass,
            )}
          >
            <Icon size={16} aria-hidden />
            {themeModeLabels[option]}
          </button>
        );
      })}
    </div>
  );
}

export type ThemeModeSetting = "system" | "light" | "dark";
export type ResolvedThemeMode = "light" | "dark";

const themeStorageKey = "theme";

export const themeModeOptions: ThemeModeSetting[] = ["system", "light", "dark"];

export function getStoredThemeMode(): ThemeModeSetting {
  try {
    const stored = window.localStorage.getItem(themeStorageKey);
    return themeModeOptions.includes(stored as ThemeModeSetting) ? (stored as ThemeModeSetting) : "system";
  } catch {
    return "system";
  }
}

export function storeThemeMode(mode: ThemeModeSetting) {
  try {
    window.localStorage.setItem(themeStorageKey, mode);
  } catch {
    // preference only
  }
}

export function getSystemThemeMode(): ResolvedThemeMode {
  if (!window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveThemeMode(mode: ThemeModeSetting): ResolvedThemeMode {
  return mode === "system" ? getSystemThemeMode() : mode;
}

export function applyThemeMode(mode: ThemeModeSetting) {
  const root = document.documentElement;
  const resolved = resolveThemeMode(mode);

  root.dataset.theme = mode;
  root.dataset.themeMode = resolved;
  root.classList.toggle("dark", resolved === "dark");
}

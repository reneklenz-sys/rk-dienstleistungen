import brand from "../../Branding/brand-colors.json";

export type BrandColors = typeof brand;

export const brandColors: BrandColors = brand;

/** CSS custom properties derived from Branding/brand-colors.json */
export function brandCssVariables(): Record<string, string> {
  return {
    "--background": brand.onMark,
    "--foreground": brand.text,
    "--muted": brand.textMuted,
    "--accent": brand.primaryDark,
    "--accent-mid": brand.primaryMid,
    "--accent-bright": brand.accentMid,
    "--accent-light": brand.accentLight,
    "--accent-soft": "#e4f2f9",
    "--logo-dark": brand.primaryDark,
    "--logo-accent": brand.accentLight,
    "--logo-shadow": "#252530",
    "--on-mark": brand.onMark,
    "--line": "color-mix(in srgb, var(--foreground) 8%, transparent)",
  };
}

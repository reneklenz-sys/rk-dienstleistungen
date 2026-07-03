import type { DesignPreset } from "@/types/content";

import { accentPresetVars } from "./accent-presets";

const radiusMap: Record<DesignPreset["radius"], string> = {
  soft: "18px",
  round: "28px",
  pill: "999px",
};

/** Layout + CMS-Akzent-Preset als CSS-Variablen auf dem Page-Wrapper. */
export function designStyle(preset: DesignPreset) {
  return {
    ...accentPresetVars(preset.colorPreset),
    "--surface-radius": radiusMap[preset.radius],
  } as React.CSSProperties;
}

export { accentPresets, resolveColorPreset } from "./accent-presets";
export { brandColors } from "./brand-colors";

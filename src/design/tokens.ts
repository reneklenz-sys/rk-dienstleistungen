import type { DesignPreset } from "@/types/content";

const radiusMap: Record<DesignPreset["radius"], string> = {
  soft: "18px",
  round: "28px",
  pill: "999px",
};

export function designStyle(preset: DesignPreset) {
  return {
    "--accent": preset.accent,
    "--accent-soft": preset.accentSoft,
    "--surface-radius": radiusMap[preset.radius],
  } as React.CSSProperties;
}

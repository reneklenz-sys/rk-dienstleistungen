export type ColorPresetKey = "anthraciteCyan" | "amethyst" | "graphite" | "champagne" | "ocean";

export type AccentPreset = {
  label: string;
  vars: Record<string, string>;
};

/** CMS-wählbare Akzent-Paletten — wirken auf Buttons, Tags, Aurora und Logo-Akzent. */
export const accentPresets: Record<ColorPresetKey, AccentPreset> = {
  anthraciteCyan: {
    label: "Anthrazit & Cyan",
    vars: {
      "--accent": "#7dd3fc",
      "--accent-mid": "#9fb0c4",
      "--accent-bright": "#7dd3fc",
      "--accent-light": "#7dd3fc",
      "--accent-soft": "rgba(125, 211, 252, 0.1)",
      "--logo-accent": "#7dd3fc",
      "--primary": "199 95% 74%",
      "--primary-glow": "199 95% 74%",
    },
  },
  amethyst: {
    label: "Amethyst",
    vars: {
      "--accent": "#c4b5fd",
      "--accent-mid": "#a78bfa",
      "--accent-bright": "#8b5cf6",
      "--accent-light": "#ddd6fe",
      "--accent-soft": "rgba(139, 92, 246, 0.12)",
      "--logo-accent": "#c4b5fd",
      "--primary": "258 90% 66%",
      "--primary-glow": "258 90% 76%",
    },
  },
  graphite: {
    label: "Graphit",
    vars: {
      "--accent": "#94a3b8",
      "--accent-mid": "#64748b",
      "--accent-bright": "#cbd5e1",
      "--accent-light": "#e2e8f0",
      "--accent-soft": "rgba(148, 163, 184, 0.12)",
      "--logo-accent": "#cbd5e1",
      "--primary": "215 16% 72%",
      "--primary-glow": "215 20% 82%",
    },
  },
  champagne: {
    label: "Champagner",
    vars: {
      "--accent": "#fcd34d",
      "--accent-mid": "#d6b46a",
      "--accent-bright": "#fbbf24",
      "--accent-light": "#fde68a",
      "--accent-soft": "rgba(251, 191, 36, 0.12)",
      "--logo-accent": "#fde68a",
      "--primary": "43 96% 56%",
      "--primary-glow": "43 96% 66%",
    },
  },
  ocean: {
    label: "Ozean",
    vars: {
      "--accent": "#5eead4",
      "--accent-mid": "#2dd4bf",
      "--accent-bright": "#14b8a6",
      "--accent-light": "#99f6e4",
      "--accent-soft": "rgba(20, 184, 166, 0.12)",
      "--logo-accent": "#99f6e4",
      "--primary": "172 66% 50%",
      "--primary-glow": "172 66% 60%",
    },
  },
};

export function resolveColorPreset(key?: string): ColorPresetKey {
  if (key && key in accentPresets) return key as ColorPresetKey;
  return "anthraciteCyan";
}

export function accentPresetVars(key?: string): Record<string, string> {
  return accentPresets[resolveColorPreset(key)].vars;
}

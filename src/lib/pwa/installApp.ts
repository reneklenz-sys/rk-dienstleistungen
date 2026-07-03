export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export function isStandaloneApp() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((window.navigator as NavigatorWithStandalone).standalone)
  );
}

export function isIosDevice() {
  if (typeof window === "undefined") return false;
  const navigatorWithTouch = window.navigator as Navigator & { maxTouchPoints?: number };
  return (
    /iphone|ipad|ipod/i.test(window.navigator.userAgent) ||
    (window.navigator.platform === "MacIntel" && (navigatorWithTouch.maxTouchPoints ?? 0) > 1)
  );
}

export function canShowInstallUi(installPrompt: BeforeInstallPromptEvent | null, installed: boolean) {
  if (installed) return false;
  return Boolean(installPrompt) || isIosDevice();
}

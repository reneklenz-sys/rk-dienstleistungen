"use client";

import { Download, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

import { compactNavControlClass, controlActiveClass } from "@/lib/navControls";
import {
  canShowInstallUi,
  isStandaloneApp,
  type BeforeInstallPromptEvent,
} from "@/lib/pwa/installApp";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/content";

const copy = {
  de: {
    label: "App installieren",
    installed: "App installiert",
    cancelled: "Installation abgebrochen",
    cancelledHint: "Du kannst die App später erneut über den Browser installieren.",
    iosTitle: "App auf diesem Gerät installieren",
    iosHint: "Im Browser-Menü das Teilen-Symbol öffnen und dann „Zum Home-Bildschirm“ wählen.",
  },
  en: {
    label: "Install app",
    installed: "App installed",
    cancelled: "Installation cancelled",
    cancelledHint: "You can install the app again later from your browser menu.",
    iosTitle: "Install app on this device",
    iosHint: "Open the share menu in your browser and choose “Add to Home Screen”.",
  },
} as const;

type InstallAppButtonProps = {
  locale: Locale;
  className?: string;
  variant?: "icon" | "menu";
  onDone?: () => void;
};

export function InstallAppButton({ locale, className, variant = "icon", onDone }: InstallAppButtonProps) {
  const t = copy[locale];
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setInstalled(isStandaloneApp());

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const onAppInstalled = () => {
      setInstallPrompt(null);
      setInstalled(true);
      setStatus(t.installed);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, [t.installed]);

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(null), 5000);
    return () => window.clearTimeout(timer);
  }, [status]);

  if (!canShowInstallUi(installPrompt, installed)) return null;

  async function handleInstall() {
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      setInstallPrompt(null);

      if (choice.outcome === "dismissed") {
        setStatus(`${t.cancelled}. ${t.cancelledHint}`);
      }

      onDone?.();
      return;
    }

    setStatus(`${t.iosTitle}. ${t.iosHint}`);
    onDone?.();
  }

  return (
    <>
      {variant === "menu" ? (
        <button
          type="button"
          onClick={handleInstall}
          className={cn(
            "nav-preset-button inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-colors",
            className,
          )}
        >
          <Smartphone size={17} aria-hidden />
          {t.label}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleInstall}
          className={cn(compactNavControlClass, controlActiveClass, className)}
          aria-label={t.label}
          title={t.label}
        >
          <Download size={15} aria-hidden />
        </button>
      )}

      {status ? (
        <p
          role="status"
          className="fixed bottom-5 left-1/2 z-[70] max-w-sm -translate-x-1/2 rounded-2xl border border-border/60 bg-card/90 px-4 py-3 text-center text-sm leading-6 text-foreground shadow-[var(--shadow-soft)] backdrop-blur-xl"
        >
          {status}
        </p>
      ) : null}
    </>
  );
}

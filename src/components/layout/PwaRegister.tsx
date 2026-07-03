"use client";

import { useEffect } from "react";

function shouldRegisterServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return false;

  const host = window.location.hostname;
  const isLocalhost = host === "localhost" || host === "127.0.0.1";
  return process.env.NODE_ENV === "production" || isLocalhost;
}

export function PwaRegister() {
  useEffect(() => {
    if (!shouldRegisterServiceWorker()) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // PWA support should never block the website.
      });
    };

    if (document.readyState === "complete") {
      register();
      return;
    }

    window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}

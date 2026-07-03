import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { PwaRegister } from "@/components/layout/PwaRegister";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "René Klenz — Websites & KI-Content",
    template: "%s | René Klenz",
  },
  description:
    "Websites, Landingpages und KI-Content für Praxen, Studios und lokale Betriebe — direkt mit mir, ohne Agentur-Overhead.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "René Klenz — Digitale Dienstleistungen",
    title: "René Klenz — Websites & KI-Content",
    description:
      "Websites, Landingpages und KI-Content für Praxen, Studios und lokale Betriebe — direkt mit mir, ohne Agentur-Overhead.",
    images: [
      {
        url: "/images/rene-klenz.png",
        width: 1200,
        height: 1500,
        alt: "René Klenz — Digitale Dienstleistungen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "René Klenz — Websites & KI-Content",
    description:
      "Websites, Landingpages und KI-Content für Praxen, Studios und lokale Betriebe — direkt mit mir, ohne Agentur-Overhead.",
    images: ["/images/rene-klenz.png"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "René Klenz",
    statusBarStyle: "black-translucent",
  },
};

const themeScript = `
(() => {
  try {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.dataset.themeMode = "dark";
    document.documentElement.classList.add("dark");
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`dark ${dmSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}

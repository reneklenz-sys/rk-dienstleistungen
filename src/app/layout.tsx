import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PwaRegister } from "@/components/layout/PwaRegister";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Amos Digital",
    template: "%s | Amos Digital",
  },
  description: "Digitale Auftritte, KI-Content und Webapps für kleine Unternehmen, Praxen, Studios und Gründer.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Amos Digital",
    statusBarStyle: "black-translucent",
  },
};

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("theme") || "system";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = stored;
    document.documentElement.classList.toggle("dark", stored === "dark" || (stored === "system" && prefersDark));
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}

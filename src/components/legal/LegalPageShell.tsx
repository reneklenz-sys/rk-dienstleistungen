import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { fallbackHomepage } from "@/data/fallback";
import { designStyle } from "@/design/tokens";
import type { Locale } from "@/types/content";

export function LegalPageShell({
  locale,
  title,
  children,
}: {
  locale: Locale;
  title: string;
  children: ReactNode;
}) {
  return (
    <div style={designStyle(fallbackHomepage.designPreset)}>
      <Navigation locale={locale} />
      <main className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <Container>
          <GlassCard className="p-7 sm:p-10">
            <h1 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">{title}</h1>
            <div className="legal-prose mt-8">{children}</div>
          </GlassCard>
        </Container>
      </main>
      <Footer locale={locale} />
    </div>
  );
}

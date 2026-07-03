import Link from "next/link";

import { LogoMark } from "@/components/ui/LogoMark";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function Logo({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return (
    <Link href={localizedPath(locale)} className="group flex min-w-0 items-center gap-3.5 sm:gap-4">
      <span className="relative block size-12 shrink-0 transition duration-200 group-hover:scale-[1.02] sm:size-14">
        <LogoMark className="size-full" />
      </span>
      {!compact ? (
        <span className="hidden min-w-0 flex-col sm:flex">
          <span className="truncate text-base font-semibold tracking-[-0.02em] text-foreground">René Klenz</span>
          <span className="truncate text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            {locale === "de" ? "Digitale Dienstleistungen" : "Digital services"}
          </span>
        </span>
      ) : null}
    </Link>
  );
}

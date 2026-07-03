import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm font-semibold uppercase tracking-[0.28em] text-accent-bright", className)}>{children}</p>
  );
}

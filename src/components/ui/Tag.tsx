import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const variants = {
  brand: "border border-accent-bright/25 bg-accent-bright/12 text-foreground dark:text-[#f4f7fb]",
  success: "border border-emerald-500/20 bg-emerald-500/12 text-emerald-800 dark:text-emerald-200",
  neutral: "border border-foreground/12 bg-foreground/[0.05] text-foreground/85 dark:border-white/12 dark:bg-white/[0.08] dark:text-foreground/90",
  outline: "border border-foreground/14 bg-transparent text-muted dark:border-white/14 dark:text-foreground/80",
} as const;

export function Tag({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", variants[variant], className)}>{children}</span>
  );
}

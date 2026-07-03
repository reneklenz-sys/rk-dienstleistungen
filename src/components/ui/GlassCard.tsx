import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className = "",
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  const fullHeight = className.includes("h-full");

  return (
    <Component
      className={cn(
        "glass-panel transition duration-300 ease-out hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent-bright)_22%,var(--panel-edge))] hover:shadow-[var(--shadow-lift)]",
        fullHeight && "h-full",
      )}
    >
      <div className={cn("relative z-[1] h-full", className)}>{children}</div>
    </Component>
  );
}

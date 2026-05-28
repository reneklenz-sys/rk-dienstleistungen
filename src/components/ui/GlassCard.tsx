import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  return <Component className={`glass-panel transition duration-200 ease-out hover:-translate-y-1 ${className}`}>{children}</Component>;
}

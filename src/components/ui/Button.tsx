import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({ children, href, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold tracking-tight transition duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] active:translate-y-0";
  const styles =
    variant === "primary"
      ? "primary-glass-button shadow-[var(--shadow-soft)]"
      : "nav-preset-button text-foreground";

  return (
    <Link className={`${base} ${styles} ${className}`} href={href}>
      {children}
    </Link>
  );
}

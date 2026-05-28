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
    "inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold tracking-tight transition duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] active:translate-y-0";
  const styles =
    variant === "primary"
      ? "bg-[var(--accent)] text-white shadow-[0_18px_50px_rgba(124,92,255,0.32)] hover:shadow-[0_22px_60px_rgba(124,92,255,0.42)]"
      : "glass-control text-foreground";

  return (
    <Link className={`${base} ${styles} ${className}`} href={href}>
      {children}
    </Link>
  );
}

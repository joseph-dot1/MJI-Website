import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline-dark";

/**
 * solid: black button on light sections (sweep reveals white fill + black text
 * inversion via border). outline-dark: white outline on black sections that
 * fills solid white on hover — the final-CTA treatment.
 */
export default function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base =
    "btn-solid inline-block px-8 py-4 text-label uppercase tracking-[0.14em] text-center";
  const styles =
    variant === "solid"
      ? "bg-ink text-paper border border-ink hover:text-ink [--btn-sweep:#fff]"
      : "border border-paper text-paper hover:text-ink [--btn-sweep:#fff]";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

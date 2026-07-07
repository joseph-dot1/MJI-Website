import type { ReactNode } from "react";

/**
 * Dev-only marker for content that must be collected before launch.
 * Dashed outline + "AWAITING REAL CONTENT" label — unmistakably unshippable,
 * so nothing fabricated can slip into production unnoticed.
 */
export default function Placeholder({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`awaiting p-8 ${className}`}>{children}</div>;
}

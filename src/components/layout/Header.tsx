"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Quiet fixed header, everything drawn in white with mix-blend-difference —
 * it self-inverts over every section (black on white pages, white on black),
 * so the CTA stays legible at every scroll depth without a scrim fighting
 * the inverted sections.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="blend-header fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div
        className={`mx-auto flex h-16 max-w-site items-center justify-between border-b px-6 transition-colors duration-300 md:px-10 ${
          scrolled ? "border-paper/25" : "border-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-paper"
        >
          My Journey Inc.
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-8">
          <Link
            href="/about"
            className="draw-link hidden text-label uppercase tracking-[0.14em] text-paper md:inline"
          >
            About us
          </Link>
          <Link
            href="/how-it-works"
            className="draw-link hidden text-label uppercase tracking-[0.14em] text-paper sm:inline"
          >
            How it works
          </Link>
          <Link
            href="/get-involved"
            className="draw-link hidden text-label uppercase tracking-[0.14em] text-paper md:inline"
          >
            Get involved
          </Link>
          <Link
            href="/register"
            className="bg-paper px-5 py-2.5 text-label uppercase tracking-[0.14em] text-ink transition-opacity duration-200 hover:opacity-80"
          >
            Start My Journey
          </Link>
        </nav>
      </div>
    </header>
  );
}

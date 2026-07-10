"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/about", label: "About us" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/get-involved", label: "Get involved" },
];

/**
 * Fixed header with a solid black bar — always legible over every section,
 * no blend tricks. Below md the links collapse behind a hamburger that opens
 * a full-screen black overlay.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change; lock body scroll while open; close on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-50 bg-ink">
        <div className="mx-auto flex h-16 max-w-site items-center justify-between border-b border-paper/10 px-6 md:px-10">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-paper"
          >
            My Journey Inc.
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="draw-link hidden text-label uppercase tracking-[0.14em] text-paper md:inline"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="hidden bg-paper px-5 py-2.5 text-label uppercase tracking-[0.14em] text-ink transition-opacity duration-200 hover:opacity-80 sm:inline-block"
            >
              Start My Journey
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span
                className={`absolute h-px w-6 bg-paper transition-transform duration-300 ease-out3 ${
                  open ? "rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-paper transition-transform duration-300 ease-out3 ${
                  open ? "-rotate-45" : "translate-y-[5px]"
                }`}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile overlay — solid black, matches the bar. */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-ink px-6 transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile">
          <ul className="space-y-2">
            {LINKS.map((l, i) => (
              <li
                key={l.href}
                className={open ? "animate-[fade-up_0.5s_cubic-bezier(0.215,0.61,0.355,1)_both]" : ""}
                style={{ animationDelay: `${0.08 + i * 0.06}s` }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-display-md text-paper"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/register"
          onClick={() => setOpen(false)}
          className={`btn-solid mt-12 inline-block w-fit border border-paper px-8 py-4 text-label uppercase tracking-[0.14em] text-paper hover:text-ink [--btn-sweep:#fff] ${
            open ? "animate-[fade-up_0.5s_cubic-bezier(0.215,0.61,0.355,1)_0.28s_both]" : ""
          }`}
        >
          Start My Journey
        </Link>
        <p
          className={`mt-16 text-eyebrow uppercase !leading-loose text-smoke ${
            open ? "animate-[fade-up_0.5s_cubic-bezier(0.215,0.61,0.355,1)_0.36s_both]" : ""
          }`}
        >
          Discover Purpose · Develop Capacity · Transform Society
        </p>
      </div>
    </>
  );
}

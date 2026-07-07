"use client";

export type ConstellationTier = "gl" | "canvas2d" | "svg";

/**
 * Rendering tier for the constellation.
 * - "gl": desktop, fine pointer, no data-saver, WebGL available → R3F.
 * - "canvas2d": touch / small screens → plain 2D canvas, zero three.js bytes.
 * - "svg": reduced motion, save-data, no WebGL/canvas → static SVG.
 */
export function detectTier(): ConstellationTier {
  if (typeof window === "undefined") return "svg";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "svg";

  const conn = (navigator as unknown as { connection?: { saveData?: boolean } })
    .connection;
  if (conn?.saveData) return "svg";

  const desktop =
    window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 1024;

  if (desktop) {
    try {
      const c = document.createElement("canvas");
      if (c.getContext("webgl2") || c.getContext("webgl")) return "gl";
    } catch {
      /* fall through */
    }
  }

  try {
    const c = document.createElement("canvas");
    if (c.getContext("2d")) return "canvas2d";
  } catch {
    /* fall through */
  }
  return "svg";
}

export function isDesktopFinePointer(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    window.innerWidth >= 1024
  );
}

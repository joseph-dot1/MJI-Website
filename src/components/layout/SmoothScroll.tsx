"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { isDesktopFinePointer } from "@/lib/capabilities";

/**
 * Lenis runs desktop-only: touch devices keep native scroll physics
 * (smoothed touch scrolling feels wrong on Android), and reduced-motion
 * users get the browser default.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || !isDesktopFinePointer()) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

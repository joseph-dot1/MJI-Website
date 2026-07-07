"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Section animation hook. `setup` receives a gsap.context scoped to the
 * ref'd element and only runs when motion is allowed; under reduced motion
 * `reduced` (default: reveal everything instantly) runs instead.
 */
export function useSectionAnimation<T extends HTMLElement>(
  setup: (el: T, ctx: gsap.Context) => void,
  reduced?: (el: T) => void
) {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      if (reduced) {
        reduced(el);
      } else {
        gsap.set(el.querySelectorAll(".gsap-reveal"), { opacity: 1 });
        gsap.set(el.querySelectorAll(".mask-line > span"), { y: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {}, el);
    ctx.add(() => setup(el, ctx));
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/** Default entrance: fade-rise the section's .gsap-reveal children. */
export function revealChildren(
  el: HTMLElement,
  opts: { y?: number; stagger?: number; start?: string } = {}
) {
  const targets = el.querySelectorAll(".gsap-reveal");
  if (!targets.length) return;
  gsap.fromTo(
    targets,
    { opacity: 0, y: opts.y ?? 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: opts.stagger ?? 0.09,
      scrollTrigger: {
        trigger: el,
        start: opts.start ?? "top 72%",
        once: true,
      },
    }
  );
}

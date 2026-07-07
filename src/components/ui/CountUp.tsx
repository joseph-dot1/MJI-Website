"use client";

import { useRef } from "react";
import { gsap, useSectionAnimation } from "@/lib/gsap";

/**
 * Impact numeral. Playfair Display has no tabular figures, so each digit
 * sits in a fixed-width slot — the count-up can't jitter the layout.
 * Small values (5, 6) skip the count entirely: 0→5 is bathos.
 * Screen readers get the plain final value; the animated digits are hidden.
 */
export default function CountUp({
  value,
  suffix = "",
  countUp = true,
}: {
  value: number;
  suffix?: string;
  countUp?: boolean;
}) {
  const digits = String(value).split("");
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const ref = useSectionAnimation<HTMLSpanElement>((el) => {
    if (!countUp) return;
    const state = { n: 0 };
    gsap.to(state, {
      n: value,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        const current = String(Math.round(state.n)).padStart(digits.length, "0");
        spansRef.current.forEach((s, i) => {
          if (s) s.textContent = current[i];
        });
      },
    });
  });

  return (
    <span ref={ref}>
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span aria-hidden="true">
        {digits.map((d, i) => (
          <span
            key={i}
            className="digit-slot"
            ref={(s) => {
              spansRef.current[i] = s;
            }}
          >
            {d}
          </span>
        ))}
        {suffix}
      </span>
    </span>
  );
}

"use client";

import { useSectionAnimation, revealChildren } from "@/lib/gsap";
import { values } from "@/lib/copy";

/**
 * Strict 4-column grid (2 on mobile), hairlines via the gap-px trick so
 * rules can never double up. Hover inverts the cell — CSS only.
 */
export default function Values() {
  const ref = useSectionAnimation<HTMLElement>((el) =>
    revealChildren(el, { stagger: 0.05, y: 16 })
  );

  return (
    <section ref={ref} className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-32 md:px-10 md:py-48">
        <p className="gsap-reveal text-eyebrow uppercase text-muted">
          {values.eyebrow}
        </p>
        <h2 className="gsap-reveal mt-6 font-display text-display-lg text-ink">
          {values.headline}
        </h2>

        <ul className="mt-16 grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
          {values.items.map((v) => (
            <li
              key={v.name}
              className="gsap-reveal value-cell p-6 text-ink md:p-8"
            >
              <h3 className="font-display text-xl font-medium md:text-2xl">
                {v.name}
              </h3>
              <p className="value-muted mt-3 text-sm leading-relaxed text-muted">
                {v.line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

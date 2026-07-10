"use client";

import { useSectionAnimation, revealChildren } from "@/lib/gsap";
import { outcomes } from "@/lib/copy";

/**
 * Deliberately the quietest section on the page — one fade, no choreography.
 * It signals operational seriousness; motion would undercut it.
 */
export default function OutcomesStrip() {
  const ref = useSectionAnimation<HTMLElement>((el) =>
    revealChildren(el, { stagger: 0.05 })
  );

  // One run of the six outcomes with trailing interpuncts; rendered twice
  // (the second marked data-dup) for a seamless -50% loop.
  const Run = ({ dup = false }: { dup?: boolean }) => (
    <div
      data-dup={dup || undefined}
      aria-hidden={dup || undefined}
      className="flex shrink-0 items-center"
    >
      {outcomes.list.map((o) => (
        <span key={o} className="flex items-center whitespace-nowrap">
          <span className="text-eyebrow uppercase text-ink">{o}</span>
          <span aria-hidden="true" className="mx-8 text-muted">
            ·
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section ref={ref} className="border-y border-rule bg-paper">
      <div className="mx-auto max-w-site px-6 pb-14 pt-24 text-center md:px-10 md:pb-16 md:pt-32">
        <p className="gsap-reveal text-eyebrow uppercase text-muted">
          {outcomes.eyebrow}
        </p>
        <h2 className="gsap-reveal mx-auto mt-6 max-w-3xl font-display text-display-lg text-ink">
          {outcomes.headline}
        </h2>
        <p className="gsap-reveal mx-auto mt-6 max-w-measure text-body-lg text-ash">
          {outcomes.intro}
        </p>
      </div>
      {/* Animated horizontal ticker of the six outcomes. */}
      <div
        className="gsap-reveal ticker-wrap pb-24 md:pb-32"
        role="marquee"
        aria-label="The six outcomes every MJI activity must produce"
      >
        <div className="ticker">
          <Run />
          <Run dup />
        </div>
      </div>
    </section>
  );
}

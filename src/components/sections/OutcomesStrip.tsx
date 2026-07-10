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

  return (
    <section ref={ref} className="border-y border-rule bg-paper">
      <div className="mx-auto max-w-site px-6 py-24 text-center md:px-10 md:py-32">
        <p className="gsap-reveal text-eyebrow uppercase text-muted">
          {outcomes.eyebrow}
        </p>
        <h2 className="gsap-reveal mx-auto mt-6 max-w-3xl font-display text-display-lg text-ink">
          {outcomes.headline}
        </h2>
        <p className="gsap-reveal mx-auto mt-6 max-w-measure text-body-lg text-ash">
          {outcomes.intro}
        </p>
        {/* Flex-wrap so the line breaks between items at any width; each
            label stays intact (nowrap). Gap spacing separates them — no
            trailing interpuncts hanging at line ends when they stack. */}
        <div className="gsap-reveal mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-eyebrow uppercase text-ink">
          {outcomes.list.map((o) => (
            <span key={o} className="whitespace-nowrap">
              {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

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
        <p className="gsap-reveal mx-auto mt-10 max-w-4xl text-eyebrow uppercase leading-loose text-ink">
          {outcomes.list.map((o, i) => (
            <span key={o} className="whitespace-nowrap">
              {o}
              {i < outcomes.list.length - 1 && (
                <span aria-hidden="true" className="mx-3 text-muted">
                  ·
                </span>
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

"use client";

import { useSectionAnimation, revealChildren } from "@/lib/gsap";
import { whoItsFor } from "@/lib/copy";

export default function WhoItsFor() {
  const ref = useSectionAnimation<HTMLElement>((el) => revealChildren(el));

  return (
    <section ref={ref} className="border-t border-rule bg-paper">
      <div className="mx-auto grid max-w-site gap-12 px-6 py-32 md:px-10 md:py-40 lg:grid-cols-2">
        <h2 className="gsap-reveal max-w-xl font-display text-display-lg text-ink">
          {whoItsFor.headline}
        </h2>
        <div className="space-y-10">
          <div className="gsap-reveal">
            <p className="text-eyebrow uppercase text-muted">
              {whoItsFor.primaryLabel}
            </p>
            <p className="mt-4 max-w-measure text-body-lg text-ash">
              {whoItsFor.primary}
            </p>
          </div>
          <div className="gsap-reveal border-t border-rule pt-10">
            <p className="text-eyebrow uppercase text-muted">
              {whoItsFor.alsoLabel}
            </p>
            <p className="mt-4 max-w-measure text-body-lg text-ash">
              {whoItsFor.also}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

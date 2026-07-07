"use client";

import { useState } from "react";
import { useSectionAnimation, revealChildren } from "@/lib/gsap";
import { faq } from "@/lib/copy";

/**
 * Accordion: buttons with aria-expanded, panels animated via the CSS
 * grid-rows trick. Thin dividers, plus rotates to ×, no cards, no shadows.
 * Deliberately no scroll animation — interaction is this section's motion.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useSectionAnimation<HTMLElement>((el) =>
    revealChildren(el, { stagger: 0.04, y: 12 })
  );

  return (
    <section ref={ref} className="border-t border-rule bg-paper">
      <div className="mx-auto max-w-4xl px-6 py-32 md:px-10 md:py-48">
        <h2 className="gsap-reveal font-display text-display-lg text-ink">
          {faq.headline}
        </h2>
        <div className="mt-16">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="gsap-reveal border-b border-ink/20">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-baseline justify-between gap-6 py-6 text-left font-display text-xl text-ink md:text-2xl"
                  >
                    {item.q}
                    <span
                      aria-hidden="true"
                      className={`shrink-0 font-text text-2xl font-light leading-none text-muted transition-transform duration-300 ease-out3 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className="grid transition-[grid-template-rows] duration-300 ease-out3"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-measure pb-8 text-base leading-relaxed text-ash">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

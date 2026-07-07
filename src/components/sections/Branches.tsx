"use client";

import { useSectionAnimation, revealChildren } from "@/lib/gsap";
import { branches } from "@/lib/copy";

export default function Branches() {
  const ref = useSectionAnimation<HTMLElement>((el) => revealChildren(el));

  return (
    <section ref={ref} className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-32 md:px-10 md:py-48">
        <p className="gsap-reveal text-eyebrow uppercase text-muted">
          {branches.eyebrow}
        </p>
        <h2 className="gsap-reveal mt-6 max-w-4xl font-display text-display-lg text-ink">
          {branches.headline}
        </h2>
        <p className="gsap-reveal mt-6 max-w-measure text-body-lg text-ash">
          {branches.intro}
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {branches.items.map((b) => (
            <article
              key={b.numeral}
              className="gsap-reveal group relative overflow-hidden border border-rule p-8 pt-10 transition-colors duration-300 hover:border-ink md:p-10"
            >
              {/* Ghost numeral — parallaxes up slightly behind content on hover. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 right-4 select-none font-display text-ghost-numeral text-fog transition-transform duration-500 ease-out3 group-hover:-translate-y-2"
              >
                {b.numeral}
              </span>
              <div className="relative">
                <h3 className="font-display text-display-md text-ink">
                  {b.name}
                </h3>
                <p className="mt-2 font-display text-body-lg italic text-ash">
                  {b.tagline}
                </p>
                <p className="mt-6 text-base text-ash">{b.body}</p>
                <p className="mt-8 border-t border-rule pt-5 text-sm text-muted">
                  <span className="text-eyebrow uppercase">Outcome</span>
                  <span className="mt-2 block text-sm leading-relaxed text-ash">
                    {b.outcome}
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="gsap-reveal mt-16 max-w-measure">
          <p className="text-eyebrow uppercase text-muted">
            {branches.whyTitle}
          </p>
          <p className="mt-4 text-body-lg text-ash">{branches.why}</p>
        </div>
      </div>
    </section>
  );
}

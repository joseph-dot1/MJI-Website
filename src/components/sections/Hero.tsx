"use client";

import { useRef } from "react";
import { gsap, useSectionAnimation } from "@/lib/gsap";
import { hero } from "@/lib/copy";
import Constellation from "@/components/constellation/Constellation";
import Button from "@/components/ui/Button";
import MaskedLines from "@/components/ui/MaskedLines";

export default function Hero() {
  const progressRef = useRef(0);

  // Entrance is CSS-only (see .hero-entrance in globals) so the headline
  // paints immediately. GSAP handles only the exit: as the hero scrolls out,
  // the constellation disperses downward and the headline drifts.
  const ref = useSectionAnimation<HTMLElement>((el) => {
    gsap.to(el.querySelector("[data-hero-inner]"), {
      yPercent: -10,
      opacity: 0.4,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      },
    });
  });

  return (
    <section
      ref={ref}
      className="hero-entrance relative min-h-svh overflow-hidden bg-paper"
    >
      <div
        data-hero-inner
        className="relative mx-auto flex min-h-svh max-w-site flex-col justify-center px-6 pb-24 pt-28 md:px-10"
      >
        {/* Constellation: right of center on desktop; on mobile a smaller
            quiet backdrop in the lower half — deliberately smaller than the
            headline's paint area so the headline stays the LCP element. */}
        <Constellation
          progressRef={progressRef}
          className="pointer-events-none absolute bottom-24 right-2 -z-0 aspect-[1/0.82] w-[58%] opacity-[0.18] sm:opacity-25 lg:bottom-auto lg:right-0 lg:top-1/2 lg:w-[46%] lg:-translate-y-1/2 lg:opacity-100"
        />

        <div className="relative">
          <p className="hero-fade text-eyebrow uppercase text-muted">
            {hero.eyebrow}
          </p>
          {/* Full-width: line one is allowed to run over the constellation —
              the layered overlap is deliberate; the map is faint enough. */}
          <MaskedLines
            lines={hero.headlineLines}
            className="mt-8 font-display text-display-xl text-ink"
          />
          <p className="hero-fade mt-8 max-w-xl text-body-lg text-ash">
            {hero.sub}
          </p>
          <div className="hero-fade mt-10 flex flex-wrap items-center gap-8">
            <Button href="/register">{hero.primaryCta}</Button>
            <a
              href="#how-mji-works"
              className="draw-link text-label uppercase tracking-[0.14em] text-ash"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <p className="hero-fade absolute bottom-8 left-6 right-6 text-eyebrow uppercase text-muted md:left-10">
          {hero.trustBar}
        </p>
      </div>
    </section>
  );
}

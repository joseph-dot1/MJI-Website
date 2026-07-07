"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useSectionAnimation } from "@/lib/gsap";
import { finalCta } from "@/lib/copy";
import Constellation from "@/components/constellation/Constellation";
import MaskedLines from "@/components/ui/MaskedLines";
import Button from "@/components/ui/Button";

/**
 * Closing the loop: the hero's constellation returns in inverse — white
 * particles reconverging into Nigeria as the section enters. The quietest,
 * most confident moment on the page.
 */
export default function FinalCta() {
  // Starts fully dispersed (1); animates home to the formed map (0).
  const progressRef = useRef(1);

  const ref = useSectionAnimation<HTMLElement>(
    (el) => {
      gsap.to(progressRef, {
        current: 0,
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: "top 55%", once: true },
      });
      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top 60%", once: true },
          defaults: { ease: "power3.out" },
        })
        .to(el.querySelectorAll(".mask-line > span"), {
          y: 0,
          duration: 0.9,
          stagger: 0.12,
        })
        .to(
          el.querySelectorAll(".gsap-reveal"),
          { opacity: 1, duration: 0.6, stagger: 0.08 },
          "-=0.4"
        );
    },
    () => {
      // Reduced motion: show the formed constellation immediately.
      progressRef.current = 0;
    }
  );

  return (
    <section
      ref={ref}
      data-theme="dark"
      className="relative overflow-hidden bg-bg text-body"
    >
      <Constellation
        progressRef={progressRef}
        inverted
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-[1/0.82] w-[min(80vw,900px)] -translate-x-1/2 -translate-y-1/2 opacity-40"
      />
      <div className="relative mx-auto flex min-h-svh max-w-site flex-col items-center justify-center px-6 py-32 text-center md:px-10">
        <MaskedLines
          lines={finalCta.headlineLines}
          as="h2"
          className="font-display text-display-cta text-fg"
        />
        <p className="gsap-reveal mt-8 text-eyebrow uppercase !leading-loose text-muted">
          {finalCta.sub}
        </p>
        <div className="gsap-reveal mt-12">
          <Button href="/register" variant="outline-dark">
            {finalCta.primaryCta}
          </Button>
        </div>
        <p className="gsap-reveal mt-6 text-xs text-muted">
          {finalCta.riskReversal}
        </p>
        <p className="gsap-reveal mt-16">
          <Link
            href="/register"
            className="draw-link text-label uppercase tracking-[0.14em] text-muted hover:text-fg"
          >
            {finalCta.secondaryCta}
          </Link>
        </p>
      </div>
    </section>
  );
}

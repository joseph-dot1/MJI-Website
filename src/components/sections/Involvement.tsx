"use client";

import Link from "next/link";
import { gsap, useSectionAnimation, revealChildren } from "@/lib/gsap";
import { involvement } from "@/lib/copy";
import Button from "@/components/ui/Button";

/**
 * Four rows, thin dividers that draw in from the left. Only "Become a
 * Member" gets the solid button — hierarchy protects the primary conversion.
 */
export default function Involvement() {
  const ref = useSectionAnimation<HTMLElement>((el) => {
    revealChildren(el);
    gsap.fromTo(
      el.querySelectorAll("[data-divider]"),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
        transformOrigin: "left center",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      }
    );
  });

  return (
    <section ref={ref} id="get-involved" className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-32 md:px-10 md:py-48">
        <h2 className="gsap-reveal max-w-3xl font-display text-display-lg text-ink">
          {involvement.headline}
        </h2>

        <div className="mt-16">
          {involvement.rows.map((row) => (
            <div key={row.path}>
              <hr data-divider className="border-t border-rule" />
              <div className="gsap-reveal grid gap-4 py-10 md:grid-cols-[1fr_2fr_auto] md:items-center md:gap-10">
                <h3 className="font-display text-display-md text-ink">
                  {row.path}
                </h3>
                <p className="max-w-measure text-base text-ash">{row.audience}</p>
                {row.primary ? (
                  <Button href="/register" className="justify-self-start md:justify-self-end">
                    {row.cta}
                  </Button>
                ) : (
                  <Link
                    href="/register"
                    className="draw-link justify-self-start text-label uppercase tracking-[0.14em] text-ink md:justify-self-end"
                  >
                    {row.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
          <hr data-divider className="border-t border-rule" />
        </div>
      </div>
    </section>
  );
}

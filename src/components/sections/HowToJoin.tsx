"use client";

import { gsap, useSectionAnimation, revealChildren } from "@/lib/gsap";
import { howToJoin } from "@/lib/copy";
import Button from "@/components/ui/Button";

/**
 * Desktop: the step row drifts horizontally, scrubbed to natural scroll —
 * motion without capturing the wheel. Mobile: vertical timeline.
 * Step numerals roll 01→05 as each enters.
 */
export default function HowToJoin() {
  const ref = useSectionAnimation<HTMLElement>((el) => {
    revealChildren(el);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = el.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const drift = () =>
        -Math.max(0, track.scrollWidth - track.clientWidth);
      gsap.to(track, {
        x: drift,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });

    // Numerals roll up to their value as each step enters.
    el.querySelectorAll<HTMLElement>("[data-numeral]").forEach((n) => {
      const target = Number(n.dataset.numeral);
      const state = { v: 0 };
      gsap.to(state, {
        v: target,
        duration: 0.35,
        ease: "power2.out",
        scrollTrigger: { trigger: n, start: "top 90%", once: true },
        onUpdate: () => {
          n.textContent = String(Math.round(state.v)).padStart(2, "0");
        },
      });
    });
  });

  return (
    <section ref={ref} id="how-to-join" className="overflow-hidden bg-paper">
      <div className="mx-auto max-w-site px-6 py-32 md:px-10 md:py-48">
        <p className="gsap-reveal text-eyebrow uppercase text-muted">
          {howToJoin.eyebrow}
        </p>
        <h2 className="gsap-reveal mt-6 max-w-3xl font-display text-display-lg text-ink">
          {howToJoin.headline}
        </h2>

        {/* Desktop: horizontal drift. Mobile: vertical timeline. */}
        <ol
          data-track
          className="mt-16 flex flex-col gap-0 border-l border-rule lg:flex-row lg:gap-10 lg:border-l-0 lg:pr-[10vw]"
        >
          {howToJoin.steps.map((s, i) => (
            <li
              key={s.name}
              className="gsap-reveal relative shrink-0 py-8 pl-8 lg:w-[300px] lg:border-l lg:border-rule lg:py-0 lg:pl-8"
            >
              <span
                data-numeral={i + 1}
                aria-hidden="true"
                className="pointer-events-none absolute -left-[1px] top-0 hidden select-none font-display text-ghost-numeral text-fog lg:block"
              >
                00
              </span>
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-11 h-[9px] w-[9px] rounded-full bg-ink lg:hidden"
              />
              <div className="relative lg:pt-28">
                <h3 className="font-display text-display-md text-ink">
                  {s.name}
                </h3>
                <p className="mt-3 max-w-xs text-base text-ash">
                  {s.body}
                  {s.meta && <em className="block pt-1 text-muted">{s.meta}</em>}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="gsap-reveal mt-16">
          <Button href="/register">{howToJoin.cta}</Button>
        </div>
      </div>
    </section>
  );
}

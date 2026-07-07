"use client";

import { gsap, useSectionAnimation } from "@/lib/gsap";
import { problem } from "@/lib/copy";

/**
 * The emotional low point. Desktop: pinned — the page inverts white→black,
 * then the three scenes brighten one at a time, and "Formation isn't."
 * lands with the release. Mobile: the inversion scrubs by (no pin) and the
 * scenes fade in as they enter. Reduced motion: static black, everything on.
 */
export default function Problem() {
  const ref = useSectionAnimation<HTMLElement>(
    (el) => {
      const invert = {
        "--pbg": "#000000",
        "--pfg": "#eaeaea",
        "--pfg-strong": "#ffffff",
        "--pmuted": "#8a8a8a",
        "--prule": "#2a2a2a",
      };
      const scenes = el.querySelectorAll("[data-scene]");
      const closer = el.querySelector("[data-closer]");

      const mm = gsap.matchMedia();

      // Pin only where the whole composition fits the viewport.
      mm.add("(min-width: 1024px) and (min-height: 720px)", () => {
        gsap.set(scenes, { opacity: 0.14 });
        gsap.set(closer, { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.4,
          },
        });

        tl.to(el, { ...invert, duration: 0.55, ease: "power1.inOut" });
        scenes.forEach((scene, i) => {
          tl.to(scene, { opacity: 1, duration: 0.5 }, 0.62 + i * 0.62);
          if (i > 0) {
            tl.to(scenes[i - 1], { opacity: 0.38, duration: 0.5 }, "<");
          }
        });
        tl.to(
          scenes[scenes.length - 1],
          { opacity: 0.38, duration: 0.4 },
          ">+0.1"
        );
        tl.to(closer, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<");
      });

      mm.add("(max-width: 1023px), (max-height: 719px)", () => {
        gsap.to(el, {
          ...invert,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          },
        });
        const nodes = [...Array.from(scenes), closer];
        gsap.set(nodes, { opacity: 0, y: 24 });
        nodes.forEach((node) => {
          gsap.to(node, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: node as Element, start: "top 82%", once: true },
          });
        });
      });
    },
    // Reduced motion: settle on the black state, everything visible.
    (el) => {
      el.style.setProperty("--pbg", "#000000");
      el.style.setProperty("--pfg", "#eaeaea");
      el.style.setProperty("--pfg-strong", "#ffffff");
      el.style.setProperty("--pmuted", "#8a8a8a");
      el.style.setProperty("--prule", "#2a2a2a");
    }
  );

  return (
    <section
      ref={ref}
      id="how-mji-works"
      style={
        {
          "--pbg": "#ffffff",
          "--pfg": "#1a1a1a",
          "--pfg-strong": "#000000",
          "--pmuted": "#757575",
          "--prule": "#e4e4e4",
          backgroundColor: "var(--pbg)",
          color: "var(--pfg)",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex min-h-svh max-w-site flex-col justify-center px-6 py-24 md:px-10 lg:py-16">
        <p className="text-eyebrow uppercase [color:var(--pmuted)]">{problem.eyebrow}</p>
        <h2 className="mt-5 max-w-4xl font-display text-display-lg [color:var(--pfg-strong)]">
          {problem.headline}
        </h2>
        <p className="mt-5 max-w-measure text-body-lg">{problem.body}</p>
        <p className="mt-8 text-eyebrow uppercase [color:var(--pmuted)]">
          {problem.scenesIntro}
        </p>

        <div className="mt-3">
          {problem.scenes.map((s, i) => (
            <p
              key={s.lead}
              data-scene
              className={`max-w-4xl py-4 font-display text-display-scene [border-color:var(--prule)] lg:py-5 ${
                i > 0 ? "border-t" : ""
              }`}
            >
              <strong className="font-medium [color:var(--pfg-strong)]">
                {s.lead}
              </strong>
              <span className="[color:var(--pmuted)]">{s.rest}</span>
            </p>
          ))}
        </div>

        <div data-closer className="mt-8 max-w-4xl lg:mt-10">
          <p className="font-display text-display-md">
            <span className="[color:var(--pmuted)]">{problem.closerA}</span>
            <strong className="font-semibold [color:var(--pfg-strong)]">
              {problem.closerB}
            </strong>
          </p>
          <p className="mt-3 text-body-lg">{problem.closerC}</p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useSectionAnimation, revealChildren } from "@/lib/gsap";
import { partners } from "@/lib/copy";
import Button from "@/components/ui/Button";

/**
 * Text-badge marquee — the page's only marquee. Real partner logos swap in
 * (grayscale) as they're confirmed; empty logo slots are never shown.
 */
export default function Partners() {
  const ref = useSectionAnimation<HTMLElement>((el) => revealChildren(el));

  const Badges = ({ hidden = false }: { hidden?: boolean }) => (
    <div className="marquee-track" aria-hidden={hidden || undefined}>
      {partners.badges.map((b) => (
        <span
          key={b}
          className="whitespace-nowrap border border-rule px-6 py-3 text-eyebrow uppercase text-ash"
        >
          {b}
        </span>
      ))}
    </div>
  );

  return (
    <section ref={ref} className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-site px-6 py-32 md:px-10 md:py-40">
        <h2 className="gsap-reveal max-w-3xl font-display text-display-lg text-ink">
          {partners.headline}
        </h2>
      </div>
      <div className="marquee gsap-reveal pb-20">
        <Badges />
        <Badges hidden />
      </div>
      <div className="mx-auto max-w-site px-6 pb-32 md:px-10">
        <Button href="/partner">{partners.cta}</Button>
      </div>
    </section>
  );
}

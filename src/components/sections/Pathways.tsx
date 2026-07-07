"use client";

import Link from "next/link";
import Image from "next/image";
import { useSectionAnimation, revealChildren } from "@/lib/gsap";

/**
 * Photo-led navigation: the homepage's visual heart after the copy beats.
 * Three documentary panels, each a door into a full page. Grayscale per
 * brand; hover lifts the image a breath and draws the underline.
 */
const PATHS = [
  {
    href: "/how-it-works",
    label: "How it works",
    line: "Three branches, one path.",
    img: "/photos/conference-candid.jpg",
    alt: "A young member listening intently at MJI's 3F Conference, 2025",
  },
  {
    href: "/about",
    label: "About us",
    line: "A youth leadership movement across Nigeria.",
    img: "/photos/retreat-oreh.jpg",
    alt: "MJI members standing together at a retreat in Oreh, January 2025",
  },
  {
    href: "/get-involved",
    label: "Get involved",
    line: "There’s a place for you, whoever you are.",
    img: "/photos/eku-walk.jpg",
    alt: "Volunteers walking through Eku with relief supplies, children leading the way — December 2025 outreach",
  },
];

export default function Pathways() {
  const ref = useSectionAnimation<HTMLElement>((el) =>
    revealChildren(el, { stagger: 0.12 })
  );

  return (
    <section ref={ref} className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-32 md:px-10 md:py-44">
        <p className="gsap-reveal text-eyebrow uppercase text-muted">
          Discover Purpose · Develop Capacity · Transform Society
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
          {PATHS.map((p) => (
            <Link key={p.href} href={p.href} className="gsap-reveal group block">
              <div className="relative aspect-[4/5] overflow-hidden border border-rule">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover grayscale transition-transform duration-700 ease-out3 group-hover:scale-[1.04]"
                />
              </div>
              <h2 className="mt-6 font-display text-display-md text-ink">
                <span className="draw-link">{p.label}</span>{" "}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-out3 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </h2>
              <p className="mt-2 text-sm text-muted">{p.line}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

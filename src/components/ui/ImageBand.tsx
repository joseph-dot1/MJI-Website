"use client";

import Image from "next/image";
import { gsap, useSectionAnimation } from "@/lib/gsap";

/**
 * Full-bleed documentary band: edge-to-edge grayscale photo with a slow
 * internal drift scrubbed to scroll (the image is oversized and pans a few
 * percent — depth without scroll-jacking). Use at most once per page.
 */
export default function ImageBand({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useSectionAnimation<HTMLDivElement>((el) => {
    gsap.fromTo(
      el.querySelector("img"),
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  return (
    <div ref={ref} className="relative h-[42vh] overflow-hidden md:h-[64vh]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="scale-[1.14] object-cover grayscale"
      />
    </div>
  );
}

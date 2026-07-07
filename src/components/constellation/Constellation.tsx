"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { detectTier, type ConstellationTier } from "@/lib/capabilities";

const ConstellationGL = dynamic(() => import("./ConstellationGL"), {
  ssr: false,
});
const Constellation2D = dynamic(() => import("./Constellation2D"), {
  ssr: false,
});

/**
 * Tier-selecting wrapper. The static SVG renders immediately (never a blank
 * hole); after idle, the right canvas tier loads and cross-fades over it.
 * Render loops only run while the wrapper is near the viewport.
 */
export default function Constellation({
  progressRef,
  inverted = false,
  className = "",
}: {
  progressRef: MutableRefObject<number>;
  inverted?: boolean;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<ConstellationTier>("svg");
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setNear(true); // load once, never unload
      },
      { rootMargin: "300px" }
    );
    io.observe(host);

    // Tier detection deferred to idle — never competes with LCP.
    const hasIdle = "requestIdleCallback" in window;
    const handle = hasIdle
      ? window.requestIdleCallback(() => setTier(detectTier()))
      : window.setTimeout(() => setTier(detectTier()), 1500);

    return () => {
      io.disconnect();
      if (hasIdle) window.cancelIdleCallback(handle as number);
      else window.clearTimeout(handle as number);
    };
  }, []);

  const canvasReady = near && tier !== "svg";

  // Callers must pass a position class (absolute/relative) — the fill Image
  // and canvas layers anchor to this element.
  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      <Image
        src="/constellation.svg"
        alt=""
        fill
        priority={!inverted}
        unoptimized
        className={`object-contain transition-opacity duration-700 ${
          inverted ? "invert" : ""
        } ${canvasReady ? "opacity-0" : "opacity-100"}`}
      />
      {canvasReady && (
        <div className="absolute inset-0 animate-[fadein_0.7s_ease-out]">
          {tier === "gl" ? (
            <ConstellationGL
              progressRef={progressRef}
              inverted={inverted}
              active={visible}
            />
          ) : (
            <Constellation2D
              progressRef={progressRef}
              inverted={inverted}
              active={visible}
            />
          )}
        </div>
      )}
    </div>
  );
}

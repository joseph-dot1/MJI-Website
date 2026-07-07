"use client";

import { useEffect, useRef } from "react";
import { buildConstellation } from "./points";
import type { ConstellationProps } from "./ConstellationGL";

/**
 * Mobile tier: plain 2D canvas, ~2k points, zero three.js bytes.
 * Same point data and progress model as the GL tier; capped at 30fps —
 * ambient motion doesn't need more, batteries do.
 */
export default function Constellation2D({
  progressRef,
  inverted,
  active = true,
}: ConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data = buildConstellation(3);
    const color = inverted ? "255,255,255" : "0,0,0";
    let raf = 0;
    let last = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!activeRef.current) return;
      if (t - last < 33) return; // ~30fps cap
      last = t;

      const p = progressRef.current;
      const time = t / 1000;
      const half = w / 2;
      const scale = half / 1.12; // map x ∈ ±1 fits with margin
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const { positions, scatter, sizes, phases, count, nodeStart } = data;
      const fade = 1 - p * 0.92;
      const px = Math.max(1.1, w / 380);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3] + (scatter[i3] - positions[i3]) * p;
        const y = positions[i3 + 1] + (scatter[i3 + 1] - positions[i3 + 1]) * p;
        const sx = half + x * scale;
        const sy = cy - y * scale;
        if (sy > h + 10 || sy < -10 || sx < -10 || sx > w + 10) continue;

        if (i >= nodeStart) {
          const pulse = 0.65 + 0.35 * Math.sin(time * 1.4 + phases[i]);
          ctx.fillStyle = `rgba(${color},${(0.25 * pulse * fade).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, px * 4.2 * pulse + px * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${color},${(0.95 * fade).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, px * 1.9, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${color},${(0.6 * sizes[i] * fade * 0.8).toFixed(3)})`;
          ctx.fillRect(sx, sy, px, px);
        }
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [inverted, progressRef]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    />
  );
}

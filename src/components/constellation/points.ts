import data from "./nigeria-points.json";

export interface ConstellationData {
  count: number;
  nodeStart: number; // index where the 5 chapter nodes begin
  aspect: number;
  positions: Float32Array; // xyz, formed map (slight z jitter for GL parallax)
  scatter: Float32Array; // xyz, dispersed state
  sizes: Float32Array;
  phases: Float32Array; // node pulse phase offsets
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Builds constellation buffers. `step` subsamples the 6k base cloud
 * (1 = all points for desktop GL, 3 ≈ 2k for the mobile 2D canvas).
 * Deterministic — GL and 2D tiers produce the same field.
 */
export function buildConstellation(step = 1): ConstellationData {
  const raw = data.points as number[];
  const nodes = data.nodes as { name: string; x: number; y: number }[];
  const base: number[] = [];
  for (let i = 0; i < raw.length; i += 2 * step) {
    base.push(raw[i], raw[i + 1]);
  }
  const nBase = base.length / 2;
  const count = nBase + nodes.length;

  const positions = new Float32Array(count * 3);
  const scatter = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const rng = mulberry32(97);

  for (let i = 0; i < nBase; i++) {
    const x = base[i * 2];
    const y = base[i * 2 + 1];
    const z = (rng() - 0.5) * 0.3;
    positions.set([x, y, z], i * 3);
    // Dispersal: outward from center with a downward flow — the movement
    // leaving the map and running into the page.
    scatter.set(
      [
        x * (2.2 + rng() * 1.6) + (rng() - 0.5) * 0.8,
        y * 1.6 - 1.2 - rng() * 1.8,
        z * 4,
      ],
      i * 3
    );
    sizes[i] = 1 + rng() * 0.6;
    phases[i] = rng() * Math.PI * 2;
  }

  nodes.forEach((n, j) => {
    const i = nBase + j;
    positions.set([n.x, n.y, 0.05], i * 3);
    scatter.set([n.x * 2.4, n.y * 1.6 - 1.6, 0.2], i * 3);
    sizes[i] = 4.2;
    phases[i] = (j / nodes.length) * Math.PI * 2;
  });

  return {
    count,
    nodeStart: nBase,
    aspect: data.aspect as number,
    positions,
    scatter,
    sizes,
    phases,
  };
}

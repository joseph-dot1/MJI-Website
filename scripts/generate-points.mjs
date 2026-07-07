/**
 * Build-time generator: samples the Nigeria polygon into a blue-noise point
 * cloud and emits (1) a compact JSON consumed by the WebGL/2D constellations
 * and (2) a static SVG fallback for reduced-motion / no-JS.
 *
 * Run: node scripts/generate-points.mjs path/to/NGA.geo.json
 * Output is committed — the build never fetches geo data at runtime.
 */
import fs from "node:fs";
import path from "node:path";

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/generate-points.mjs <NGA.geo.json>");
  process.exit(1);
}

const geo = JSON.parse(fs.readFileSync(src, "utf8"));
const ring = geo.features[0].geometry.coordinates[0]; // [lon, lat][]

// MJI chapters: [lon, lat]
const CHAPTERS = [
  { name: "PTI Warri", lon: 5.79, lat: 5.55 },
  { name: "DELSU Abraka", lon: 6.1, lat: 5.79 },
  { name: "DELSU Oleh", lon: 6.2, lat: 5.47 },
  { name: "Abeokuta", lon: 3.35, lat: 7.15 },
  { name: "Lagos", lon: 3.39, lat: 6.45 },
];

// Equirectangular projection with latitude correction, normalized to fit
// x ∈ [-1, 1] preserving aspect.
const lons = ring.map((p) => p[0]);
const lats = ring.map((p) => p[1]);
const minLon = Math.min(...lons), maxLon = Math.max(...lons);
const minLat = Math.min(...lats), maxLat = Math.max(...lats);
const midLat = ((minLat + maxLat) / 2) * (Math.PI / 180);
const kx = Math.cos(midLat);
const w = (maxLon - minLon) * kx;
const h = maxLat - minLat;
const scale = 2 / w;

function project(lon, lat) {
  const x = ((lon - minLon) * kx - w / 2) * scale;
  const y = (lat - (minLat + maxLat) / 2) * scale;
  return [x, y];
}

const poly = ring.map(([lon, lat]) => project(lon, lat));
const aspect = (h * scale) / 2; // y ∈ [-aspect, aspect]

function inside(x, y) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      hit = !hit;
    }
  }
  return hit;
}

// Dart-throwing blue noise with a spatial hash; shrink radius until target met.
const TARGET = 6000;
let r = 0.019;
let pts = [];
let rng = mulberry32(20260706);

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

while (true) {
  pts = [];
  rng = mulberry32(20260706);
  const cell = r / Math.SQRT2;
  const grid = new Map();
  const key = (x, y) => `${Math.floor(x / cell)},${Math.floor(y / cell)}`;
  let misses = 0;
  while (pts.length < TARGET && misses < 400000) {
    const x = (rng() * 2 - 1) * 1.02;
    const y = (rng() * 2 - 1) * (aspect + 0.02);
    if (!inside(x, y)) { misses++; continue; }
    const gx = Math.floor(x / cell), gy = Math.floor(y / cell);
    let ok = true;
    for (let dx = -2; dx <= 2 && ok; dx++) {
      for (let dy = -2; dy <= 2 && ok; dy++) {
        const c = grid.get(`${gx + dx},${gy + dy}`);
        if (c) {
          for (const [px, py] of c) {
            if ((px - x) ** 2 + (py - y) ** 2 < r * r) { ok = false; break; }
          }
        }
      }
    }
    if (!ok) { misses++; continue; }
    pts.push([x, y]);
    const k = key(x, y);
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push([x, y]);
  }
  if (pts.length >= TARGET) break;
  r *= 0.92;
  if (r < 0.005) break; // safety
}

const nodes = CHAPTERS.map((c) => {
  const [x, y] = project(c.lon, c.lat);
  return { name: c.name, x: +x.toFixed(4), y: +y.toFixed(4) };
});

const round = (n) => +n.toFixed(3);
const flat = [];
for (const [x, y] of pts) flat.push(round(x), round(y));

const outDir = path.join(process.cwd(), "src/components/constellation");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "nigeria-points.json"),
  JSON.stringify({ aspect: +aspect.toFixed(4), points: flat, nodes })
);

// Static SVG fallback — subsampled, black on transparent.
const VB = 1000;
const vbH = Math.round(VB * aspect);
const sx = (x) => Math.round(((x + 1) / 2) * VB);
const sy = (y) => Math.round(((aspect - y) / (2 * aspect)) * vbH * 2) / 2;
let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB} ${vbH * 2}" fill="black" role="img" aria-label="A constellation of dots forming the map of Nigeria, with five brighter points marking MJI chapters">`;
for (let i = 0; i < pts.length; i += 5) {
  svg += `<circle cx="${sx(pts[i][0])}" cy="${sy(pts[i][1])}" r="1.6" opacity="0.55"/>`;
}
for (const n of nodes) {
  svg += `<circle cx="${sx(n.x)}" cy="${sy(n.y)}" r="9"/><circle cx="${sx(n.x)}" cy="${sy(n.y)}" r="18" opacity="0.15"/>`;
}
svg += "</svg>";
fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/constellation.svg", svg);

console.log(
  `points=${pts.length} r=${r.toFixed(4)} aspect=${aspect.toFixed(3)} json=${(
    fs.statSync(path.join(outDir, "nigeria-points.json")).size / 1024
  ).toFixed(1)}KB svg=${(fs.statSync("public/constellation.svg").size / 1024).toFixed(1)}KB`
);

/**
 * Photo pipeline: photos-src/ originals → public/photos/ web assets.
 * - per-photo crop map removes baked-in event overlay graphics
 * - auto-rotates from EXIF, then strips ALL metadata (phone photos embed
 *   GPS coordinates — those must never ship)
 * - resizes to max 1920px long edge, mozjpeg q78
 * B&W treatment stays in CSS (grayscale filter) so originals keep color.
 *
 * Run: node scripts/prep-photos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = "public/photos";
fs.mkdirSync(OUT, { recursive: true });

// crop = fraction of the image to REMOVE from each edge before resizing.
const PHOTOS = [
  // 3F Conference 2025 — photographer originals; crops clear the overlay
  // graphics (logo top-right, badges bottom corners).
  { src: "3F CONFRENCE WEBSITE/BW6A1118.jpg", out: "conference-speaker", crop: { top: 0.11, bottom: 0.24 } },
  { src: "3F CONFRENCE WEBSITE/BW6A1225.jpg", out: "conference-otuya", crop: { top: 0.14, bottom: 0.24 } },
  { src: "3F CONFRENCE WEBSITE/BW6A1259.jpg", out: "conference-audience", crop: { top: 0.14, bottom: 0.24 } },
  { src: "3F CONFRENCE WEBSITE/BW6A1186.jpg", out: "conference-audience2", crop: { top: 0.14, bottom: 0.24 } },
  { src: "3F CONFRENCE WEBSITE/BW6A1191.jpg", out: "conference-books", crop: { top: 0.16, bottom: 0.24 } },
  { src: "3F CONFRENCE WEBSITE/BW6A1234.jpg", out: "conference-stage", crop: { top: 0.14, bottom: 0.24 } },
  { src: "3F CONFRENCE WEBSITE/BW6A1276.jpg", out: "conference-candid", crop: { top: 0.14, bottom: 0.24 } },
  // Eku outreach, Dec 2025
  { src: "eku outreach pictures web/IMG-20251227-WA0051.jpg", out: "eku-team" },
  { src: "eku outreach pictures web/IMG_20251231_013507_397.jpg", out: "eku-elder" },
  { src: "eku outreach pictures web/IMG_20251231_013507_778.jpg", out: "eku-doorstep" },
  { src: "eku outreach pictures web/IMG_20251231_013507_852.jpg", out: "eku-rice" },
  { src: "eku outreach pictures web/IMG_20251231_013508_342.jpg", out: "eku-walk" },
  // Members' retreat, Oreh, Jan 2025
  { src: "retreat picture at oreh/IMG_20250119_112541.jpg", out: "retreat-oreh" },
  // Book Club hangout, Jul 2025
  { src: "bookclub hangout 2025/IMG-20250721-WA0024.jpg", out: "hangout-gazebo" },
  { src: "bookclub hangout 2025/IMG-20250720-WA0084.jpg", out: "hangout-paintball" },
];

for (const p of PHOTOS) {
  const srcPath = path.join("photos-src", p.src);
  if (!fs.existsSync(srcPath)) {
    console.warn(`missing: ${srcPath}`);
    continue;
  }
  let img = sharp(srcPath).rotate();
  const meta = await img.metadata();
  // EXIF rotation may swap width/height at output; metadata() reflects the
  // stored orientation, so compute post-rotation dimensions.
  const rotated = (meta.orientation ?? 1) >= 5;
  const W = rotated ? meta.height : meta.width;
  const H = rotated ? meta.width : meta.height;
  if (p.crop) {
    const left = Math.round(W * (p.crop.left ?? 0));
    const top = Math.round(H * (p.crop.top ?? 0));
    img = img.extract({
      left,
      top,
      width: Math.round(W * (1 - (p.crop.left ?? 0) - (p.crop.right ?? 0))),
      height: Math.round(H * (1 - (p.crop.top ?? 0) - (p.crop.bottom ?? 0))),
    });
  }
  const outPath = path.join(OUT, `${p.out}.jpg`);
  const info = await img
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(outPath);
  console.log(`${p.out}.jpg ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
}

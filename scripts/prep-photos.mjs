/**
 * Photo preprocessing: reads originals from photos-src/, writes optimized
 * web copies to public/photos/.
 * - resizes to max 1920px on the long edge
 * - auto-rotates from EXIF, then STRIPS all metadata (phone photos embed
 *   GPS coordinates — those must never ship)
 * - quality 78 mozjpeg
 * B&W treatment stays in CSS (grayscale filter) so originals keep color.
 *
 * Run: node scripts/prep-photos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "photos-src";
const OUT = "public/photos";

if (!fs.existsSync(SRC)) {
  console.error(`No ${SRC}/ directory — put original photos there first.`);
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

const files = fs
  .readdirSync(SRC)
  .filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f));

for (const f of files) {
  const name = path.parse(f).name.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const out = path.join(OUT, `${name}.jpg`);
  const img = sharp(path.join(SRC, f)).rotate(); // apply EXIF orientation
  const meta = await img.metadata();
  await img
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out); // sharp strips metadata unless .withMetadata() is called
  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`${f} → ${out} (${meta.width}x${meta.height} → ${kb}KB)`);
}
console.log(`\n${files.length} photo(s) processed.`);

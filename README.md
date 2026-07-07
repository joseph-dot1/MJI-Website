# My Journey Inc. — myjourneyinc.org

Marketing site for My Journey Inc. (MJI), a Nigerian non-profit youth
leadership organization. Black & white editorial design system; copy is the
approved final from `MJI_Landing_Page_Copy_FINAL.md` and lives verbatim in
`src/lib/copy.ts`.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (token system in `tailwind.config.ts` + `src/app/globals.css`)
- GSAP + ScrollTrigger (scroll choreography), Lenis (desktop smooth scroll)
- React Three Fiber + three.js (desktop hero constellation only — never in
  the critical path, never shipped to mobile)

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## The constellation

A monochrome point-cloud of Nigeria (6,000 blue-noise samples, 5 chapter
nodes) rendered in three tiers, chosen at runtime by device capability:

1. **WebGL (R3F)** — desktop, fine pointer: shader points, mouse parallax,
   scroll-driven dispersal.
2. **2D canvas** — touch/small screens: same data subsampled to ~2k points,
   zero three.js bytes.
3. **Static SVG** — reduced motion, save-data, no JS, no WebGL.

Point data is generated at build time (committed, no runtime geo fetch):

```bash
node scripts/generate-points.mjs path/to/NGA.geo.json
# emits src/components/constellation/nigeria-points.json + public/constellation.svg
```

## Before launch (placeholders in the build)

1. Three real testimonials (one per branch) — replace the dashed
   "AWAITING REAL CONTENT" blocks in `src/components/sections/SocialProof.tsx`.
2. Real partner logos (grayscale) in the Partners marquee once confirmed.
3. Wire the registration form (`src/app/register/RegisterForm.tsx`) to a
   backend/form service — submit is a marked TODO.
4. Real social profile URLs in `src/components/layout/Footer.tsx`.
5. Real member/outreach photography (black & white treatment) as it becomes
   available.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo. Framework preset
   "Next.js" is auto-detected — no custom settings needed.
3. Add the `myjourneyinc.org` domain under **Project → Settings → Domains**
   and point the registrar's DNS (A → `76.76.21.21` or CNAME →
   `cname.vercel-dns.com`).
4. Every push to the production branch deploys automatically; PRs get
   preview URLs.

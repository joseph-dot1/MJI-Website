import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Pathways from "@/components/sections/Pathways";
import FinalCta from "@/components/sections/FinalCta";

/**
 * The homepage is a short, visual conversion page: the constellation hero,
 * the problem inversion, three photo-led doors into the site, and the
 * closing CTA. The full sections live on /how-it-works, /about, and
 * /get-involved.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Problem />
      <Pathways />
      <FinalCta />
    </main>
  );
}

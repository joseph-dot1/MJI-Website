import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import WhoItsFor from "@/components/sections/WhoItsFor";
import Values from "@/components/sections/Values";
import SocialProof from "@/components/sections/SocialProof";
import FinalCta from "@/components/sections/FinalCta";
import { hero } from "@/lib/copy";

export const metadata: Metadata = {
  title: "About — My Journey Inc.",
  description:
    "My Journey Inc. raises young people who think clearly, lead responsibly, and grow spiritually. Discover Purpose. Develop Capacity. Transform Society.",
};

export default function AboutPage() {
  return (
    <main id="main" className="bg-paper">
      <PageIntro
        eyebrow={hero.eyebrow}
        title="About My Journey Inc."
        sub={hero.sub}
      />
      <WhoItsFor />
      <Values />
      <SocialProof />
      <FinalCta />
    </main>
  );
}

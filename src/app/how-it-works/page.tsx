import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import Branches from "@/components/sections/Branches";
import OutcomesStrip from "@/components/sections/OutcomesStrip";
import HowToJoin from "@/components/sections/HowToJoin";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "How It Works — My Journey Inc.",
  description:
    "Every MJI member grows through three branches — Book Club, Discipleship, and Outreach. Five steps from curious to committed.",
};

export default function HowItWorksPage() {
  return (
    <main id="main" className="bg-paper">
      <PageIntro eyebrow="Three Branches, One Path" title="How it works." />
      <Branches />
      <OutcomesStrip />
      <HowToJoin />
      <Faq />
      <FinalCta />
    </main>
  );
}

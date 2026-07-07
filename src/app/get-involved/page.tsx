import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import Involvement from "@/components/sections/Involvement";
import Partners from "@/components/sections/Partners";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Get Involved — My Journey Inc.",
  description:
    "Become a member, volunteer, partner, or donor. There's a place for you, whoever you are.",
};

export default function GetInvolvedPage() {
  return (
    <main id="main" className="bg-paper">
      <PageIntro eyebrow="Ways to Get Involved" title="Get involved." />
      <Involvement />
      <Partners />
      <FinalCta />
    </main>
  );
}

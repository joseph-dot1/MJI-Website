import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Branches from "@/components/sections/Branches";
import OutcomesStrip from "@/components/sections/OutcomesStrip";
import HowToJoin from "@/components/sections/HowToJoin";
import Values from "@/components/sections/Values";
import WhoItsFor from "@/components/sections/WhoItsFor";
import SocialProof from "@/components/sections/SocialProof";
import Partners from "@/components/sections/Partners";
import Involvement from "@/components/sections/Involvement";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Problem />
      <Branches />
      <OutcomesStrip />
      <HowToJoin />
      <Values />
      <WhoItsFor />
      <SocialProof />
      <Partners />
      <Involvement />
      <Faq />
      <FinalCta />
    </main>
  );
}

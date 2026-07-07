import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import Photo from "@/components/ui/Photo";
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
      <div className="mx-auto max-w-site px-6 pt-8 md:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-10">
          <Photo
            src="/photos/eku-doorstep.jpg"
            alt="Volunteers kneeling at a doorstep to unpack supplies for an elderly resident, Eku outreach"
            caption="Door to door · Eku outreach, December 2025"
            aspect="aspect-[3/4]"
            sizes="(min-width: 640px) 45vw, 100vw"
            priority
          />
          <Photo
            src="/photos/eku-rice.jpg"
            alt="Volunteers loading a sack of rice onto a motorcycle during the Eku outreach"
            caption="Supplies moving out · Eku outreach, December 2025"
            aspect="aspect-[3/4]"
            sizes="(min-width: 640px) 45vw, 100vw"
            priority
          />
        </div>
        <Photo
          src="/photos/eku-team.jpg"
          alt="The MJI outreach team with children of Eku village after the December 2025 outreach"
          caption="The outreach team with children of Eku · December 2025"
          width={1920}
          height={1080}
          sizes="(min-width: 1400px) 1320px, 100vw"
          className="mt-6 lg:mt-10"
        />
      </div>
      <Involvement />
      <Partners />
      <FinalCta />
    </main>
  );
}

import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import Photo from "@/components/ui/Photo";
import ImageBand from "@/components/ui/ImageBand";
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
      <div className="mx-auto max-w-site px-6 pt-8 md:px-10">
        <Photo
          src="/photos/conference-stage.jpg"
          alt="Members on stage during MJI's 3F Conference — Final, Fatal, Failure — 2025"
          width={1920}
          height={794}
          sizes="(min-width: 1400px) 1320px, 100vw"
          priority
        />
      </div>
      <WhoItsFor />
      <ImageBand
        src="/photos/conference-audience2.jpg"
        alt="Young people listening during a session at MJI's 3F Conference, 2025"
      />
      <Values />
      <div className="mx-auto grid max-w-site gap-6 px-6 pb-32 md:grid-cols-2 md:px-10 lg:gap-10">
        <Photo
          src="/photos/retreat-oreh.jpg"
          alt="MJI members standing together at a retreat in Oreh, January 2025"
          aspect="aspect-[4/3]"
          sizes="(min-width: 768px) 45vw, 100vw"
        />
        <Photo
          src="/photos/hangout-paintball.jpg"
          alt="Book Club members in paintball gear during a hangout, July 2025"
          aspect="aspect-[4/3]"
          sizes="(min-width: 768px) 45vw, 100vw"
        />
      </div>
      <SocialProof />
      <FinalCta />
    </main>
  );
}

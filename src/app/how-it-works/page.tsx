import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import Photo from "@/components/ui/Photo";
import Branches from "@/components/sections/Branches";
import OutcomesStrip from "@/components/sections/OutcomesStrip";
import HowToJoin from "@/components/sections/HowToJoin";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "How It Works · My Journey Inc.",
  description:
    "Every MJI member grows through three branches: Book Club, Discipleship, and Outreach. Five steps from curious to committed.",
};

export default function HowItWorksPage() {
  return (
    <main id="main" className="bg-paper">
      <PageIntro eyebrow="Three Branches, One Path" title="How it works." />
      <div className="mx-auto grid max-w-site gap-6 px-6 pt-8 md:grid-cols-3 md:px-10">
        <Photo
          src="/photos/conference-books.jpg"
          alt="Stacks of leadership and personal development books on the Book Club table at the 3F Conference"
          aspect="aspect-[4/3]"
          sizes="(min-width: 768px) 30vw, 100vw"
          priority
        />
        <Photo
          src="/photos/conference-speaker.jpg"
          alt="Damilola Emmanuel, MJI President, speaking at the lectern during the 3F Conference"
          aspect="aspect-[4/3]"
          sizes="(min-width: 768px) 30vw, 100vw"
          priority
        />
        <Photo
          src="/photos/conference-audience.jpg"
          alt="Young people in the audience at the 3F Conference, one hand raised with a question"
          aspect="aspect-[4/3]"
          sizes="(min-width: 768px) 30vw, 100vw"
          priority
        />
      </div>
      <Branches />
      <OutcomesStrip />
      <HowToJoin />
      <Faq />
      <FinalCta />
    </main>
  );
}

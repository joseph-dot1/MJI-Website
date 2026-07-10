import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import Photo from "@/components/ui/Photo";
import Involvement from "@/components/sections/Involvement";
import Partners from "@/components/sections/Partners";
import FinalCta from "@/components/sections/FinalCta";
import { pullQuote } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Get Involved · My Journey Inc.",
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
            aspect="aspect-[3/4]"
            sizes="(min-width: 640px) 45vw, 100vw"
            priority
          />
          <Photo
            src="/photos/eku-rice.jpg"
            alt="Volunteers loading a sack of rice onto a motorcycle during the Eku outreach"
            aspect="aspect-[3/4]"
            sizes="(min-width: 640px) 45vw, 100vw"
            priority
          />
        </div>
        <Photo
          src="/photos/eku-team.jpg"
          alt="The MJI outreach team with children of Eku village after the December 2025 outreach"
          width={1920}
          height={1080}
          sizes="(min-width: 1400px) 1320px, 100vw"
          className="mt-6 lg:mt-10"
        />
      </div>
      <Involvement />
      {/* Single pull-quote — a member testimony, used only here. */}
      <section data-theme="dark" className="bg-bg">
        <figure className="relative mx-auto max-w-4xl px-6 py-28 md:px-10 md:py-36">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-12 select-none font-display text-[9rem] leading-none text-ghost md:left-6"
          >
            “
          </span>
          <blockquote className="relative font-display text-display-md italic leading-snug text-fg">
            {pullQuote.quote}
          </blockquote>
          <figcaption className="mt-8 text-label uppercase tracking-[0.14em] text-muted">
            {pullQuote.name} · {pullQuote.role}, {pullQuote.date}
          </figcaption>
        </figure>
      </section>
      <Partners />
      <FinalCta />
    </main>
  );
}

"use client";

import { gsap, useSectionAnimation, revealChildren } from "@/lib/gsap";
import { socialProof } from "@/lib/copy";
import CountUp from "@/components/ui/CountUp";
import Placeholder from "@/components/ui/Placeholder";
import Photo from "@/components/ui/Photo";

function FieldNote() {
  const words = socialProof.fieldNote.split(" ");
  const ref = useSectionAnimation<HTMLDivElement>((el) => {
    // The emotional beat: words surface slowly out of near-invisibility.
    // Opacity only — no transforms, no letter-spacing reflow.
    // immediateRender:false — words stay fully visible until the reveal
    // actually starts (also keeps the audit-time contrast at full value).
    gsap.fromTo(
      el.querySelectorAll("[data-word]"),
      { opacity: 0.12 },
      {
        opacity: 1,
        duration: 0.5,
        ease: "none",
        stagger: 0.04,
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      }
    );
  });

  return (
    <div
      ref={ref}
      className="grid items-center gap-12 py-24 md:py-32 lg:grid-cols-[1.3fr,1fr] lg:gap-20"
    >
      <div>
        <p className="sr-only">{socialProof.fieldNote}</p>
        <p
          aria-hidden="true"
          className="font-display text-display-md italic leading-snug text-fg"
        >
          {words.map((w, i) => (
            <span key={i} data-word>
              {w}{" "}
            </span>
          ))}
        </p>
        <p className="mt-8 text-eyebrow uppercase text-muted">
          Field note — Igun Village, 2025 outreach report
        </p>
      </div>
      <Photo
        src="/photos/eku-elder.jpg"
        alt="A volunteer kneels beside an elderly woman in her home during the Eku outreach, December 2025"
        caption="Presence, not just provisions · Eku, December 2025"
        width={720}
        height={1280}
        sizes="(min-width: 1024px) 30vw, 80vw"
        className="mx-auto w-full max-w-sm"
      />
    </div>
  );
}

export default function SocialProof() {
  const ref = useSectionAnimation<HTMLElement>((el) => revealChildren(el));

  return (
    <section ref={ref} data-theme="dark" className="bg-bg text-body">
      <div className="mx-auto max-w-site px-6 py-32 md:px-10 md:py-48">
        <p className="gsap-reveal text-eyebrow uppercase text-muted">
          {socialProof.eyebrow}
        </p>

        {/* Impact bar: numbers huge, labels tiny. */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {socialProof.stats.map((s) => (
            <div key={s.label} className="gsap-reveal">
              <dd className="font-display text-display-stat text-fg">
                <CountUp value={s.value} suffix={s.suffix} countUp={s.countUp} />
              </dd>
              <dt className="mt-3 max-w-[20ch] text-label uppercase tracking-[0.14em] text-muted">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>

        <p className="gsap-reveal mt-12 max-w-measure text-xs leading-relaxed text-muted">
          {socialProof.verification}
        </p>
        <p className="gsap-reveal mt-4 max-w-measure text-sm text-body">
          {socialProof.accountability}
        </p>
        <p className="gsap-reveal mt-12 border-t border-rule pt-8 text-eyebrow uppercase leading-loose text-muted">
          {socialProof.chapters}
        </p>

        <FieldNote />

        {/* Testimonials: structure only — real quotes collected before launch. */}
        <div className="grid gap-6 lg:grid-cols-3">
          {socialProof.testimonialPlaceholders.map((t) => (
            <Placeholder key={t} className="gsap-reveal">
              <blockquote className="font-display text-lg italic text-muted">
                “1–2 sentences, specific outcome, not generic praise.”
              </blockquote>
              <p className="mt-6 text-label uppercase tracking-[0.14em] text-muted">
                — Full Name, Member, [Chapter] Chapter
              </p>
              <p className="mt-2 text-xs text-muted">{t}</p>
            </Placeholder>
          ))}
        </div>
      </div>
    </section>
  );
}

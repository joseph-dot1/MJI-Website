/**
 * Compact page hero for subpages — eyebrow + display h1 (+ optional sub).
 * Sections below carry their own h2s.
 */
export default function PageIntro({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <header className="mx-auto max-w-site px-6 pb-8 pt-40 md:px-10">
      <p className="text-eyebrow uppercase text-muted">{eyebrow}</p>
      <h1 className="mt-6 max-w-4xl font-display text-display-lg text-ink">
        {title}
      </h1>
      {sub && (
        <p className="mt-6 max-w-measure text-body-lg text-ash">{sub}</p>
      )}
    </header>
  );
}

import Link from "next/link";

const SOCIALS = [
  // TODO: real profile URLs before launch — per copy system notes, social
  // icons link out; follower counts are never published on the page.
  { name: "Instagram", href: "#" },
  { name: "X (Twitter)", href: "#" },
  { name: "WhatsApp", href: "#" },
  { name: "Telegram", href: "#" },
];

export default function Footer() {
  return (
    <footer data-theme="dark" className="bg-bg text-body">
      <div className="mx-auto max-w-site px-6 py-16 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-display text-2xl font-medium text-fg">
              My Journey Inc.
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted">
              Discover Purpose. Develop Capacity. Transform Society.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="draw-link text-label uppercase tracking-[0.14em] text-muted hover:text-fg"
              >
                {s.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} My Journey Inc. All rights reserved.</p>
          <p>
            <Link href="/register" className="draw-link hover:text-fg">
              Start My Journey
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

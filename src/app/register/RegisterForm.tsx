"use client";

import { useState } from "react";

const CHAPTERS = [
  "PTI Warri",
  "DELSU Abraka",
  "DELSU Oleh",
  "Abeokuta",
  "Lagos",
  "Virtual (anywhere)",
];

const BRANCHES = ["Book Club", "Discipleship Group", "Outreach"];

const inputCls =
  "w-full border border-ink/25 bg-paper px-4 py-3 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";
const labelCls = "block text-label uppercase tracking-[0.14em] text-ash";

/**
 * Form shell only — submission is not wired yet.
 * TODO: connect to the registration backend/form service before launch,
 * then remove the notice below.
 */
export default function RegisterForm() {
  const [attempted, setAttempted] = useState(false);

  return (
    <form
      className="mt-14 space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setAttempted(true);
      }}
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="first-name" className={labelCls}>
            First name
          </label>
          <input id="first-name" name="firstName" autoComplete="given-name" className={`mt-2 ${inputCls}`} placeholder="Ada" />
        </div>
        <div>
          <label htmlFor="last-name" className={labelCls}>
            Last name
          </label>
          <input id="last-name" name="lastName" autoComplete="family-name" className={`mt-2 ${inputCls}`} placeholder="Okafor" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" className={`mt-2 ${inputCls}`} placeholder="you@example.com" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone / WhatsApp
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={`mt-2 ${inputCls}`} placeholder="+234…" />
        </div>
        <div>
          <label htmlFor="age" className={labelCls}>
            Age range
          </label>
          <select id="age" name="age" className={`mt-2 ${inputCls}`} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            <option>11–19</option>
            <option>20–30</option>
            <option>Over 30 (mentor / volunteer / partner)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="chapter" className={labelCls}>
          Preferred chapter
        </label>
        <select id="chapter" name="chapter" className={`mt-2 ${inputCls}`} defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          {CHAPTERS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelCls}>Branches you’re interested in</legend>
        <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
          {BRANCHES.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-3 text-base text-ash">
              <input
                type="checkbox"
                name="branches"
                value={b}
                className="h-4 w-4 accent-black"
              />
              {b}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="pt-4">
        <button
          type="submit"
          className="btn-solid w-full border border-ink bg-ink px-8 py-4 text-label uppercase tracking-[0.14em] text-paper hover:text-ink [--btn-sweep:#fff] sm:w-auto"
        >
          Submit registration
        </button>
        <p className="mt-4 text-xs text-muted">
          Free membership. Reviewed applications receive an orientation invite.
        </p>
        {attempted && (
          <p role="alert" className="awaiting mt-6 inline-block px-4 py-3 text-sm text-ash">
            Submissions aren’t wired up yet. The registration backend is
            connected before launch. (TODO)
          </p>
        )}
      </div>
    </form>
  );
}

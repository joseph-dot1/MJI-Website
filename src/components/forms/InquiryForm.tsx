"use client";

import { useState } from "react";

const inputCls =
  "w-full border border-ink/25 bg-paper px-4 py-3 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";
const labelCls = "block text-label uppercase tracking-[0.14em] text-ash";

export type Field =
  | {
      kind: "text" | "email" | "tel";
      name: string;
      label: string;
      placeholder?: string;
      autoComplete?: string;
    }
  | { kind: "select"; name: string; label: string; options: string[] }
  | { kind: "textarea"; name: string; label: string; placeholder?: string }
  | { kind: "checkboxes"; name: string; label: string; options: string[] };

/** A row is one field, or several rendered side by side on ≥sm. */
export type Row = Field | Field[];

function FieldControl({ f }: { f: Field }) {
  const id = f.name;
  if (f.kind === "select") {
    return (
      <div>
        <label htmlFor={id} className={labelCls}>
          {f.label}
        </label>
        <select id={id} name={f.name} defaultValue="" className={`mt-2 ${inputCls}`}>
          <option value="" disabled>
            Select…
          </option>
          {f.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
    );
  }
  if (f.kind === "textarea") {
    return (
      <div>
        <label htmlFor={id} className={labelCls}>
          {f.label}
        </label>
        <textarea
          id={id}
          name={f.name}
          rows={4}
          placeholder={f.placeholder}
          className={`mt-2 resize-y ${inputCls}`}
        />
      </div>
    );
  }
  if (f.kind === "checkboxes") {
    return (
      <fieldset>
        <legend className={labelCls}>{f.label}</legend>
        <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
          {f.options.map((o) => (
            <label
              key={o}
              className="flex cursor-pointer items-center gap-3 text-base text-ash"
            >
              <input type="checkbox" name={f.name} value={o} className="h-4 w-4 accent-black" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {f.label}
      </label>
      <input
        id={id}
        name={f.name}
        type={f.kind}
        autoComplete={f.autoComplete}
        placeholder={f.placeholder}
        className={`mt-2 ${inputCls}`}
      />
    </div>
  );
}

/**
 * Config-driven form shell. Each involvement path (member, volunteer,
 * partner, donor) renders its own field set through this one component.
 * Submission is not wired yet — TODO: connect to the backend/form service
 * before launch, then remove the notice.
 */
export default function InquiryForm({
  rows,
  submitLabel,
}: {
  rows: Row[];
  submitLabel: string;
}) {
  const [attempted, setAttempted] = useState(false);

  return (
    <form
      className="mt-14 space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setAttempted(true);
      }}
    >
      {rows.map((row, i) => {
        if (Array.isArray(row)) {
          return (
            <div key={i} className="grid gap-8 sm:grid-cols-2">
              {row.map((f) => (
                <FieldControl key={f.name} f={f} />
              ))}
            </div>
          );
        }
        return <FieldControl key={row.name} f={row} />;
      })}

      <div className="pt-4">
        <button
          type="submit"
          className="btn-solid w-full border border-ink bg-ink px-8 py-4 text-label uppercase tracking-[0.14em] text-paper hover:text-ink [--btn-sweep:#fff] sm:w-auto"
        >
          {submitLabel}
        </button>
        {attempted && (
          <p role="alert" className="awaiting mt-6 inline-block px-4 py-3 text-sm text-ash">
            Submissions aren’t wired up yet. This form is connected before
            launch. (TODO)
          </p>
        )}
      </div>
    </form>
  );
}

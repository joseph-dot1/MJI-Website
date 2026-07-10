import type { Metadata } from "next";
import InquiryForm, { type Row } from "@/components/forms/InquiryForm";
import HubSpotForm from "@/components/forms/HubSpotForm";
import { HUBSPOT, hasHubSpotForm } from "@/lib/hubspot";

export const metadata: Metadata = {
  title: "Volunteer · My Journey Inc.",
  description:
    "Apply to volunteer with My Journey Inc. Serve, and be developed into a leader.",
};

const rows: Row[] = [
  [
    { kind: "text", name: "firstName", label: "First name", autoComplete: "given-name", placeholder: "Ada" },
    { kind: "text", name: "lastName", label: "Last name", autoComplete: "family-name", placeholder: "Okafor" },
  ],
  { kind: "email", name: "email", label: "Email", autoComplete: "email", placeholder: "you@example.com" },
  [
    { kind: "tel", name: "phone", label: "Phone / WhatsApp", autoComplete: "tel", placeholder: "+234…" },
    { kind: "select", name: "age", label: "Age range", options: ["11–19", "20–30", "Over 30"] },
  ],
  {
    kind: "select",
    name: "serve",
    label: "Where you’d like to serve",
    options: ["Book Club", "Discipleship Group", "Outreach", "Wherever I’m needed"],
  },
  {
    kind: "select",
    name: "availability",
    label: "Your availability",
    options: ["A few hours a week", "Weekends", "Event by event", "Flexible"],
  },
  {
    kind: "textarea",
    name: "about",
    label: "What you bring",
    placeholder: "Tell us a little about your skills and why you want to serve.",
  },
];

export default function VolunteerPage() {
  return (
    <main id="main" className="bg-paper">
      <div className="mx-auto max-w-2xl px-6 pb-32 pt-36 md:px-10">
        <p className="text-eyebrow uppercase text-muted">Volunteer</p>
        <h1 className="mt-6 font-display text-display-lg text-ink">
          Serve, and be developed.
        </h1>
        <p className="mt-6 max-w-measure text-body-lg text-ash">
          Every volunteer is developed into a leader. Applications are assessed
          on the 4 Cs: Character, Capacity, Commitment, and Consistency.
        </p>
        {hasHubSpotForm("volunteer") ? (
          <HubSpotForm formId={HUBSPOT.forms.volunteer} />
        ) : (
          <InquiryForm rows={rows} submitLabel="Apply to volunteer" />
        )}
      </div>
    </main>
  );
}

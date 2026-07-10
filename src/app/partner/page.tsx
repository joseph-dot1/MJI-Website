import type { Metadata } from "next";
import InquiryForm, { type Row } from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: "Partner With MJI · My Journey Inc.",
  description:
    "Start a partnership with My Journey Inc. For schools, universities, NGOs, churches, community organizations, government agencies, and brands.",
};

const rows: Row[] = [
  { kind: "text", name: "org", label: "Organization", placeholder: "Organization name" },
  [
    { kind: "text", name: "contact", label: "Contact person", autoComplete: "name", placeholder: "Full name" },
    { kind: "text", name: "role", label: "Your role", placeholder: "e.g. Coordinator" },
  ],
  [
    { kind: "email", name: "email", label: "Email", autoComplete: "email", placeholder: "you@organization.org" },
    { kind: "tel", name: "phone", label: "Phone", autoComplete: "tel", placeholder: "+234…" },
  ],
  {
    kind: "select",
    name: "type",
    label: "Organization type",
    options: [
      "School",
      "University",
      "NGO",
      "Church",
      "Community Organization",
      "Government Agency",
      "Corporate / Brand",
    ],
  },
  {
    kind: "textarea",
    name: "message",
    label: "How you’d like to partner",
    placeholder: "Tell us about your organization and what a partnership could look like.",
  },
];

export default function PartnerPage() {
  return (
    <main id="main" className="bg-paper">
      <div className="mx-auto max-w-2xl px-6 pb-32 pt-36 md:px-10">
        <p className="text-eyebrow uppercase text-muted">Partner With MJI</p>
        <h1 className="mt-6 font-display text-display-lg text-ink">
          Start a partnership.
        </h1>
        <p className="mt-6 max-w-measure text-body-lg text-ash">
          MJI works with institutions shaping young Nigerians. Tell us about
          your organization and we’ll be in touch.
        </p>
        <InquiryForm rows={rows} submitLabel="Start a partnership" />
      </div>
    </main>
  );
}

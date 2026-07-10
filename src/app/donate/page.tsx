import type { Metadata } from "next";
import InquiryForm, { type Row } from "@/components/forms/InquiryForm";
import HubSpotForm from "@/components/forms/HubSpotForm";
import { HUBSPOT, hasHubSpotForm } from "@/lib/hubspot";
import { socialProof } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Give Toward Impact · My Journey Inc.",
  description:
    "Support My Journey Inc. Every outreach publishes a full financial report, documented down to the receipt.",
};

const rows: Row[] = [
  [
    { kind: "text", name: "name", label: "Name", autoComplete: "name", placeholder: "Full name" },
    { kind: "email", name: "email", label: "Email", autoComplete: "email", placeholder: "you@example.com" },
  ],
  [
    { kind: "select", name: "amount", label: "Amount (₦)", options: ["5,000", "10,000", "25,000", "50,000", "Other"] },
    { kind: "select", name: "frequency", label: "Frequency", options: ["One-time", "Monthly", "Per outreach"] },
  ],
  {
    kind: "textarea",
    name: "message",
    label: "Anything you’d like us to know (optional)",
    placeholder: "Designate your gift, or leave a note.",
  },
];

export default function DonatePage() {
  return (
    <main id="main" className="bg-paper">
      <div className="mx-auto max-w-2xl px-6 pb-32 pt-36 md:px-10">
        <p className="text-eyebrow uppercase text-muted">Support as a Donor</p>
        <h1 className="mt-6 font-display text-display-lg text-ink">
          Give toward impact.
        </h1>
        <p className="mt-6 max-w-measure text-body-lg text-ash">
          Anyone who believes in the mission can give. {socialProof.accountability}
        </p>
        {hasHubSpotForm("donate") ? (
          <HubSpotForm formId={HUBSPOT.forms.donate} />
        ) : (
          <InquiryForm rows={rows} submitLabel="Give toward impact" />
        )}
        <p className="mt-8 text-xs text-muted">
          Secure payment is connected before launch. In the meantime, submitting
          lets us reach out with giving details. (TODO)
        </p>
      </div>
    </main>
  );
}

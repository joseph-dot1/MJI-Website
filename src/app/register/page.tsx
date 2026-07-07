import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Start My Journey — My Journey Inc.",
  description:
    "Register to join My Journey Inc. — free membership, five steps from curious to committed.",
};

export default function RegisterPage() {
  return (
    <main id="main" className="bg-paper">
      <div className="mx-auto max-w-2xl px-6 pb-32 pt-36 md:px-10">
        <p className="text-eyebrow uppercase text-muted">
          Step 1 of 5 — Register
        </p>
        <h1 className="mt-6 font-display text-display-lg text-ink">
          Start your journey.
        </h1>
        <p className="mt-6 max-w-measure text-body-lg text-ash">
          Two minutes, free. Once your application is reviewed, you’ll be
          welcomed into the community and walked through orientation.
        </p>
        <RegisterForm />
      </div>
    </main>
  );
}

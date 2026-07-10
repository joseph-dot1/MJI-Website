"use client";

import { useEffect, useRef } from "react";
import { HUBSPOT } from "@/lib/hubspot";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (opts: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

const SCRIPT_SRC = "https://js.hsforms.net/forms/embed/v2.js";

/**
 * Embeds a HubSpot form. Loads the embed script once, then renders the form
 * into a target div. Styling is matched to the site in globals.css
 * (.hs-form-frame). Real submissions go straight to HubSpot.
 */
export default function HubSpotForm({ formId }: { formId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const targetId = `hs-form-${formId}`;

  useEffect(() => {
    if (!HUBSPOT.portalId || !formId) return;
    let cancelled = false;

    const create = () => {
      if (cancelled || !window.hbspt || !ref.current) return;
      ref.current.innerHTML = "";
      window.hbspt.forms.create({
        region: HUBSPOT.region,
        portalId: HUBSPOT.portalId,
        formId,
        target: `#${targetId}`,
      });
    };

    if (window.hbspt) {
      create();
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", create);
    return () => {
      cancelled = true;
      script?.removeEventListener("load", create);
    };
  }, [formId, targetId]);

  return <div id={targetId} ref={ref} className="hs-form-frame mt-14" />;
}

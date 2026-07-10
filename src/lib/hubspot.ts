/**
 * HubSpot form configuration. Portal/form IDs are public (they ship in the
 * embed markup anyway), so they can live in NEXT_PUBLIC_ env vars or be
 * filled in directly below.
 *
 * Set the portal ID once, then a form ID per path. Any path left blank
 * falls back to the built-in shell form, so nothing breaks before they're
 * connected.
 */
export const HUBSPOT = {
  portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "",
  region: process.env.NEXT_PUBLIC_HUBSPOT_REGION ?? "na1",
  forms: {
    register: process.env.NEXT_PUBLIC_HUBSPOT_FORM_REGISTER ?? "",
    volunteer: process.env.NEXT_PUBLIC_HUBSPOT_FORM_VOLUNTEER ?? "",
    partner: process.env.NEXT_PUBLIC_HUBSPOT_FORM_PARTNER ?? "",
    donate: process.env.NEXT_PUBLIC_HUBSPOT_FORM_DONATE ?? "",
  },
} as const;

export type HubSpotPath = keyof typeof HUBSPOT.forms;

/** True when a given path has a HubSpot form wired up. */
export function hasHubSpotForm(path: HubSpotPath): boolean {
  return Boolean(HUBSPOT.portalId && HUBSPOT.forms[path]);
}

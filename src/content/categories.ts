/**
 * Initial information architecture for product discovery, taken from the
 * trade-catalogue taxonomy in brand brief v2 §1.1 (about 174 SKUs).
 *
 * IMPORTANT
 * - Labels are PROVISIONAL. The brief says consumer-facing naming should use
 *   practice and outcome language and that trade terms (Shastrokt, Vati, Patent)
 *   stay in the trade channel. Naming is an open design question.
 * - `provisionalSkuCount` is copied from the brief and is NOT verified. It is
 *   deliberately never rendered. Confirm counts and availability against the real
 *   catalogue (the brief also asks for a trade order-history pull) before showing
 *   any number publicly.
 * - There are no products here. Do not add fabricated ones.
 */

export type Category = {
  id: string;
  label: string;
  /** Neutral description of the form, never a benefit. */
  description: string;
  /** Unverified, from the brief. Not rendered. */
  provisionalSkuCount: number;
};

export const categories: readonly Category[] = [
  {
    id: "single-herbs",
    label: "Single herbs",
    description: "Individual herbs, prepared as churna (powder).",
    provisionalSkuCount: 98,
  },
  {
    id: "classical-formulations",
    label: "Classical formulations",
    description: "Preparations made to formulas from the classical texts.",
    provisionalSkuCount: 28,
  },
  {
    id: "capsules",
    label: "Capsules",
    description: "Herbs and formulations in capsule form.",
    provisionalSkuCount: 30,
  },
  {
    id: "family-formulations",
    label: "Our own formulations",
    description: "Proprietary Baba Ayurved preparations.",
    provisionalSkuCount: 9,
  },
  {
    id: "tablets",
    label: "Tablets",
    description: "Herbs and formulations in tablet form.",
    provisionalSkuCount: 6,
  },
  {
    id: "vati",
    label: "Vati",
    description: "Traditional pill-form preparations.",
    provisionalSkuCount: 2,
  },
  {
    id: "pak-avaleh",
    label: "Pak and avaleh",
    description: "Cooked, jam-like preparations, such as chyawanprash.",
    provisionalSkuCount: 1,
  },
] as const;

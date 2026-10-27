export const site = {
  name: "Baba Ayurved Pharmacy",
  shortName: "Baba Ayurved",
  foundedYear: 1999,
  familyPractice: "Phoolchand Aushdhalaya",
  region: "Madhya Pradesh, India",
  description:
    "Daily and seasonal Ayurvedic practice from a family pharmacy in Madhya Pradesh, India. Development preview.",
  /**
   * Hero signature. WORKING tagline only: the brand owner prefers the "Ritual"
   * concept, but it has not been finally approved. Change `text` here and the hero
   * adapts (it scales down automatically for longer text). Do not describe it as
   * approved in copy or documentation until `status` is changed by the owner.
   */
  tagline: {
    text: "Ritual.",
    status: "working" as "working" | "approved",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Shop gets a deliberate, quieter-than-a-banner emphasis in the header. */
  emphasis?: boolean;
};

/**
 * Primary navigation. Anchors point at homepage sections until those become
 * routes (see docs/SITEMAP_PROPOSAL.md). There is no journal route yet, so there is
 * no journal link: a dead link is worse than an absent one.
 */
export const primaryNav: readonly NavItem[] = [
  { label: "Rituals", href: "/#rituals" },
  { label: "Our heritage", href: "/#heritage" },
  { label: "Sourcing", href: "/#provenance" },
  { label: "Shop", href: "/shop", emphasis: true },
];

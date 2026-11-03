import type { Treatment } from "@/components/brand/RosetteSurround";

/**
 * The three proposed flagship collections (brand brief v2 §4.2).
 *
 * These are brand CONCEPTS, not available products or kits. The brief marks this
 * part as open to design input and to be confirmed against the actual catalogue,
 * and requires a staff Vaidya to review every claim before print.
 *
 * Copy rules in force: describe what to do, never what it treats; no disease
 * names; no dosage; no suggestion that any herb or formulation suits everyone
 * every day. Practice names are classical terms taken from the brief.
 */

export type RitualSlug = "morning" | "evening" | "rasayana" | "unhurried-gut-health";

export type Ritual = {
  slug: RitualSlug;
  number: string;
  name: string;
  /** Classical frame the collection is drawn from. */
  term: string;
  /** One line used on the homepage chapter. */
  summary: string;
  /** Short paragraph for the concept page. */
  intro: string;
  /** Practice names only. Never components, doses or benefits. */
  sequence: readonly { practice: string; term?: string }[];
  /** Brand surround used as this chapter's graphic anchor while photography is pending. */
  treatment: Treatment;
};

export const rituals: readonly Ritual[] = [
  {
    slug: "morning",
    number: "01",
    name: "The Morning",
    term: "Dinacharya",
    summary: "The classical morning, compressed to what a person will actually do.",
    intro:
      "Dinacharya is the Ayurvedic ordering of a day. This collection starts where the day starts: a short sequence between waking and the first meal, each step tied to something you already do.",
    sequence: [
      { practice: "Warm water on waking", term: "ushapan" },
      { practice: "Tongue scraping", term: "jihwa nirlekhana" },
      { practice: "Oil pulling", term: "kavala" },
      { practice: "Cleaning the teeth", term: "danta dhavana" },
      { practice: "Then eat" },
    ],
    treatment: "sunray",
  },
  {
    slug: "evening",
    number: "02",
    name: "The Evening",
    term: "Ratricharya",
    summary: "A slow turn from the day to sleep, anchored to what you already do at night.",
    intro:
      "Ratricharya is the classical evening routine. This collection is about winding down on purpose: an early, light dinner, then a few quiet steps before bed.",
    sequence: [
      { practice: "A light, early dinner" },
      { practice: "Foot massage", term: "padabhyanga" },
      { practice: "Something warm and calming" },
      { practice: "Then rest" },
    ],
    treatment: "halfmoon",
  },
  {
    slug: "rasayana",
    number: "03",
    name: "The Rasayana",
    term: "Daily practice",
    summary: "The classical texts do not treat rasayana as a single jar. They describe how you live.",
    intro:
      "Rasayana is the classical practice of nourishing the body over time. The texts describe it as resting on the way a person lives, not on one preparation taken alone. This collection is being designed around that idea.",
    sequence: [],
    treatment: "rays",
  },
  {
    slug: "unhurried-gut-health",
    number: "04",
    name: "Unhurried Gut Health",
    term: "Koshtha Shuddhi & Samagni",
    summary: "14-day Panchakarma-inspired architecture restoring the rhythm and natural intelligence of your digestive fire.",
    intro:
      "Modern digestive distress is rarely a failure of nutrition alone; it is a failure of pace. Rooted in Charaka Samhita (Vimanasthana 2.8-9), this ritual combines four classical formulations with conscious pauses, 100 unhurried steps, and rhythmic colon release.",
    sequence: [
      { practice: "Phase 1: Koshtha-Shodhana (Clearing colon pathways)", term: "Days 1–3" },
      { practice: "Phase 2: Yakrit Shuddhi & Agni Deepana (Liver reset & mucosal healing)", term: "Days 4–10" },
      { practice: "Phase 3: Rasayana & Samagni Sthapana (Sealing rhythm & daily Dinacharya)", term: "Days 11–14 & beyond" },
    ],
    treatment: "sunray",
  },
] as const;

export const ritualBySlug = (slug: string) => rituals.find((ritual) => ritual.slug === slug);

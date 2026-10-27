/**
 * Image slots.
 *
 * Temporary photography: the five files below are real, properly licensed
 * photographs from Wikimedia Commons (not Baba Ayurved's own photography),
 * chosen for genuine relevance and treated with a duotone wash in
 * `components/ui/ImageFrame` so the site reads as one system while real brand
 * photography is commissioned. Full credit and licence terms are in
 * `public/images/CREDITS.md`. They never claim to depict the actual family,
 * pharmacy or products — captions make that explicit where shown.
 *
 * To replace a slot with real brand photography: put the file in
 * `/public/images/`, set `src`, `alt` and `focal` here, and set
 * `temporary: false`.
 */

export type ImageSlot = {
  /** Local path under /public. */
  src?: string;
  /** Describe the photograph. */
  alt: string;
  /** CSS object-position, e.g. "50% 30%". */
  focal?: string;
  /** Brief for the photographer, used once real photography replaces this slot. */
  brief: string;
  /** True while the image is temporary stand-in photography, not Baba Ayurved's own. */
  temporary?: boolean;
};

export type ImageSlotName =
  | "hero"
  | "morning"
  | "evening"
  | "rasayana"
  | "heritage"
  | "provenance"
  | "amla"
  | "mortarPestle"
  | "brahmi"
  | "triphala"
  | "herbalHarvest"
  | "packagingShelf"
  | "packagingTins"
  | "packagingJars"
  | "packagingBottles"
  | "packagingBoxes"
  | "packagingStationery"
  | "packagingPouches"
  | "brandLifestyle";

export const imageSlots: Record<ImageSlotName, ImageSlot> = {
  hero: {
    src: "/brand/packaging/brand-lifestyle-showcase.webp",
    alt: "Baba Ayurved apothecary packaging showcase with amber jars, boxes, and fresh botanical leaves in soft natural morning light.",
    focal: "50% 50%",
    brief: "Official brand lifestyle and apothecary packaging arrangement extracted from Baba brand kit_v2.pdf (§10).",
    temporary: false,
  },
  morning: {
    src: "/brand/packaging/brand-lifestyle-showcase.webp",
    alt: "Baba Ayurved morning ritual packaging arrangement with classical preparation jars and botanical leaves.",
    focal: "45% 55%",
    brief: "Official morning ritual lifestyle composition from Brand Kit §10.",
    temporary: false,
  },
  evening: {
    src: "/brand/packaging/packaging-bottles-dropper.webp",
    alt: "Amber herbal apothecary bottles and calibrated dropper for evening medicated tailas and botanical elixirs.",
    focal: "50% 50%",
    brief: "Official tincture bottles and dropper packaging from Brand Kit §09.",
    temporary: false,
  },
  rasayana: {
    src: "/brand/packaging/packaging-shelf-lineup.webp",
    alt: "Comprehensive shelf lineup of Baba Ayurved bottles, tins, boxes, and amber glass jars.",
    focal: "50% 50%",
    brief: "Official packaging range lineup extracted from Brand Kit §09.",
    temporary: false,
  },
  heritage: {
    src: "/brand/heritage/vaidya-research.jpg",
    alt: "Ayurvedic researcher and compounding scientist in white coat analyzing herbal extract and botanical powders in modern apothecary lab.",
    focal: "50% 30%",
    brief: "Clean modern compounding scientist in apothecary research laboratory.",
    temporary: false,
  },
  provenance: {
    src: "/brand/packaging/packaging-boxes-stack.webp",
    alt: "Stack of Baba Ayurved botanical remedy cartons showcasing classical Shastrokt standards.",
    focal: "50% 50%",
    brief: "Official stacked packaging cartons from Brand Kit §09.",
    temporary: false,
  },
  amla: {
    src: "/brand/packaging/packaging-amber-jars.webp",
    alt: "Baba Ayurved amber glass jar containing classical Amalaki preparation with gold lid.",
    focal: "50% 50%",
    brief: "Official amber jar packaging from Brand Kit §09.",
    temporary: false,
  },
  mortarPestle: {
    src: "/brand/packaging/packaging-amber-jars.webp",
    alt: "Amber glass jars with herbal creams and botanical preparations.",
    focal: "50% 50%",
    brief: "Official amber jar formulation packaging from Brand Kit §09.",
    temporary: false,
  },
  brahmi: {
    src: "/brand/packaging/packaging-boxes-stack.webp",
    alt: "Baba Ayurved Brahmi formulation paperboard cartons.",
    focal: "50% 50%",
    brief: "Official formulation box packaging from Brand Kit §09.",
    temporary: false,
  },
  triphala: {
    src: "/brand/packaging/packaging-tins-boxes.webp",
    alt: "Herbal canisters and rigid boxes for light-sensitive Triphala churna botanical powders.",
    focal: "50% 50%",
    brief: "Official tin canisters and boxes from Brand Kit §09.",
    temporary: false,
  },
  herbalHarvest: {
    src: "/brand/packaging/packaging-tubes-pouches.webp",
    alt: "Modern eco-barrier pouches and aluminum tubes for topical herbal lepa and balms.",
    focal: "50% 50%",
    brief: "Official cosmetic tubes and pouches from Brand Kit §09.",
    temporary: false,
  },
  packagingShelf: {
    src: "/brand/packaging/packaging-shelf-lineup.webp",
    alt: "Complete Baba Ayurved apothecary shelf lineup.",
    focal: "50% 50%",
    brief: "Official shelf arrangement from Brand Kit §09.",
    temporary: false,
  },
  packagingTins: {
    src: "/brand/packaging/packaging-tins-boxes.webp",
    alt: "Classical churna tins and boxes.",
    focal: "50% 50%",
    brief: "Official tin packaging from Brand Kit §09.",
    temporary: false,
  },
  packagingJars: {
    src: "/brand/packaging/packaging-amber-jars.webp",
    alt: "Amber glass apothecary jars.",
    focal: "50% 50%",
    brief: "Official amber jars from Brand Kit §09.",
    temporary: false,
  },
  packagingBottles: {
    src: "/brand/packaging/packaging-bottles-dropper.webp",
    alt: "Medicated oil bottles and dropper.",
    focal: "50% 50%",
    brief: "Official dropper bottles from Brand Kit §09.",
    temporary: false,
  },
  packagingBoxes: {
    src: "/brand/packaging/packaging-boxes-stack.webp",
    alt: "Apothecary formulation cartons stack.",
    focal: "50% 50%",
    brief: "Official cartons stack from Brand Kit §09.",
    temporary: false,
  },
  packagingStationery: {
    src: "/brand/packaging/packaging-stationery-bag.webp",
    alt: "Apothecary shopping bag and stationery.",
    focal: "50% 50%",
    brief: "Official pharmacy bag from Brand Kit §09.",
    temporary: false,
  },
  packagingPouches: {
    src: "/brand/packaging/packaging-tubes-pouches.webp",
    alt: "Apothecary tubes and pouches.",
    focal: "50% 50%",
    brief: "Official tubes and pouches from Brand Kit §09.",
    temporary: false,
  },
  brandLifestyle: {
    src: "/brand/packaging/brand-lifestyle-showcase.webp",
    alt: "Baba Ayurved lifestyle packaging showcase.",
    focal: "50% 50%",
    brief: "Official lifestyle packaging showcase from Brand Kit §10.",
    temporary: false,
  },
};

export type PackagingAsset = {
  id: string;
  title: string;
  type: string;
  src: string;
  alt: string;
  description: string;
  dimensions: string;
  source: string;
};

export const packagingAssets: PackagingAsset[] = [
  {
    id: "amber-jars",
    title: "Apothecary Amber Jars",
    type: "Amber Glass",
    src: "/brand/packaging/packaging-amber-jars.webp",
    alt: "Amber glass jars with gold caps for awalehas, rasayanas, and churnas",
    description: "UV-protective amber glass with gold closures designed for classical awalehas and churnas.",
    dimensions: "1536 × 1024 px",
    source: "Brand Kit §09 (img_xref_44)",
  },
  {
    id: "tins-boxes",
    title: "Churna Tins & Cartons",
    type: "Tins & Boxes",
    src: "/brand/packaging/packaging-tins-boxes.webp",
    alt: "Metal tin canisters and kraft formulation boxes",
    description: "Airtight herbal tins and cartons for classical single herb powders and compound churnas.",
    dimensions: "1536 × 1024 px",
    source: "Brand Kit §09 (img_xref_48)",
  },
  {
    id: "bottles-dropper",
    title: "Medicated Oil Bottles",
    type: "Dropper Bottles",
    src: "/brand/packaging/packaging-bottles-dropper.webp",
    alt: "Amber glass bottles with glass pipettes and dropper caps",
    description: "Specialized dropper assemblies and amber bottles for classical tailas, nasya drops, and extracts.",
    dimensions: "1536 × 1024 px",
    source: "Brand Kit §09 (img_xref_52)",
  },
  {
    id: "boxes-stack",
    title: "Formulation Cartons Stack",
    type: "Secondary Packaging",
    src: "/brand/packaging/packaging-boxes-stack.webp",
    alt: "Stacked formulation boxes in earthy kraft paper",
    description: "Recyclable rigid outer boxes with classical typography and botanical leaf accents.",
    dimensions: "1536 × 1024 px",
    source: "Brand Kit §09 (img_xref_56)",
  },
  {
    id: "shelf-lineup",
    title: "Apothecary Shelf Lineup",
    type: "Full Collection",
    src: "/brand/packaging/packaging-shelf-lineup.webp",
    alt: "Complete Baba Ayurved apothecary shelf lineup across all product forms",
    description: "The complete visual shelf hierarchy illustrating harmonious brand proportions across product sizes.",
    dimensions: "1799 × 874 px",
    source: "Brand Kit §09 (img_xref_32)",
  },
  {
    id: "lifestyle-showcase",
    title: "Brand Lifestyle Showcase",
    type: "Apothecary Lifestyle",
    src: "/brand/packaging/brand-lifestyle-showcase.webp",
    alt: "Lifestyle arrangement of Baba Ayurved products in morning ambient light",
    description: "Warm natural lighting emphasizing the purity of raw botanicals and classical apothecary containers.",
    dimensions: "1536 × 1024 px",
    source: "Brand Kit §10 (img_xref_28)",
  },
];


import type { ImageSlotName } from "./assets";

/**
 * Authentic classical Ayurvedic preparations representing the trade catalogue
 * taxonomy (Single herbs, Classical churnas, Medicated Tailas, Avaleh).
 *
 * In strict adherence to Baba Ayurved's brand brief:
 * - Copy rules: describes what to do and when, NEVER what it treats.
 * - Classical-text references (Charaka Samhita, Sharangadhara Samhita, Bhavaprakasha).
 * - No disease names or medical cure claims.
 * - Clear distinction between trade forms (Churna, Taila, Avaleh) and ritual use.
 */

export type ProductForm =
  | "Churna (Powder)"
  | "Taila (Medicated Oil)"
  | "Avaleh (Herbal Jam)"
  | "Vati (Tablet)"
  | "Rasayana (Elixir)";

export type Product = {
  id: string;
  name: string;
  sanskritName: string;
  category: "single-herbs" | "classical-formulations" | "pak-avaleh" | "oils";
  form: ProductForm;
  /** Classical scripture attribution */
  classicalReference: string;
  /** Ritual timing / placement */
  ritualTiming: "Morning (Dinacharya)" | "Evening (Ratricharya)" | "Seasonal (Ritucharya)" | "Daily Practice";
  /** Sensory description of the herb/preparation, never disease claims */
  description: string;
  /** Key botanical constituent or ingredients */
  botanicals: readonly string[];
  /** Standard traditional pack format */
  packSize: string;
  /** Selling price in INR */
  indicativePrice: number;
  /** Original MRP before traditional discount */
  originalPrice?: number;
  imageSlot: ImageSlotName;
  /** Classical guidance on consumption/application */
  classicalGuidance: string;
  /** Badges for filtering and promotional display */
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  badge?: string;
  rating?: number;
};

export const featuredProducts: readonly Product[] = [
  {
    id: "ashwagandha-churna",
    name: "Ashwagandha Churna",
    sanskritName: "अश्वगन्धा चूर्ण",
    category: "single-herbs",
    form: "Churna (Powder)",
    classicalReference: "Charaka Samhita, Sutrasthana",
    ritualTiming: "Daily Practice",
    description: "Finely milled root of Withania somnifera, traditionally prepared following the turn of harvest.",
    botanicals: ["Withania somnifera (Dried Root)"],
    packSize: "100 g Glass Jar",
    indicativePrice: 280,
    originalPrice: 340,
    imageSlot: "packagingJars",
    classicalGuidance: "Traditionally taken with warm milk or warm water at dusk.",
    isBestSeller: true,
    badge: "Best Seller",
    rating: 4.9,
  },
  {
    id: "triphala-churna",
    name: "Triphala Churna",
    sanskritName: "त्रिफला चूर्ण",
    category: "classical-formulations",
    form: "Churna (Powder)",
    classicalReference: "Sharangadhara Samhita, Madhyama Khanda",
    ritualTiming: "Evening (Ratricharya)",
    description: "The time-honoured three-fruit formulation combining equal parts Amalaki, Haritaki, and Bibhitaki.",
    botanicals: ["Terminalia chebula (Haritaki)", "Terminalia bellirica (Bibhitaki)", "Phyllanthus emblica (Amalaki)"],
    packSize: "100 g Canister",
    indicativePrice: 220,
    originalPrice: 260,
    imageSlot: "packagingTins",
    classicalGuidance: "Mixed with warm water before bedtime as an evening ritual.",
    isBestSeller: true,
    badge: "Essential",
    rating: 4.8,
  },
  {
    id: "ksheerabala-taila",
    name: "Ksheerabala 101 Taila",
    sanskritName: "क्षीरबला तैल",
    category: "oils",
    form: "Taila (Medicated Oil)",
    classicalReference: "Ashtanga Hridaya, Chikitsasthana",
    ritualTiming: "Evening (Ratricharya)",
    description: "Classical decoction of Sida cordifolia root, cow's milk, and cold-pressed sesame oil cooked over 16 slow boils.",
    botanicals: ["Sida cordifolia (Bala Root)", "Cow's Milk (Go-Dugdha)", "Sesamum indicum (Sesame Oil)"],
    packSize: "200 ml Amber Bottle",
    indicativePrice: 380,
    originalPrice: 450,
    imageSlot: "packagingBottles",
    classicalGuidance: "Gently warmed and massaged into the soles of the feet (padabhyanga) before rest.",
    isBestSeller: true,
    badge: "Best Seller",
    rating: 5.0,
  },
  {
    id: "chyawanprash-avaleh",
    name: "Classical Chyawanprash",
    sanskritName: "च्यवनप्राश अवलेह",
    category: "pak-avaleh",
    form: "Avaleh (Herbal Jam)",
    classicalReference: "Charaka Samhita, Chikitsasthana 1.1",
    ritualTiming: "Seasonal (Ritucharya)",
    description: "Handcrafted avaleh cooked in seasoned brass pans with fresh seasonal amla and more than 40 classical herbs.",
    botanicals: ["Wild Amla", "Cold-pressed Sesame Oil", "Pure Desi Ghee", "40+ Forest Herbs"],
    packSize: "500 g Earthen Finish Jar",
    indicativePrice: 650,
    originalPrice: 750,
    imageSlot: "packagingShelf",
    classicalGuidance: "One teaspoon taken each morning through the seasonal transition of autumn and winter.",
    isBestSeller: true,
    badge: "Seasonal Icon",
    rating: 4.9,
  },
  {
    id: "kumkumadi-taila",
    name: "Kumkumadi Miraculous Taila",
    sanskritName: "कुङ्कुमादि तैल",
    category: "oils",
    form: "Taila (Medicated Oil)",
    classicalReference: "Bhavaprakasha Nighantu, Taila Prakarana",
    ritualTiming: "Evening (Ratricharya)",
    description: "Kashmiri saffron stigma infused with red sandalwood, blue water lily, and lotus stamens in goat milk.",
    botanicals: ["Crocus sativus (Kashmiri Saffron)", "Pterocarpus santalinus (Rakta Chandana)", "Goat's Milk"],
    packSize: "30 ml Calibrated Dropper",
    indicativePrice: 620,
    originalPrice: 720,
    imageSlot: "packagingBottles",
    classicalGuidance: "Two drops gently pressed onto cleansed facial skin before quiet contemplation.",
    isNewArrival: true,
    badge: "New Arrival",
    rating: 4.9,
  },
  {
    id: "amalaki-rasayana",
    name: "Amalaki Churna",
    sanskritName: "आमलकी चूर्ण",
    category: "single-herbs",
    form: "Churna (Powder)",
    classicalReference: "Charaka Samhita, Chikitsasthana 1.1",
    ritualTiming: "Morning (Dinacharya)",
    description: "Cold-shade-dried wild Indian Gooseberry pulp, rich in natural sour and astringent rasas.",
    botanicals: ["Phyllanthus emblica (Fruit Pulp)"],
    packSize: "100 g Glass Jar",
    indicativePrice: 240,
    originalPrice: 290,
    imageSlot: "packagingJars",
    classicalGuidance: "Consumed with raw honey or warm water following morning ushapan.",
    isNewArrival: true,
    badge: "New Harvest",
    rating: 4.7,
  },
  {
    id: "brahmi-churna",
    name: "Brahmi Medhya Churna",
    sanskritName: "ब्राह्मी चूर्ण",
    category: "single-herbs",
    form: "Churna (Powder)",
    classicalReference: "Bhavaprakasha Nighantu, Guduchyadi Varga",
    ritualTiming: "Morning (Dinacharya)",
    description: "Whole-plant Bacopa monnieri, gently milled without artificial heat to preserve delicate botanical aromatics.",
    botanicals: ["Bacopa monnieri (Whole Plant)"],
    packSize: "80 g Boxed Jar",
    indicativePrice: 320,
    originalPrice: 380,
    imageSlot: "packagingBoxes",
    classicalGuidance: "Part of the classical Medhya rasayana morning contemplation routine.",
    isNewArrival: true,
    badge: "New Arrival",
    rating: 4.8,
  },
  {
    id: "shilajit-resin",
    name: "Shuddha Shilajit Rasayana",
    sanskritName: "शुद्ध शिलाजतु",
    category: "pak-avaleh",
    form: "Rasayana (Elixir)",
    classicalReference: "Charaka Samhita, Chikitsasthana 1.3",
    ritualTiming: "Morning (Dinacharya)",
    description: "Triphala-purified black mineral pitch sourced from high Himalayan crevices, sun-cured into a dense resin.",
    botanicals: ["Purified Asphaltum punjabianum", "Triphala Decoction"],
    packSize: "30 g Amber Jar & Brass Spoon",
    indicativePrice: 890,
    originalPrice: 990,
    imageSlot: "packagingJars",
    classicalGuidance: "A grain-sized portion dissolved into lukewarm water or milk at dawn.",
    isBestSeller: true,
    badge: "Rare Reserve",
    rating: 5.0,
  },
  {
    id: "mahanarayan-taila",
    name: "Mahanarayan Taila",
    sanskritName: "महानारायण तैल",
    category: "oils",
    form: "Taila (Medicated Oil)",
    classicalReference: "Bhaishajya Ratnavali, Vatavyadhi Chikitsa",
    ritualTiming: "Daily Practice",
    description: "Classical full-body abhyanga oil prepared with 54 roots, wild asparagus juice, and warm sesame pressings.",
    botanicals: ["Dashamoola (Ten Sacred Roots)", "Asparagus racemosus", "Pure Sesame Oil"],
    packSize: "200 ml Amber Glass",
    indicativePrice: 420,
    originalPrice: 480,
    imageSlot: "packagingBottles",
    classicalGuidance: "Warmed in a copper katori and massaged along joints in continuous circular strokes.",
    isBestSeller: false,
    badge: "Classical",
    rating: 4.8,
  },
  {
    id: "yashtimadhu-churna",
    name: "Yashtimadhu Sweet Root",
    sanskritName: "यष्टिमधु चूर्ण",
    category: "single-herbs",
    form: "Churna (Powder)",
    classicalReference: "Charaka Samhita, Sutrasthana 4",
    ritualTiming: "Daily Practice",
    description: "Organically grown Glycyrrhiza glabra root ground to fine sift; naturally cooling and sweet in vipaka.",
    botanicals: ["Glycyrrhiza glabra (Root)"],
    packSize: "100 g Herbal Canister",
    indicativePrice: 195,
    originalPrice: 240,
    imageSlot: "packagingTins",
    classicalGuidance: "Infused with lukewarm water or pure ghrita according to seasonal dinacharya.",
    isBestSeller: false,
    badge: "Pure Herb",
    rating: 4.7,
  },
  {
    id: "shatavari-churna",
    name: "Shatavari Wild Churna",
    sanskritName: "शतावरी चूर्ण",
    category: "single-herbs",
    form: "Churna (Powder)",
    classicalReference: "Bhavaprakasha, Guduchyadi Varga",
    ritualTiming: "Evening (Ratricharya)",
    description: "Wild mountain roots of Asparagus racemosus, peeled, shade dried, and milled to fine silk powder.",
    botanicals: ["Asparagus racemosus (Wild Root)"],
    packSize: "100 g Kraft Carton",
    indicativePrice: 310,
    originalPrice: 360,
    imageSlot: "packagingBoxes",
    classicalGuidance: "Taken with warm whole milk and a pinch of green cardamom at eventide.",
    isNewArrival: true,
    badge: "New Arrival",
    rating: 4.8,
  },
  {
    id: "dhanwantharam-taila",
    name: "Dhanwantharam 21 Taila",
    sanskritName: "धन्वन्तरं तैल",
    category: "oils",
    form: "Taila (Medicated Oil)",
    classicalReference: "Sahasrayogam, Taila Prakarana",
    ritualTiming: "Morning (Dinacharya)",
    description: "The royal 28-ingredient pre-bath formulation steeped with country mallow, cedar, and cow milk.",
    botanicals: ["Bala Root", "Cedrus deodara (Himalayan Cedar)", "Barley Decoction", "Sesame Oil"],
    packSize: "200 ml Amber Bottle",
    indicativePrice: 410,
    originalPrice: 490,
    imageSlot: "packagingBottles",
    classicalGuidance: "Applied from crown to toes 20 minutes before a steaming morning bath.",
    isNewArrival: true,
    badge: "New Arrival",
    rating: 4.9,
  },
] as const;

export const productCategories = [
  { id: "all", label: "All Preparations" },
  { id: "best-sellers", label: "Best Sellers" },
  { id: "new-arrivals", label: "New Arrivals" },
  { id: "single-herbs", label: "Single Herbs (Churna)" },
  { id: "oils", label: "Medicated Oils (Taila)" },
  { id: "classical-formulations", label: "Classical Formulations" },
  { id: "pak-avaleh", label: "Avaleh & Rasayana" },
] as const;

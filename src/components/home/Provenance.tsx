import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { imageSlots } from "@/content/assets";
import { CoverFlowCarousel, CarouselItem } from "@/components/ui/3-d-coverflow-carousel";

const botanicalCarouselItems: CarouselItem[] = [
  {
    tag: "हरिद्रा · #CurcumaLonga",
    titleLine1: "GOLDEN HARIDRA",
    titleLine2: "– CENTRAL TERROIR",
    desc: "Terrain: Red loamy central soils · Harvest: Late winter curing. Rich in natural essential aromatics and deep golden curcuminoids.",
    img: "/brand/products/haridra-product-card.jpg",
    ctaText: "Explore Herb",
    ctaUrl: "#",
  },
  {
    tag: "आमलकी · #TriphalaRasayana",
    titleLine1: "WILD AMALAKI",
    titleLine2: "– VINDHYAN FOREST",
    desc: "Terrain: Vindhyan deciduous forest · Harvest: Autumn. Wild-gathered when berries reach full maturity and peak sour-astringent ascorbic potency.",
    img: "/brand/products/amalaki-product-card.jpg",
    ctaText: "Explore Herb",
    ctaUrl: "#",
  },
  {
    tag: "अश्वगन्धा · #AdaptogenRoot",
    titleLine1: "ASHWAGANDHA",
    titleLine2: "– VINDHYA PLATEAU",
    desc: "Terrain: Semi-arid plateau plains · Harvest: Post-monsoon. Sun-dried roots milled without artificial heat to protect natural withanolides.",
    img: "/brand/products/ashwagandha-product-card.jpg",
    ctaText: "Explore Herb",
    ctaUrl: "#",
  },
  {
    tag: "ब्राह्मी · #MedhyaRasayana",
    titleLine1: "WATER HYSSOP",
    titleLine2: "– BRAHMI MEDHYA",
    desc: "Terrain: Clean freshwater margins · Harvest: Spring flushes. Delicate whole-plant processing celebrating classical sensory clarity.",
    img: "/brand/products/brahmi-product-card.jpg",
    ctaText: "Explore Herb",
    ctaUrl: "#",
  },
  {
    tag: "शिलाजीत · #GoldGradeResin",
    titleLine1: "HIMALAYAN SHILAJIT",
    titleLine2: "– PURIFIED RESIN",
    desc: "Terrain: High-altitude rock exudate · Harvest: Summer solar cure. Pure gold-grade purified resin with 75%+ fulvic acid content, batch certified.",
    img: "/brand/products/shilajit-product-card.jpg",
    ctaText: "Explore Herb",
    ctaUrl: "#",
  },
];



/**
 * Botanical Provenance & Central Indian Herbarium.
 *
 * Explains the foundational Ayurvedic doctrine of Desha (geographical origin)
 * and Kala (seasonal harvest timing). Features real botanical profiles of
 * Central India and maintains the honest SourceLedger for batch certifications.
 */
export function Provenance() {
  const turmericSlot = imageSlots.provenance;

  return (
    <Section id="provenance" aria-labelledby="provenance-heading" className="py-14 md:py-24">
      <Container width="wide" className="flex flex-col gap-16 md:gap-20">
        {/* Editorial Section Intro */}
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-12">
          <Reveal variant="plate" className="md:col-span-6 lg:col-span-5">
            <div className="relative overflow-hidden rounded-md border border-brand-sand bg-brand-off-white p-3 shadow-xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-brand-cream">
                <Image
                  src={turmericSlot.src || "/brand/packaging/packaging-boxes-stack.webp"}
                  alt={turmericSlot.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 450px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 rounded-xs bg-brand-off-white/90 p-3 backdrop-blur-md border border-brand-sand/60">
                  <span className="block font-sans text-[11px] font-semibold uppercase tracking-label text-brand-leaf-green">
                    Desha &amp; Kala &middot; Classical Ethnobotany
                  </span>
                  <span className="block font-serif text-sm font-medium text-brand-primary">
                    Ground Haridra (Turmeric) &middot; Central Indian Terroir
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 md:col-span-6 lg:col-span-7">
            <Reveal className="flex flex-col gap-4">
              <Eyebrow>Botanical Provenance</Eyebrow>
              <Heading as="h2" size="statement" id="provenance-heading">
                Where an herb grows changes the herb.
              </Heading>
              <Text className="max-w-[42ch] text-base leading-relaxed text-ink sm:text-lg">
                Ayurvedic classical texts teach that an herb grown in one terrain and harvested in one season possesses entirely different attributes (*gunas*) than the same plant grown elsewhere.
              </Text>
              <Text className="max-w-[42ch] text-sm text-tone-muted sm:text-base">
                Over five generations, the family behind Phoolchand Aushdhalaya has cultivated deep regional relationships with wild-crafters and farmers across Madhya Pradesh—selecting botanicals by soil, rainfall, and harvest window rather than wholesale commodity trade.
              </Text>
            </Reveal>
          </div>
        </div>

        {/* Central Indian Herbarium Showcase - 3D Coverflow Carousel */}
        <Reveal className="flex flex-col gap-6">
          <div className="border-b border-solid border-line pb-4">
            <span className="font-sans text-xs font-semibold uppercase tracking-label text-indigo">
              Botanical Field Guide
            </span>
            <h3 className="font-serif text-2xl font-medium text-ink">
              Four foundational herbs of Central India
            </h3>
          </div>

          <div className="overflow-hidden rounded-3xl border border-neutral-800/80 shadow-2xl">
            <CoverFlowCarousel
              items={botanicalCarouselItems}
              sectionLabel="CENTRAL INDIAN BOTANICAL FIELD GUIDE"
              className="py-8 sm:py-12"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

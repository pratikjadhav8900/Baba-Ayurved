import type { Metadata } from "next";
import Link from "next/link";
import { CatalogHero } from "@/components/shop/CatalogHero";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { CategoryIndex } from "@/components/shop/CategoryIndex";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { imageSlots } from "@/content/assets";
import { rituals } from "@/content/rituals";

export const metadata: Metadata = {
  title: "Apothecary Catalogue · Classical Formulations & Single Herbs",
  description:
    "Compounded precision: Browse Baba Ayurved Pharmacy's modern catalogue of classical formulations and single herbs with transparent apothecary prices.",
};

export default function ShopPage() {
  return (
    <>
      {/* Monumental Onyx-Inspired Hero Section */}
      <CatalogHero />

      {/* Modern Product Catalog Section */}
      <section id="catalog-grid" className="scroll-mt-16 bg-brand-cream/60 py-14 md:py-24">
        <Container className="flex flex-col gap-10 md:gap-14">
          <div className="flex flex-col gap-2">
            <Eyebrow>Pharmacy Formulary</Eyebrow>
            <Heading as="h2" size="statement" className="text-brand-primary">
              The Classical Apothecary Grid
            </Heading>
            <p className="max-w-2xl font-serif text-sm text-brand-primary/75 sm:text-base">
              Pure single herbs, authentic churnas, cold-pressed tailas, and slow-cooked avalehas. Filter by practice or sort by price.
            </p>
          </div>

          <ProductCatalog />
        </Container>
      </section>

      {/* Pathway 1: By Ritual */}
      <Section aria-labelledby="by-ritual-heading" tone="paper" className="py-14 md:py-20">
        <Container className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Eyebrow className="mb-2">First Pathway</Eyebrow>
            <Heading as="h2" size="statement" id="by-ritual-heading" className="text-brand-primary">
              By daily ritual
            </Heading>
            <p className="mt-2 font-serif text-sm text-brand-primary/70">
              Classical Ayurvedic daily living (Dinacharya, Ratricharya, and Ritucharya).
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:col-span-8">
            {rituals.map((ritual) => {
              const slot = imageSlots[ritual.slug] || imageSlots.hero;
              return (
                <Link
                  key={ritual.slug}
                  href={`/rituals/${ritual.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-line bg-paper-deep transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-paper">
                    <ImageFrame
                      src={slot.src}
                      alt={slot.alt}
                      focal={slot.focal}
                      ratio="4/5"
                      placeholderLabel="Photo pending"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-label text-indigo">
                      {ritual.term}
                    </span>
                    <h3 className="mt-0.5 font-serif text-base font-medium text-ink group-hover:text-indigo">
                      {ritual.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 font-serif text-xs text-tone-muted">
                      {ritual.summary}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Pathway 2: Trade Taxonomy */}
      <Section tone="paper-deep" aria-labelledby="by-category-heading" className="py-14 md:py-20">
        <Container className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-3 md:col-span-5">
            <Eyebrow className="mb-1">Catalogue Architecture</Eyebrow>
            <Heading as="h2" size="statement" id="by-category-heading" className="text-brand-primary">
              Seven classical forms
            </Heading>
            <Text className="text-sm text-brand-primary/70">
              Our trade catalogue comprises approximately 174 SKUs. Consumer naming conventions are being reviewed with our Vaidya before individual product pages launch.
            </Text>
          </div>
          <div className="md:col-span-7">
            <CategoryIndex />
          </div>
        </Container>
      </Section>
    </>
  );
}

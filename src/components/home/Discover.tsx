import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { CategoryIndex } from "@/components/shop/CategoryIndex";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ScrollRow } from "@/components/ui/ScrollRow";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { imageSlots, type ImageSlot } from "@/content/assets";
import { rituals } from "@/content/rituals";

/**
 * Editorial Commerce & Product Discovery Hub.
 *
 * Provides two pathways into the catalogue:
 * 1. By Ritual (Dinacharya Morning, Ratricharya Evening, Rasayana Seasonal Living).
 * 2. By Modern Product Catalog Poster Grid with filters, price sorting, and bag drawer.
 */
export function Discover() {
  return (
    <Section id="shop" aria-labelledby="discover-heading" tone="paper-deep" className="py-14 md:py-24">
      <Container width="wide" className="flex flex-col gap-16 md:gap-20">
        {/* Section Header */}
        <Reveal className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Eyebrow className="mb-4">The Pharmacy Catalogue</Eyebrow>
            <Heading as="h2" size="statement" id="discover-heading" className="text-ink">
              Classical formulations, ordered by practice.
            </Heading>
          </div>
          <div className="flex flex-col justify-end gap-3 md:col-span-5">
            <Text className="text-base text-ink sm:text-lg">
              Explore traditional preparations through the rhythm of your day, or browse by classical pharmaceutical form.
            </Text>
            <Text variant="value" muted>
              Handcrafted in Madhya Pradesh following Shastrokt classical methods. Transparent apothecary pricing.
            </Text>
          </div>
        </Reveal>

        {/* 1. Browse by Ritual (Horizontal Swipeable Row) */}
        <Reveal className="flex flex-col gap-6">
          <div className="flex items-end justify-between border-b border-solid border-line pb-4">
            <div>
              <span className="font-sans text-xs font-semibold uppercase tracking-label text-indigo">
                First Pathway
              </span>
              <h3 className="font-serif text-2xl font-medium text-ink">Browse by daily ritual</h3>
            </div>
            <Link
              href="/#rituals"
              className="hidden font-sans text-xs font-medium uppercase tracking-label text-tone-muted hover:text-indigo sm:inline-block"
            >
              Learn the classical sequence &rarr;
            </Link>
          </div>

          <ScrollRow className="-mx-gutter px-gutter">
            {rituals.map((ritual) => {
              const slot = (imageSlots as Record<string, ImageSlot>)[ritual.slug] || imageSlots.hero;
              return (
                <li key={ritual.slug} className="w-56 shrink-0 snap-start sm:w-64">
                  <Link href={`/rituals/${ritual.slug}`} className="group flex flex-col gap-3">
                    <ImageFrame
                      src={slot.src}
                      alt={slot.alt}
                      focal={slot.focal}
                      ratio="4/5"
                      placeholderLabel="Photograph pending"
                      className="transition-all duration-(--duration-calm) group-hover:opacity-90 group-hover:shadow-md"
                      frameClassName="rounded-xl border border-line"
                    />
                    <div className="flex flex-col">
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-label text-indigo">
                        {ritual.term} &middot; {ritual.number}
                      </span>
                      <span className="font-serif text-lg font-medium text-ink group-hover:text-indigo">
                        {ritual.name}
                      </span>
                      <p className="mt-1 line-clamp-2 font-serif text-xs text-tone-muted">
                        {ritual.summary}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ScrollRow>
        </Reveal>

        {/* 2. Modern Product Catalog Poster Grid */}
        <Reveal className="flex flex-col gap-8 pt-4">
          <div className="flex flex-col justify-between gap-2 border-b border-solid border-line pb-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-sans text-xs font-semibold uppercase tracking-label text-indigo">
                Second Pathway
              </span>
              <h3 className="font-serif text-2xl font-medium text-ink sm:text-3xl">
                Featured classical preparations
              </h3>
            </div>
            <span className="font-sans text-xs text-tone-muted">
              Select any preparation to inspect classical references &middot; Transparent pricing
            </span>
          </div>

          <ProductCatalog />
        </Reveal>

        {/* 3. Trade Taxonomy Architecture */}
        <Reveal delay={0.1} className="flex flex-col gap-6 rounded-2xl border border-solid border-line bg-paper p-8 sm:p-10">
          <div className="max-w-2xl">
            <Eyebrow className="mb-2">Catalogue Architecture</Eyebrow>
            <h3 className="font-serif text-xl font-medium text-ink sm:text-2xl">
              174 SKUs spanning classical and family practice
            </h3>
            <Text className="mt-2 text-sm text-tone-muted">
              Baba Ayurved Pharmacy prepares preparations across seven traditional categories. While consumer-facing labels and packaging are being confirmed with our Vaidya, the underlying pharmaceutical classifications remain faithful to classical texts.
            </Text>
          </div>

          <CategoryIndex className="md:max-w-3xl" />

          <div className="pt-2">
            <Button href="/shop" variant="secondary" size="sm">
              Explore full catalogue structure
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

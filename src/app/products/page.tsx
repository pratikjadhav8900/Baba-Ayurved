import type { Metadata } from "next";
import Link from "next/link";
import { CatalogHero } from "@/components/shop/CatalogHero";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "Compounded Precision · Product Catalog",
  description:
    "Explore our complete modern product catalog of classical single herbs, authentic churnas, medicated tailas, and slow-cooked avalehas.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Monumental Onyx-Inspired Hero Section */}
      <CatalogHero />

      {/* Catalog Grid Section */}
      <section id="catalog-grid" className="scroll-mt-16 bg-brand-cream/60 py-14 md:py-24">
        <Container className="flex flex-col gap-10 md:gap-14">
          <div className="flex flex-col gap-2">
            <nav aria-label="Breadcrumb" className="font-sans text-xs text-brand-primary/72">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">&middot;</span>
              <span className="text-brand-primary font-medium">Products Catalog</span>
            </nav>
            <Eyebrow>Pharmacy Formulary</Eyebrow>
            <Heading as="h2" size="statement" className="text-brand-primary">
              All Classical Preparations
            </Heading>
            <p className="max-w-2xl font-serif text-sm text-brand-primary/86 sm:text-base">
              Filter by daily practice or preparation form. Select any card to inspect classical references, timing, and botanical ingredients.
            </p>
          </div>

          <ProductCatalog />
        </Container>
      </section>
    </>
  );
}

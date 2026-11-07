"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ModernProductCard } from "@/components/shop/ModernProductCard";
import { ProductDetailModal } from "@/components/shop/ProductDetailModal";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/content/products";

export default function WishlistPage() {
  const { items } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Section tone="paper" className="py-14 md:py-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Eyebrow>Saved For Later</Eyebrow>
          <Heading as="h1" size="statement" className="text-brand-primary">
            Your Wishlist
          </Heading>
          <p className="max-w-2xl font-serif text-sm text-brand-primary/75 sm:text-base">
            {items.length > 0
              ? `${items.length} formulation${items.length === 1 ? "" : "s"} saved to your wishlist.`
              : "Items you like are saved here, on this device."}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-brand-sand/60 bg-brand-cream/40 py-20 text-center">
            <Heart className="h-8 w-8 text-brand-sand" strokeWidth={1.5} />
            <p className="font-serif text-sm text-brand-primary/70">
              Nothing saved yet. Tap the heart on any product to add it here.
            </p>
            <Button href="/shop" variant="primary">
              Browse the Catalogue
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => (
              <ModernProductCard key={product.id} product={product} onInspect={setSelectedProduct} />
            ))}
          </div>
        )}

        <Link href="/shop" className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-primary underline underline-offset-4 hover:text-brand-leaf-green">
          ← Continue Shopping
        </Link>
      </Container>

      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </Section>
  );
}

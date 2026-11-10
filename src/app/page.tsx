import { ArtworkSection } from "@/components/home/ArtworkSection";
import { ClosingMoment } from "@/components/home/ClosingMoment";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Heritage } from "@/components/home/Heritage";
import { GutKitHeroBanner } from "@/components/home/GutKitHeroBanner";
import { ProductShelf } from "@/components/home/ProductShelf";
import { Provenance } from "@/components/home/Provenance";
import { Rituals } from "@/components/home/Rituals";
import { StaggerTestimonials } from "@/components/home/StaggerTestimonials";

/** Development preview of the homepage. Placeholder content is labelled as such. */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductShelf />
      <Rituals />
      <GutKitHeroBanner />
      <Heritage />
      <Provenance />
      <ArtworkSection />
      <StaggerTestimonials />
      <ClosingMoment />
    </>
  );
}

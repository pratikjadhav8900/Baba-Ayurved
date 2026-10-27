import { ArtworkSection } from "@/components/home/ArtworkSection";
import { ClosingMoment } from "@/components/home/ClosingMoment";
import { Hero } from "@/components/home/Hero";
import { Heritage } from "@/components/home/Heritage";
import { OptimizationProductSlider } from "@/components/home/OptimizationProductSlider";
import { Provenance } from "@/components/home/Provenance";
import { Rituals } from "@/components/home/Rituals";

/** Development preview of the homepage. Placeholder content is labelled as such. */
export default function Home() {
  return (
    <>
      <Hero />
      <OptimizationProductSlider />
      <Rituals />
      <Heritage />
      <Provenance />
      <ArtworkSection />
      <ClosingMoment />
    </>
  );
}

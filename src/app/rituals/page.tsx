import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { imageSlots, type ImageSlot } from "@/content/assets";
import { rituals } from "@/content/rituals";

export const metadata: Metadata = {
  title: "Daily Rituals",
  description:
    "Three classical Ayurvedic practices — the Morning, the Evening, and the Rasayana — reframed as collections you can actually live by.",
};

export default function RitualsIndexPage() {
  return (
    <Section spacing="none" className="py-14 md:py-24">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <Eyebrow>The Science of Daily Living</Eyebrow>
          <Heading as="h1" size="display">
            Daily Rituals
          </Heading>
          <Text className="max-w-measure">
            Ayurveda was never a reactive shelf of pills. In the classical texts of{" "}
            <em>Charaka</em> and <em>Sushruta</em>, health is the cumulative byproduct of an
            ordered day. These are the collections we are building around that idea.
          </Text>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rituals.map((ritual) => {
            const slot = (imageSlots as Record<string, ImageSlot>)[ritual.slug] || imageSlots.hero;
            return (
              <Link
                key={ritual.slug}
                href={`/rituals/${ritual.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-line bg-paper-deep transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden bg-paper">
                  <ImageFrame
                    src={slot.src}
                    alt={slot.alt}
                    focal={slot.focal}
                    ratio="4/5"
                    placeholderLabel="Photo pending"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-label text-indigo">
                    {ritual.number} &middot; {ritual.term}
                  </span>
                  <h2 className="mt-0.5 font-serif text-lg font-medium text-ink group-hover:text-indigo">
                    {ritual.name}
                  </h2>
                  <p className="mt-1 line-clamp-3 font-serif text-xs text-tone-muted">
                    {ritual.summary}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

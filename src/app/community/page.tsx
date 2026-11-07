import type { Metadata } from "next";
import { Play, Quote, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Community Stories",
  description:
    "Real rituals, told by the people who practice them. Video and written stories from the Baba Ayurved community.",
};

/**
 * No fabricated testimonials or stock customer footage here — every slot below is
 * genuinely empty until a real customer video or quote is supplied. The "pending"
 * state mirrors how this site already handles missing product photography
 * (see ImageFrame's placeholderLabel), rather than inventing fake social proof,
 * which is both dishonest and a real regulatory risk for a health-adjacent brand.
 */
const videoSlotCount = 6;
const writtenSlotCount = 3;

export default function CommunityPage() {
  return (
    <Section spacing="none" className="py-14 md:py-24">
      <Container className="flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <Eyebrow>Community Voices</Eyebrow>
          <Heading as="h1" size="display">
            Real Rituals, Real Stories
          </Heading>
          <Text className="max-w-measure">
            This page is reserved for stories from people who actually practice these rituals —
            on video and in writing. We publish nothing here until a real customer shares it with
            us.
          </Text>
        </div>

        {/* Video Testimonials Grid */}
        <div className="flex flex-col gap-5">
          <h2 className="font-serif text-xl font-medium text-ink">Video Stories</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: videoSlotCount }).map((_, i) => (
              <div
                key={i}
                className="group relative flex aspect-9/16 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-dashed border-line bg-paper-deep text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper">
                  <Play className="h-5 w-5 text-tone-muted" />
                </div>
                <p className="px-6 font-sans text-xs font-semibold uppercase tracking-label text-tone-muted">
                  Video Pending
                </p>
                <p className="max-w-[20ch] px-6 font-serif text-xs text-tone-muted">
                  Reserved for a real customer story
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Written Testimonials */}
        <div className="flex flex-col gap-5">
          <h2 className="font-serif text-xl font-medium text-ink">Written Stories</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {Array.from({ length: writtenSlotCount }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-xl border border-dashed border-line bg-paper-deep p-6"
              >
                <Quote className="h-5 w-5 text-tone-muted" />
                <p className="font-serif text-sm italic text-tone-muted">
                  Awaiting a customer&rsquo;s permission to publish their story here.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Share Your Story CTA */}
        <div className="flex flex-col items-start gap-3 rounded-xl border border-line bg-paper-deep p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-lg font-medium text-ink">
              Practicing one of our rituals?
            </h2>
            <Text muted className="mt-1">
              Send us a short video or a few lines about your experience. With your permission,
              we&rsquo;ll feature it here.
            </Text>
          </div>
          <a
            href="mailto:hello@babaayurved.com?subject=My%20Ritual%20Story"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-indigo px-6 font-sans text-ui font-medium text-paper transition-colors hover:bg-indigo-deep"
          >
            <Mail className="h-4 w-4" />
            Share Your Story
          </a>
        </div>
      </Container>
    </Section>
  );
}

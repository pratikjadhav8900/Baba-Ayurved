import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RosetteSurround } from "@/components/brand/RosetteSurround";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ProofList } from "@/components/ui/ProofList";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { imageSlots } from "@/content/assets";
import { ritualBySlug, rituals, type RitualSlug } from "@/content/rituals";
import { GutHealthRitualKit } from "@/components/rituals/GutHealthRitualKit";

/** Short, specific credit lines tying each temporary photograph to its ritual. */
const imageCredits: Record<RitualSlug, string> = {
  morning: "The lota: the vessel for ushapan, warm water on waking",
  evening: "A lit brass lamp, lit at the day's end",
  rasayana: "Ashwagandha root and powder, one of the rasayana herbs",
  "unhurried-gut-health": "The Unhurried Gut Health Ritual Kit & 3g Matra Measuring Spoon",
};

export function generateStaticParams() {
  return rituals.map((ritual) => ({ slug: ritual.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rituals/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ritual = ritualBySlug(slug);
  if (!ritual) return {};
  return { title: ritual.name, description: ritual.summary };
}

/**
 * Concept page for a proposed ritual collection. Not a product page: there is
 * nothing to buy, and no component list, dose or benefit is stated. It shows what the
 * finished page will carry and which pieces are still pending.
 */
export default function RitualPage(props: PageProps<"/rituals/[slug]">) {
  // Reading `params` is isolated behind Suspense so navigations into this route stay instant
  // (Cache Components validation). All three slugs are prerendered, so the fallback is
  // only a safety net.
  return (
    <Suspense fallback={<Section spacing="none" className="min-h-[70vh]" aria-busy="true" />}>
      <RitualContent params={props.params} />
    </Suspense>
  );
}

async function RitualContent({ params }: { params: PageProps<"/rituals/[slug]">["params"] }) {
  const { slug } = await params;
  const ritual = ritualBySlug(slug);
  if (!ritual) notFound();

  if (ritual.slug === "unhurried-gut-health") {
    return <GutHealthRitualKit />;
  }

  const index = rituals.findIndex((item) => item.slug === ritual.slug);
  const next = rituals[(index + 1) % rituals.length];
  const slot = imageSlots[ritual.slug];

  return (
    <>
      <Section spacing="none" className="pb-16 pt-8 md:pb-28 md:pt-14" aria-labelledby="ritual-heading">
        <Container className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-6 md:col-span-6">
            <Link
              href="/#rituals"
              className="inline-flex min-h-11 w-fit items-center font-sans text-ui text-indigo underline underline-offset-[0.35em]"
            >
              All rituals
            </Link>
            <Eyebrow>
              {ritual.number} &middot; {ritual.term}
            </Eyebrow>
            <Heading as="h1" size="display" id="ritual-heading">
              {ritual.name}
            </Heading>
            <Text className="max-w-measure">{ritual.intro}</Text>
            <Text variant="value" muted className="max-w-measure">
              Concept in development. Not available to buy. Every step and statement will be reviewed
              by our Vaidya before it is published.
            </Text>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <ImageFrame
              src={slot.src}
              alt={slot.alt}
              focal={slot.focal}
              aspectClassName="aspect-[5/4] md:aspect-[4/5]"
              placeholderLabel="Photograph pending"
              overlayLabel={slot.src ? imageCredits[ritual.slug] : undefined}
              fallback={
                <span className="text-indigo">
                  <RosetteSurround size={360} treatment={ritual.treatment} />
                </span>
              }
            />
          </div>
        </Container>
      </Section>

      <Section tone="paper-deep" spacing="default" aria-labelledby="ritual-sequence-heading">
        <Container className="grid gap-10 md:grid-cols-12 md:gap-10">
          <Heading as="h2" size="section" id="ritual-sequence-heading" className="md:col-span-4">
            {ritual.sequence.length > 0 ? "The proposed sequence" : "What this page will hold"}
          </Heading>

          <div className="flex flex-col gap-10 md:col-span-7 md:col-start-6">
            {ritual.sequence.length > 0 && (
              <ol className="flex flex-col">
                {ritual.sequence.map((step, i) => (
                  <li
                    key={step.practice}
                    className="flex items-baseline gap-5 border-t border-solid border-tone py-4 last:border-b"
                  >
                    <span className="w-6 shrink-0 font-sans text-label tracking-label text-tone-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-body">
                      {step.practice}
                      {step.term && (
                        <span className="ml-2 font-sans text-value italic text-tone-muted">{step.term}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            )}

            <ProofList
              items={[
                { label: "Products in this ritual", value: "Pending catalogue confirmation" },
                { label: "Practice card", value: "Pending" },
                { label: "Usage notes and cautions", value: "Pending Vaidya review" },
                { label: "Pack sizes and prices", value: "Pending" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="indigo" spacing="tight">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Text variant="ui" muted>
            Next ritual
          </Text>
          <Button href={`/rituals/${next.slug}`} tone="reversed" variant="secondary">
            {next.name}
          </Button>
        </Container>
      </Section>
    </>
  );
}

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { imageSlots } from "@/content/assets";

/**
 * Closing moment: a full-bleed photographic band, not an illustration. The lamp
 * photograph (already dark) needs only a light ink gradient for the centred text to
 * read clearly. Temporary photography; see public/images/CREDITS.md.
 */
export function ClosingMoment() {
  const slot = imageSlots.evening;

  return (
    <Section
      tone="indigo"
      aria-labelledby="closing-heading"
      spacing="none"
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      {slot.src && (
        <Image
          src={slot.src}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
          style={slot.focal ? { objectPosition: slot.focal } : undefined}
        />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/55" />

      <Container width="narrow" className="relative flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <Eyebrow>Ritual, not remedy</Eyebrow>
          <Heading as="h2" size="statement" id="closing-heading">
            Begin wherever the day finds you.
          </Heading>
          <Button href="/#rituals" tone="reversed" size="lg">
            Explore the three rituals
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

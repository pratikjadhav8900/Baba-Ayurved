"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { imageSlots } from "@/content/assets";
import { ArrowRight } from "lucide-react";

const phases = [
  { days: "Days 1–3", name: "Colon Clear", formula: "Avipattikar + Ezee Churna" },
  { days: "Days 4–10", name: "Liver Reset", formula: "Bhoomi Amla + Yashtimadhu" },
  { days: "Days 11–14+", name: "Daily Rhythm", formula: "Lifelong 2-product Dinacharya" },
] as const;

export function GutKitHeroBanner() {
  const slot = imageSlots.packagingBoxes;

  return (
    <section className="bg-[#FAF6F0] py-14 sm:py-18 md:py-20 border-t border-b border-[#DFCDB7]">
      <Container width="wide">
        <div className="overflow-hidden rounded-3xl border border-[#DFCDB7] bg-white shadow-sm lg:grid lg:grid-cols-2 lg:items-stretch">
          {/* Real product shot, not a decorative card */}
          <div className="relative aspect-[16/10] bg-[#EFE4D6] lg:aspect-auto">
            {slot.src && (
              <Image
                src={slot.src}
                alt={slot.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            )}
            <span className="absolute left-4 top-4 rounded-full bg-brand-leaf-green px-3.5 py-1.5 font-sans text-sm font-bold text-white shadow-md">
              Save ₹99
            </span>
          </div>

          {/* Offer details */}
          <div className="flex flex-col gap-5 p-6 sm:p-8 lg:p-10">
            <span className="font-sans text-sm font-bold uppercase tracking-[0.18em] text-[#8C5E28]">
              3-Phase Panchakarma Kit
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-primary">
              The Unhurried Gut Health Ritual Kit
            </h2>

            <p className="font-sans text-base leading-relaxed text-brand-primary/90 max-w-lg">
              A 14-day progressive ritual that decelerates digestion through 4 classical formulations and a custom Matra measuring spoon.
            </p>

            <div className="flex flex-col gap-2.5 border-y border-[#DFCDB7] py-4">
              {phases.map((phase, i) => (
                <div key={phase.days} className="flex items-baseline gap-3">
                  <span className="shrink-0 font-sans text-sm font-bold text-[#8C5E28]">
                    {i + 1}.
                  </span>
                  <p className="font-sans text-sm text-brand-primary">
                    <span className="font-semibold">{phase.name}</span>
                    <span className="text-brand-primary/68"> ({phase.days}) &middot; {phase.formula}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-baseline gap-2.5">
                <span className="font-bold font-serif text-3xl text-brand-primary">₹949</span>
                <span className="line-through text-brand-primary/58 text-base">₹1,048</span>
              </div>
              <Button href="/rituals/unhurried-gut-health" size="md">
                Explore 14-Day Protocol
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <p className="font-sans text-sm text-brand-primary/60">
              AYUSH-compliant &middot; Lic. 25D/23/99 &middot; No synthetic binders
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

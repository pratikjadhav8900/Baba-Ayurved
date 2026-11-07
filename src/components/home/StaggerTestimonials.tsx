"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { testimonials as initialTestimonials, type Testimonial } from "@/content/testimonials";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

const SQRT_5000 = Math.sqrt(5000);

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial & { tempId: number };
  handleMove: (steps: number) => void;
  cardSize: number;
}

function TestimonialCard({ position, testimonial, handleMove, cardSize }: TestimonialCardProps) {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-brand-primary text-brand-ivory border-brand-primary"
          : "z-0 bg-white text-brand-primary border-brand-sand hover:border-brand-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px #E6D3BA" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-brand-sand"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "mb-4 flex h-14 w-12 items-center justify-center font-serif text-sm font-bold uppercase",
          isCenter ? "bg-brand-ivory text-brand-primary" : "bg-brand-sand/40 text-brand-primary"
        )}
        style={{ boxShadow: "3px 3px 0px #F4EADD" }}
      >
        {testimonial.initials}
      </div>
      <h3
        className={cn(
          "text-base sm:text-xl font-serif font-medium",
          isCenter ? "text-brand-ivory" : "text-brand-primary"
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 font-sans text-sm italic",
          isCenter ? "text-brand-ivory/80" : "text-brand-primary/60"
        )}
      >
        &mdash; {testimonial.by}
      </p>
    </div>
  );
}

export function StaggerTestimonials() {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(() =>
    initialTestimonials.map((t) => ({ ...t, tempId: t.id }))
  );
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const handleMove = useCallback((steps: number) => {
    setTestimonialsList((prev) => {
      const newList = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      return newList;
    });
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Auto-advance the carousel to the left, pausing on hover/touch so visitors
  // can read a card without it sliding away mid-interaction.
  useEffect(() => {
    if (reduceMotion || isPaused) return;
    const timer = setInterval(() => handleMove(1), 3500);
    return () => clearInterval(timer);
  }, [reduceMotion, isPaused, handleMove]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F4ECE1] py-16 sm:py-20"
      style={{ height: 600 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="mx-auto mb-2 max-w-7xl px-6 text-center md:px-12">
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-brand-leaf-green">
          Community Voices
        </span>
      </div>

      {testimonialsList.map((testimonial, index) => {
        // Symmetric centering requires an odd-length list (an even one can never
        // have a card land exactly on position 0 without leaning one side).
        // Keep testimonials.ts at an odd count so this always centers cleanly.
        const position = index - (testimonialsList.length - 1) / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className="flex h-14 w-14 items-center justify-center border-2 border-brand-sand bg-white text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className="flex h-14 w-14 items-center justify-center border-2 border-brand-sand bg-white text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}

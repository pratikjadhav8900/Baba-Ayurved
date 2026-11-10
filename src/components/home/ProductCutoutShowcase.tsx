"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import * as m from "motion/react-m";
import { animate, useMotionValue, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

/**
 * Three product cutouts composed as a floating still-life with real depth:
 * back layers parallax less than the front one as the cursor tilts the stage,
 * and each layer idles on its own slow float. Alpha-aware drop shadows ground
 * the cutouts so they read as objects, not flat stickers.
 */
const layers = [
  {
    src: "/brand/products/ashwagandha-pack-cutout.png",
    alt: "Baba Ayurveda Ashwagandha sachet pack",
    width: 804,
    height: 794,
    // percentage of stage width; left/bottom as percentages of stage
    widthPct: 46,
    left: 4,
    bottom: 20,
    depth: 0.35,
    float: 7,
    duration: 6.5,
    z: 1,
  },
  {
    src: "/brand/products/shilajit-tub-cutout.png",
    alt: "Baba Ayurveda Shuddha Shilajit tub",
    width: 538,
    height: 839,
    widthPct: 30,
    left: 64,
    bottom: 22,
    depth: 0.55,
    float: 9,
    duration: 7.5,
    z: 2,
  },
  {
    src: "/brand/products/triphala-bottle-cutout.png",
    alt: "Baba Ayurveda Triphala bottle",
    width: 408,
    height: 757,
    widthPct: 30,
    left: 35,
    bottom: 14,
    depth: 1,
    float: 11,
    duration: 5.5,
    z: 3,
  },
] as const;

export function ProductCutoutShowcase() {
  const reduceMotion = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const tiltX = useSpring(tiltXRaw, { stiffness: 120, damping: 16 });
  const tiltY = useSpring(tiltYRaw, { stiffness: 120, damping: 16 });

  // Parallax offsets per depth: front layer moves most, back layer least.
  const shiftFront = useTransform(tiltY, [-10, 10], [-18, 18]);
  const shiftMid = useTransform(tiltY, [-10, 10], [-10, 10]);
  const shiftBack = useTransform(tiltY, [-10, 10], [-6, 6]);
  const shifts = { 1: shiftFront, 0.55: shiftMid, 0.35: shiftBack } as const;

  // Percentage transforms are relative to the element's own box, not the stage,
  // so this range already bakes in the equivalent of a -50% centering translate.
  const glowX = useTransform(tiltY, [-10, 10], ["-62%", "-38%"]);

  // A mouse-only tilt means touch visitors — most of the audience — never see
  // any of this dimensionality at all, which is what read as "boring" on
  // mobile. So the stage auto-drifts through a slow, continuous tilt sweep by
  // default, and real pointer input (mouse hover *or* a finger dragging
  // across it) takes over instantly for as long as it's active. The idle
  // loop is stopped (not just overridden) while interacting, since a running
  // animate() would otherwise keep fighting direct .set() calls every frame.
  const idleRef = useRef<{ x: ReturnType<typeof animate>; y: ReturnType<typeof animate> } | null>(null);

  function startIdleSway() {
    idleRef.current = {
      x: animate(tiltXRaw, [0, 3.5, 0, -3.5, 0], { duration: 13, repeat: Infinity, ease: "easeInOut" }),
      y: animate(tiltYRaw, [0, 7, 0, -7, 0], { duration: 9, repeat: Infinity, ease: "easeInOut" }),
    };
  }

  useEffect(() => {
    if (reduceMotion) return;
    startIdleSway();
    return () => {
      idleRef.current?.x.stop();
      idleRef.current?.y.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const el = stageRef.current;
    if (!el) return;
    idleRef.current?.x.stop();
    idleRef.current?.y.stop();
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    tiltYRaw.set(relX * 20);
    tiltXRaw.set(-relY * 12);
  }

  function handlePointerLeave() {
    if (reduceMotion) return;
    // animate()'s keyframe array implicitly starts from the value's current
    // position, so this eases smoothly back to centre and straight into the
    // sway — no separate settle tween needed.
    startIdleSway();
  }

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl">
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ perspective: 1100, touchAction: "pan-y" }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_50%_30%,#F7EDDD_0%,#EADAC3_55%,#DFC9AD_100%)]"
      >
        {/* Reserves the caption chip's own band at the bottom of the stage, so layer
            `bottom` percentages (and the ground shadow) are computed against the
            remaining space above it instead of being overlapped by it. */}
        <div className="absolute inset-x-0 top-0 bottom-20 sm:bottom-24">
          {/* Warm glow that drifts with the tilt, like a light source the objects sit under */}
          <m.div
            aria-hidden="true"
            style={reduceMotion ? undefined : { x: glowX }}
            className="pointer-events-none absolute top-[28%] left-1/2 h-[55%] w-[80%] rounded-full bg-[radial-gradient(circle,rgba(255,250,240,0.9)_0%,rgba(255,250,240,0)_65%)] blur-2xl"
          />

          {/* Ground shadow: anchors the trio to a surface */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[9%] left-1/2 h-[9%] w-[72%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse,rgba(62,36,12,0.42)_0%,rgba(62,36,12,0)_70%)] blur-md"
          />

          <m.div
            style={reduceMotion ? undefined : { rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
            className="absolute inset-0"
          >
            {layers.map((layer) => (
              <m.div
                key={layer.src}
                style={{
                  width: `${layer.widthPct}%`,
                  left: `${layer.left}%`,
                  bottom: `${layer.bottom}%`,
                  zIndex: layer.z,
                  x: reduceMotion ? 0 : shifts[layer.depth],
                }}
                animate={reduceMotion ? undefined : { y: [0, -layer.float, 0] }}
                transition={{ duration: layer.duration, repeat: Infinity, ease: "easeInOut" }}
                className="absolute"
              >
                <Image
                  src={layer.src}
                  alt={layer.alt}
                  width={layer.width}
                  height={layer.height}
                  sizes={`(min-width: 1024px) ${Math.round(layer.widthPct * 0.435)}vw, (min-width: 768px) ${Math.round(layer.widthPct * 0.48)}vw, ${Math.round(layer.widthPct * 0.98)}vw`}
                  className="h-auto w-full select-none [filter:drop-shadow(0_18px_22px_rgba(62,36,12,0.35))_drop-shadow(0_4px_6px_rgba(62,36,12,0.25))]"
                  draggable={false}
                />
              </m.div>
            ))}
          </m.div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 z-10 rounded-xs border border-brand-sand/60 bg-brand-off-white/90 p-3 backdrop-blur-md">
          <span className="block font-sans text-[13px] font-semibold uppercase tracking-label text-brand-leaf-green">
            Desha &amp; Kala &middot; Classical Ethnobotany
          </span>
          <span className="block font-serif text-sm font-medium text-brand-primary">
            Triphala &middot; Ashwagandha &middot; Shilajit &mdash; Central Indian Terroir
          </span>
        </div>
      </div>
    </div>
  );
}

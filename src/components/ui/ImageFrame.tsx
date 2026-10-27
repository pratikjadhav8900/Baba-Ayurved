import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Rosette } from "@/components/brand/Rosette";

type ImageFrameProps = {
  /** Local path under /public, e.g. "/images/hero.jpg". Omit to show the designed fallback. */
  src?: string;
  /** Required when `src` is set. Describe the photograph, not its purpose. */
  alt?: string;
  ratio?: "1/1" | "4/5" | "3/4" | "5/4" | "3/2" | "16/9";
  /** CSS object-position so the subject survives the narrow crop, e.g. "50% 30%". */
  focal?: string;
  caption?: string;
  /** Shown on the fallback so a missing asset is never mistaken for a final one. */
  placeholderLabel?: string;
  /** Replaces the default rosette on the fallback, e.g. a RosetteSurround. */
  fallback?: ReactNode;
  /** Surface of the fallback. Indigo suits plates that will later hold warm photography. */
  tone?: "paper" | "indigo";
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Extra classes for the frame itself (the media box), e.g. to remove the border. */
  frameClassName?: string;
  /** Replaces `ratio` with a responsive aspect class, e.g. "aspect-[5/4] md:aspect-[4/5]". */
  aspectClassName?: string;
  /**
   * Small credit or tie-in line set inside the image itself, bottom-left, on a soft
   * scrim (so it reads on any photo without a separate caption row beneath it).
   * Use for a short, specific note ("The lota: the vessel for ushapan"), not decoration.
   */
  overlayLabel?: string;
};

const ratios = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "5/4": "aspect-[5/4]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
} as const;

/**
 * Frame for photography. The box is sized by aspect ratio, so media never causes
 * layout shift. Imagery direction (brief §3.4): warm, real provenance and process
 * images, never stock wellness; no cool filters.
 * Without `src` it renders a labelled, designed fallback.
 */
export function ImageFrame({
  src,
  alt = "",
  ratio = "4/5",
  focal,
  caption,
  placeholderLabel = "Photograph pending",
  fallback,
  tone = "paper",
  sizes = "(min-width: 64rem) 40vw, 100vw",
  priority = false,
  className,
  frameClassName,
  aspectClassName,
  overlayLabel,
}: ImageFrameProps) {
  const indigo = tone === "indigo";

  return (
    <figure className={cn("m-0", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-sm",
          aspectClassName ?? ratios[ratio],
          indigo
            ? "tone-indigo"
            : "border border-solid border-tone bg-paper-deep",
          frameClassName,
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={focal ? { objectPosition: focal } : undefined}
          />
        ) : null}
        {src && overlayLabel && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent px-4 pb-3 pt-10 sm:px-5 sm:pb-4">
            <span className="font-sans text-value text-paper">{overlayLabel}</span>
          </div>
        )}
        {!src && (
          <div role="img" aria-label={placeholderLabel} className="absolute inset-0">
            <div className="absolute inset-0 flex items-center justify-center">
              {fallback ?? (
                <Rosette size={56} color={indigo ? "var(--color-indigo-muted)" : "var(--color-mute)"} />
              )}
            </div>
            <span
              aria-hidden
              className="absolute bottom-3 left-4 font-sans text-label uppercase tracking-label text-tone-muted"
            >
              {placeholderLabel}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 font-sans text-value text-tone-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

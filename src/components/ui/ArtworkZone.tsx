import { cn } from "@/lib/cn";
import { ImageFrame } from "./ImageFrame";

/**
 * A commissioned, licensed Gond artwork. EVERY field is required, by type:
 * the zone will not render a work without its artist credit and a reference to
 * the licence the business holds (brief §3.6: commission real Gond artists,
 * license properly, credit them by name).
 *
 * Do not fill this with in-house imitation, AI-generated "Gond style" imagery, or
 * artwork whose permission is undocumented. Gond painting carries a GI tag (April
 * 2023) and many artists hold individual motifs.
 */
export type CommissionedArtwork = {
  /** Local file under /public. Print/screen colours are shown as supplied, unfiltered. */
  src: string;
  alt: string;
  artistName: string;
  village: string;
  /** Internal reference to the written licence (contract id, GI authorised-user record). */
  licenceReference: string;
};

type ArtworkZoneProps = {
  artwork?: CommissionedArtwork;
  ratio?: "4/5" | "3/4" | "1/1";
  className?: string;
  variant?: "default" | "glass";
};

const cornerDefault = "absolute size-4 border-tone border-solid";
const cornerGlass = "absolute size-4 border-white/40 border-solid";

/**
 * Responsive container for commissioned artwork. Brand furniture around it stays
 * indigo and cream; the artwork itself keeps its authentic full colour (never
 * recolour it to the brand palette). Without `artwork` it shows a labelled,
 * empty zone held open for the commission.
 */
export function ArtworkZone({
  artwork,
  ratio = "4/5",
  className,
  variant = "default",
}: ArtworkZoneProps) {
  const isGlass = variant === "glass";
  const corner = isGlass ? cornerGlass : cornerDefault;

  if (artwork) {
    return (
      <figure className={cn("m-0", className)}>
        <ImageFrame
          src={artwork.src}
          alt={artwork.alt}
          ratio={ratio}
          sizes="(min-width: 64rem) 40vw, 100vw"
          frameClassName={isGlass ? "border-white/20" : "border-0"}
        />
        <figcaption className="mt-4 flex flex-col gap-1">
          <span className={cn("font-serif text-step", isGlass ? "text-white" : "")}>
            {artwork.artistName}, {artwork.village}
          </span>
          <span
            className={cn(
              "font-sans text-label uppercase tracking-label",
              isGlass ? "text-white/70" : "text-tone-muted",
            )}
          >
            Commissioned artwork &middot; Licence ref. {artwork.licenceReference}
          </span>
        </figcaption>
      </figure>
    );
  }

  const ratioClass = { "4/5": "aspect-[4/5]", "3/4": "aspect-[3/4]", "1/1": "aspect-square" }[ratio];

  return (
    <figure className={cn("m-0", className)}>
      <div
        role="img"
        aria-label="Reserved space for commissioned Gond artwork. No artwork has been supplied yet."
        className={cn(
          "relative p-6 transition-colors",
          isGlass ? "bg-white/5 border border-white/15" : "bg-paper-deep",
          ratioClass,
        )}
      >
        {/* Print-style crop marks: the zone is held open, not decorated. */}
        <span aria-hidden className={cn(corner, "left-3 top-3 border-l border-t")} />
        <span aria-hidden className={cn(corner, "right-3 top-3 border-r border-t")} />
        <span aria-hidden className={cn(corner, "bottom-3 left-3 border-b border-l")} />
        <span aria-hidden className={cn(corner, "bottom-3 right-3 border-b border-r")} />
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <span
            className={cn(
              "font-sans text-label uppercase tracking-label",
              isGlass ? "text-[#E6D3BA] font-semibold" : "text-tone-muted",
            )}
          >
            Artwork zone
          </span>
          <span
            className={cn(
              "max-w-[18ch] font-serif text-step text-balance",
              isGlass ? "text-white" : "",
            )}
          >
            Held open for commissioned Gond artwork
          </span>
        </div>
      </div>
      <figcaption className="mt-4 flex flex-col gap-1">
        <span
          className={cn(
            "font-sans text-value",
            isGlass ? "text-white/85" : "text-tone-muted",
          )}
        >
          Artist and village: to be credited by name
        </span>
        <span
          className={cn(
            "font-sans text-label uppercase tracking-label",
            isGlass ? "text-white/60" : "text-tone-muted",
          )}
        >
          No artwork or licence on file
        </span>
      </figcaption>
    </figure>
  );
}

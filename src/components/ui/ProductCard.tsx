import Link from "next/link";
import { cn } from "@/lib/cn";
import { Heading } from "./Heading";
import { ImageFrame } from "./ImageFrame";
import { ProofList, type ProofItem } from "./ProofList";

type ProductCardProps = {
  name: string;
  /** Practice / ritual framing, not a condition. Keep to approved copy. */
  description?: string;
  href?: string;
  image?: { src?: string; alt?: string; placeholderLabel?: string };
  /** Verified facts only (source region, pack size, ...). */
  proof?: readonly ProofItem[];
  className?: string;
};

/**
 * Presentational product card. It takes data as props and ships with none:
 * no catalogue, prices, claims or reviews live in this component.
 * When `href` is set the whole card is one link (stretched link on the name).
 */
export function ProductCard({
  name,
  description,
  href,
  image,
  proof,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-5",
        href && "focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-indigo",
        className,
      )}
    >
      <ImageFrame ratio="4/5" {...image} />
      <div className="flex flex-col gap-2">
        <Heading as="h3" size="product">
          {href ? (
            <Link
              href={href}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </Heading>
        {description && (
          <p className="max-w-measure font-serif text-step text-tone-muted">{description}</p>
        )}
      </div>
      {proof && proof.length > 0 && <ProofList items={proof} className="sm:grid-cols-1" />}
    </article>
  );
}

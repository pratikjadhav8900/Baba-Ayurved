import { cn } from "@/lib/cn";

export type ProofItem = {
  label: string;
  value: string;
};

type ProofListProps = {
  items: readonly ProofItem[];
  /** Columns from the sm breakpoint up. Defaults to 2. */
  columns?: 2 | 3 | 4;
  className?: string;
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Evidence layer (brief §5.4, "serif speaks, sans verifies"): small muted
 * Archivo labels over Archivo values. Only render facts that are verified;
 * this component never invents proof.
 */
export function ProofList({ items, columns = 2, className }: ProofListProps) {
  return (
    <dl className={cn("grid gap-x-8 gap-y-5", columnClasses[columns], className)}>
      {items.map((item) => (
        <div key={item.label} className="border-t border-solid border-tone pt-3">
          <dt className="font-sans text-label font-normal uppercase tracking-label text-tone-muted">
            {item.label}
          </dt>
          <dd className="mt-1 font-sans text-value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

import { sourceRecords, type SourceRecord } from "@/content/provenance";

type SourceLedgerProps = {
  /** Verified records. Defaults to content/provenance.ts, which is empty until the business supplies evidence. */
  records?: readonly SourceRecord[];
  /** How many template rows to show when there are no real records yet. Keep this low: repeating "pending" reads as unfinished, not as evidence. */
  templateRows?: number;
  /** Visual variant: "default" for warm paper stock, "glass" for dark translucent WebGL backdrops. */
  variant?: "default" | "glass";
};

const fields = [
  { key: "herb", label: "Herb" },
  { key: "region", label: "Region" },
  { key: "harvest", label: "Harvest" },
  { key: "batch", label: "Batch" },
  { key: "evidence", label: "Evidence" },
] as const satisfies readonly { key: keyof SourceRecord; label: string }[];

/**
 * Ledger of verified sources. It is proof-layer UI: Archivo labels over values, one
 * hairline-ruled row per record, stacking on mobile and spanning five columns from md.
 *
 * Supports "default" theme for cream cards and "glass" theme for immersive WebGL liquid stages.
 */
export function SourceLedger({
  records = sourceRecords,
  templateRows = 1,
  variant = "default",
}: SourceLedgerProps) {
  const isTemplate = records.length === 0;
  const isGlass = variant === "glass";
  const rows: readonly Partial<SourceRecord>[] = isTemplate
    ? Array.from({ length: templateRows }, () => ({}))
    : records;

  return (
    <figure className="m-0 flex flex-col gap-4">
      <ul className="flex flex-col">
        {rows.map((record, index) => (
          <li
            key={isTemplate ? index : `${record.herb}-${record.batch ?? index}`}
            className={`py-5 last:border-b border-t border-solid ${
              isGlass ? "border-white/15" : "border-tone"
            }`}
          >
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-5 items-center">
              {fields.map(({ key, label }) => {
                const value = record[key];
                return (
                  <div key={key} className={key === "herb" ? "col-span-2 md:col-span-1" : undefined}>
                    <dt
                      className={`font-sans text-label uppercase tracking-label ${
                        isGlass ? "text-[#C5A880] font-semibold" : "text-tone-muted"
                      }`}
                    >
                      {label}
                    </dt>
                    <dd
                      className={
                        isTemplate
                          ? isGlass
                            ? "mt-1.5 font-sans text-xs inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25"
                            : "mt-1 font-sans text-value text-tone-muted"
                          : isGlass
                            ? "mt-1 font-serif text-step text-white"
                            : "mt-1 font-serif text-step"
                      }
                    >
                      {isTemplate ? (
                        <>
                          {isGlass && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />}
                          Pending verification
                        </>
                      ) : (
                        value ?? "Not recorded"
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </li>
        ))}
      </ul>
      {isTemplate && (
        <figcaption
          className={`font-sans text-value ${
            isGlass ? "text-white/60" : "text-tone-muted"
          }`}
        >
          Template. No source has been verified yet, so none is shown. Records will appear here once the
          business can evidence each one.
        </figcaption>
      )}
    </figure>
  );
}

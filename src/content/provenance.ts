/**
 * Verified source records for the provenance ledger.
 *
 * EMPTY ON PURPOSE. Do not add a record unless the business can evidence every
 * field. No farm names, maps, test results, purity guarantees or laboratory
 * credentials have been supplied, so none are shown.
 *
 * When a record is added, <SourceLedger> renders it in place of the template state.
 */

export type SourceRecord = {
  herb: string;
  region: string;
  /** Free text, e.g. harvest season, as supplied by the sourcing team. */
  harvest?: string;
  batch?: string;
  /** Reference to a document the business holds, e.g. a COA number. */
  evidence?: string;
};

export const sourceRecords: readonly SourceRecord[] = [];

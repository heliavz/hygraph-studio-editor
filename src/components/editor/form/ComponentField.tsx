import { ChevronRight } from "lucide-react";

interface ComponentFieldProps {
  label: string;
  fieldKey: string;
}

// Baseline Hygraph displays the component's internal UUID in collapsed
// state instead of synthesizing a human summary from the component's fields.
// Hardcoded values per field below replicate that "before" state.
// Next improvement replaces this with summaries like "80 × 130 × 45 cm".
const FAKE_UUIDS: Record<string, string> = {
  dimensions: "ba9087ece27945568ae457931cfb34ee",
  weight: "f3d2c1b0a98765e43210fedcba987654",
};

export function ComponentField({ label, fieldKey }: ComponentFieldProps) {
  const uuid = FAKE_UUIDS[fieldKey] ?? "00000000000000000000000000000000";

  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 rounded-md border border-default bg-canvas px-3 py-2.5 text-left hover:bg-surface-2"
    >
      <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
      <span className="text-sm font-medium text-strong">{label}:</span>
      <span className="truncate font-mono text-xs text-muted">{uuid}</span>
    </button>
  );
}

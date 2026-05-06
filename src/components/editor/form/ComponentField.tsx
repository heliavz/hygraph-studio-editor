import { ChevronRight } from "lucide-react";

interface ComponentFieldProps {
  label: string;
  summary: string;
}

export function ComponentField({ label, summary }: ComponentFieldProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 rounded-md border border-default bg-canvas px-3 py-2.5 text-left hover:bg-surface-2"
    >
      <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
      <span className="text-sm font-medium text-strong">{label}:</span>
      <span className="truncate text-sm text-soft">{summary}</span>
    </button>
  );
}

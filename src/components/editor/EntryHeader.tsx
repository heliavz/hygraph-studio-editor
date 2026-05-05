import { ChevronDown, ChevronLeft, Copy, MoreHorizontal } from "lucide-react";
import { product } from "@/data";

export function EntryHeader() {
  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-muted bg-canvas px-4">
      {/* Left: back + breadcrumb + entry title + row actions */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Back"
          className="rounded p-1 text-muted hover:bg-surface-2 hover:text-strong"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="rounded-md bg-surface-5 px-2 py-1 text-xs font-medium text-soft">
          Product
        </span>
        <h1 className="truncate text-base font-semibold text-strong">
          {product.name.en}
        </h1>
        <button
          type="button"
          aria-label="Copy entry ID"
          className="rounded p-1 text-muted hover:bg-surface-2 hover:text-strong"
        >
          <Copy className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="More actions"
          className="rounded p-1 text-muted hover:bg-surface-2 hover:text-strong"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Right: contributor avatar + Save (disabled) + Publish (active) */}
      <div className="flex items-center gap-2">
        <div
          role="img"
          aria-label="Entry contributor"
          className="h-7 w-7 rounded-full bg-primary-muted"
        />

        {/* Save split-button - disabled, no unsaved changes */}
        <div className="flex">
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-l-md bg-surface-5 px-3 py-1.5 text-sm font-medium text-disabled"
          >
            Save
          </button>
          <button
            type="button"
            disabled
            aria-label="Save options"
            className="cursor-not-allowed rounded-r-md border-l border-default bg-surface-5 px-1.5 py-1.5 text-disabled"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Publish split-button - primary green action */}
        <div className="flex">
          <button
            type="button"
            className="rounded-l-md bg-success px-3 py-1.5 text-sm font-medium text-white hover:bg-success/90"
          >
            Publish
          </button>
          <button
            type="button"
            aria-label="Publish options"
            className="rounded-r-md border-l border-white/20 bg-success px-1.5 py-1.5 text-white hover:bg-success/90"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

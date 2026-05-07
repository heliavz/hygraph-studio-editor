import { Image as ImageIcon, Link2, Plus } from "lucide-react";
import { resolveAsset } from "@/data";

interface AssetFieldProps {
  assetId: string;
}

export function AssetField({ assetId }: AssetFieldProps) {
  const asset = resolveAsset(assetId);

  if (!asset) {
    return (
      <div className="rounded-md border border-default bg-canvas p-4 text-sm text-muted">
        No asset linked
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 rounded-md border border-default bg-canvas p-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-surface-5">
          <ImageIcon className="h-6 w-6 text-muted" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-strong">
            {asset.altText.en ?? "Untitled asset"}
          </p>
          <p className="text-xs text-muted">
            {asset.width} × {asset.height} px
          </p>
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-default bg-canvas px-3 py-1.5 text-sm font-medium text-body hover:bg-surface-2 hover:cursor-pointer"
        >
          <Link2 className="h-3.5 w-3.5 text-muted" />
          Link existing
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-default bg-canvas px-3 py-1.5 text-sm font-medium text-body hover:bg-surface-2 hover:cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 text-muted" />
          Create new
        </button>
      </div>
    </div>
  );
}

import { Link2, Plus, X } from "lucide-react";

export interface ReferenceItem {
  id: string;
  name: string;
  swatch?: string;
}

interface ReferenceFieldProps {
  items: ReferenceItem[];
  primaryAction: string;
  secondaryAction?: string;
}

export function ReferenceField({
  items,
  primaryAction,
  secondaryAction,
}: ReferenceFieldProps) {
  return (
    <div>
      {items.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-1.5 rounded-md bg-surface-5 px-2 py-1"
            >
              {item.swatch && (
                <span
                  className="h-4 w-4 rounded-full border border-default"
                  style={{ backgroundColor: item.swatch }}
                  aria-hidden="true"
                />
              )}
              <span className="text-sm text-strong">{item.name}</span>
              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                className="rounded p-0.5 text-muted hover:bg-surface-8 hover:text-strong"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-default bg-canvas px-3 py-1.5 text-sm font-medium text-body hover:bg-surface-2"
        >
          <Link2 className="h-3.5 w-3.5 text-muted" />
          {primaryAction}
        </button>
        {secondaryAction && (
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md border border-default bg-canvas px-3 py-1.5 text-sm font-medium text-body hover:bg-surface-2"
          >
            <Plus className="h-3.5 w-3.5 text-muted" />
            {secondaryAction}
          </button>
        )}
      </div>
    </div>
  );
}

import {
  AlignLeft,
  Box,
  ChevronDown,
  Hash,
  Link2,
  type LucideIcon,
  Paperclip,
  ToggleLeft,
  Type,
} from "lucide-react";
import { productFieldDefinitions, type FieldType } from "@/data";

const ICON_BY_TYPE: Record<FieldType, LucideIcon> = {
  text: Type,
  richtext: AlignLeft,
  number: Hash,
  enum: ChevronDown,
  asset: Paperclip,
  component: Box,
  reference: Link2,
  boolean: ToggleLeft,
};

export function FieldOutline() {
  return (
    <nav
      aria-label="Field outline"
      className="w-55 shrink-0 overflow-y-auto border-r border-muted bg-canvas py-3"
    >
      {productFieldDefinitions.map((field) => {
        const Icon = ICON_BY_TYPE[field.type];
        return (
          <button
            key={field.key}
            type="button"
            className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm text-soft hover:bg-surface-2 hover:text-strong"
          >
            <Icon className="h-4 w-4 shrink-0 text-ghost" />
            <span className="truncate">{field.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

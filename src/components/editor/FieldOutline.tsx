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
import {
  getLocaleCompletionStatus,
  LOCALES,
  product,
  productFieldDefinitions,
  type FieldType,
  type LocaleCompletionStatus,
  type LocalizedString,
  type Product,
} from "@/data";

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

const DOT_COLOR: Record<LocaleCompletionStatus, string> = {
  complete: "bg-success",
  partial: "bg-warning",
  empty: "bg-danger",
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
          <a
            key={field.key}
            href={`#field-${field.key}`}
            className="flex items-center gap-2 px-4 py-1.5 text-sm text-soft hover:bg-surface-2 hover:text-strong"
          >
            <Icon className="h-4 w-4 shrink-0 text-ghost" />
            <span className="flex-1 truncate">{field.label}</span>
            {field.isLocalized && <CompletionDots fieldKey={field.key} />}
          </a>
        );
      })}
    </nav>
  );
}

function CompletionDots({ fieldKey }: { fieldKey: keyof Product }) {
  const value = product[fieldKey] as LocalizedString | undefined;
  return (
    <span className="flex shrink-0 items-center gap-1">
      {LOCALES.map((locale) => {
        const status = getLocaleCompletionStatus(value, locale.code);
        return (
          <span
            key={locale.code}
            className={`h-2 w-2 rounded-full ${DOT_COLOR[status]}`}
            aria-label={`${locale.name}: ${status}`}
            title={`${locale.name}: ${status}`}
          />
        );
      })}
    </span>
  );
}

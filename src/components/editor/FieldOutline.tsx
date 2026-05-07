"use client";

import {
  AlignLeft,
  Box,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Hash,
  Link2,
  type LucideIcon,
  Paperclip,
  ToggleLeft,
  Type,
} from "lucide-react";
import {
  COMPLETION_STATUS_LABEL,
  FIELD_SECTIONS,
  getLocaleCompletionStatus,
  LOCALES,
  product,
  productFieldDefinitions,
  type FieldSection,
  type FieldType,
  type LocaleCompletionStatus,
  type LocalizedString,
  type Product,
} from "@/data";

const ICON_BY_TYPE: Record<FieldType, LucideIcon> = {
  text: Type,
  richtext: AlignLeft,
  number: Hash,
  enum: ChevronsUpDown,
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

interface FieldOutlineProps {
  collapsedSections: Set<FieldSection>;
  onToggleSection: (section: FieldSection) => void;
}

export function FieldOutline({
  collapsedSections,
  onToggleSection,
}: FieldOutlineProps) {
  return (
    <nav
      aria-label="Field outline"
      className="w-55 shrink-0 overflow-y-auto border-r border-muted bg-canvas"
    >
      {FIELD_SECTIONS.map((section) => {
        const fields = productFieldDefinitions.filter(
          (f) => f.section === section.id,
        );
        const isCollapsed = collapsedSections.has(section.id);
        return (
          <div key={section.id}>
            <button
              type="button"
              onClick={() => onToggleSection(section.id)}
              aria-expanded={!isCollapsed}
              className="flex w-full items-center gap-2 bg-surface-1 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-muted hover:bg-surface-2 hover:text-strong"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0" />
              )}
              <span className="flex-1">{section.label}</span>
              <span className="font-normal normal-case text-ghost">
                {fields.length}
              </span>
            </button>
            {!isCollapsed &&
              fields.map((field) => {
                const Icon = ICON_BY_TYPE[field.type];
                return (
                  <a
                    key={field.key}
                    href={`#field-${field.key}`}
                    className="flex items-center gap-2 py-1.5 pl-6 pr-3 text-sm text-soft hover:bg-surface-2 hover:text-strong"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-ghost" />
                    <span className="flex-1 truncate">{field.label}</span>
                    {field.isLocalized && (
                      <CompletionDots fieldKey={field.key} />
                    )}
                  </a>
                );
              })}
          </div>
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
            className={`h-2.5 w-2.5 rounded-full ${DOT_COLOR[status]}`}
            aria-label={`${locale.name}: ${COMPLETION_STATUS_LABEL[status]}`}
            title={`${locale.name}: ${COMPLETION_STATUS_LABEL[status]}`}
          />
        );
      })}
    </span>
  );
}

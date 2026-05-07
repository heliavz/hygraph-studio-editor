import type { FieldDefinition } from "@/data";

interface FormFieldProps {
  field: FieldDefinition;
  children: React.ReactNode;
}

export function FormField({ field, children }: FormFieldProps) {
  const clearLabel = field.isLocalized ? "Clear all" : "Clear";

  return (
    <div
      id={`field-${field.key}`}
      className="group/field scroll-mt-4 space-y-3"
    >
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-sm font-medium text-strong">{field.label}</label>
        {field.isTitle && <FieldPill>Title</FieldPill>}
        {field.isUnique && <FieldPill>Unique</FieldPill>}
        {field.isLocalized && <FieldPill>Localized</FieldPill>}
        <button
          type="button"
          className="ml-auto text-xs font-medium text-muted opacity-0 transition-opacity hover:text-strong group-hover/field:opacity-100 group-focus-within/field:opacity-100 hover:cursor-pointer"
        >
          {clearLabel}
        </button>
      </div>
      {children}
    </div>
  );
}

function FieldPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-surface-5 px-2 py-0.5 text-xs font-medium text-soft">
      {children}
    </span>
  );
}

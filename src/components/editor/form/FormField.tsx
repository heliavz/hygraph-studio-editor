import type { FieldDefinition } from "@/data";

interface FormFieldProps {
  field: FieldDefinition;
  children: React.ReactNode;
}

export function FormField({ field, children }: FormFieldProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-sm font-medium text-strong">{field.label}</label>
        {field.isTitle && <FieldPill>Title</FieldPill>}
        {field.isUnique && <FieldPill>Unique</FieldPill>}
        {field.isLocalized && <FieldPill>Localized</FieldPill>}
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

"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import {
  FIELD_SECTIONS,
  product,
  productFieldDefinitions,
  resolveCategory,
  resolveCollection,
  resolveColors,
  type Dimensions,
  type FieldDefinition,
  type FieldSection,
  type LocalizedString,
  type Weight,
} from "@/data";
import { AssetField } from "./AssetField";
import { BooleanToggle } from "./BooleanToggle";
import { ComponentField } from "./ComponentField";
import { EnumSelect } from "./EnumSelect";
import { FormField } from "./FormField";
import { LocalizedTextInput } from "./LocalizedTextInput";
import { NumberInput } from "./NumberInput";
import { ReferenceField, type ReferenceItem } from "./ReferenceField";
import { TextInput } from "./TextInput";

interface EditorFormProps {
  collapsedSections: Set<FieldSection>;
  onToggleSection: (section: FieldSection) => void;
  viewMode: "stacked" | "side-by-side";
}

export function EditorForm({
  collapsedSections,
  onToggleSection,
  viewMode,
}: EditorFormProps) {
  return (
    <form className="mx-auto max-w-3xl space-y-12 px-8 py-8">
      {FIELD_SECTIONS.map((section) => {
        const fields = productFieldDefinitions.filter(
          (f) => f.section === section.id,
        );
        const isCollapsed = collapsedSections.has(section.id);
        return (
          <section
            key={section.id}
            id={`section-${section.id}`}
            className="scroll-mt-4"
          >
            <button
              type="button"
              onClick={() => onToggleSection(section.id)}
              aria-expanded={!isCollapsed}
              className="group mb-6 flex w-full items-center gap-2.5 border-b border-default pb-3 text-left transition-colors hover:cursor-pointer"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-muted transition-colors group-hover:text-strong" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted transition-colors group-hover:text-strong" />
              )}
              <h2 className="text-sm font-semibold uppercase tracking-wider text-strong">
                {section.label}
              </h2>
              <span className="rounded bg-surface-5 px-1.5 py-0.5 text-xs font-medium text-soft">
                {fields.length}
              </span>
            </button>
            {!isCollapsed && (
              <div className="space-y-8">
                {fields.map((field) => (
                  <FormField key={field.key} field={field}>
                    {renderInput(field, viewMode)}
                  </FormField>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </form>
  );
}

function renderInput(
  field: FieldDefinition,
  viewMode: "stacked" | "side-by-side",
) {
  const value = product[field.key];

  switch (field.type) {
    case "text":
    case "richtext":
      if (field.isLocalized) {
        return (
          <LocalizedTextInput
            value={(value ?? {}) as LocalizedString}
            multiline={field.type === "richtext"}
            richText={field.type === "richtext"}
            viewMode={viewMode}
          />
        );
      }
      return <TextInput value={typeof value === "string" ? value : ""} />;

    case "number":
      return (
        <NumberInput value={typeof value === "number" ? value : undefined} />
      );

    case "enum":
      return (
        <EnumSelect
          value={typeof value === "string" ? value : ""}
          options={field.enumOptions ?? []}
        />
      );

    case "boolean":
      return <BooleanToggle value={Boolean(value)} />;

    case "asset":
      return <AssetField assetId={typeof value === "string" ? value : ""} />;

    case "component":
      return (
        <ComponentField
          label={field.label}
          summary={synthesizeComponentSummary(field.key, value)}
        />
      );

    case "reference": {
      const items = resolveReferenceItems(field);
      return (
        <ReferenceField
          items={items}
          primaryAction="Link existing"
          secondaryAction="Create new"
        />
      );
    }

    default:
      return null;
  }
}

function resolveReferenceItems(field: FieldDefinition): ReferenceItem[] {
  const value = product[field.key];
  switch (field.key) {
    case "colorIds": {
      const colors = resolveColors(value as string[]);
      return colors.map((c) => ({ id: c.id, name: c.name, swatch: c.hex }));
    }
    case "categoryId": {
      const cat = resolveCategory(value as string);
      return cat ? [{ id: cat.id, name: cat.name }] : [];
    }
    case "collectionId": {
      const col = resolveCollection(value as string);
      return col ? [{ id: col.id, name: col.name }] : [];
    }
    case "relatedProductIds":
      return [];
    default:
      return [];
  }
}

function synthesizeComponentSummary(fieldKey: string, value: unknown): string {
  switch (fieldKey) {
    case "dimensions": {
      const d = value as Dimensions;
      return `${d.widthCm} × ${d.heightCm} × ${d.depthCm} cm`;
    }
    case "weight": {
      const w = value as Weight;
      return `${w.valueKg} kg`;
    }
    default:
      return "";
  }
}

import {
  product,
  productFieldDefinitions,
  resolveCategory,
  resolveCollection,
  resolveColors,
  type Dimensions,
  type FieldDefinition,
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

export function EditorForm() {
  return (
    <form className="mx-auto max-w-3xl space-y-8 px-8 py-8">
      {productFieldDefinitions.map((field) => (
        <FormField key={field.key} field={field}>
          {renderInput(field)}
        </FormField>
      ))}
    </form>
  );
}

function renderInput(field: FieldDefinition) {
  const value = product[field.key];

  switch (field.type) {
    case "text":
    case "richtext":
      if (field.isLocalized) {
        return (
          <LocalizedTextInput
            value={(value ?? {}) as LocalizedString}
            multiline={field.type === "richtext"}
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
      // Improvement - Single unified verb pair regardless of single
      // vs. multiple, populated vs. empty, or which referenced model.
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
      return []; // empty in fixture
    default:
      return [];
  }
}

// Baseline Hygraph displays a UUID/hash in a component's collapsed header.
// We synthesize a human summary from the component's actual fields so
// editors can scan for "what's in here?" without having to expand.
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

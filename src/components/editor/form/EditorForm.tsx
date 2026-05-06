import {
  product,
  productFieldDefinitions,
  resolveCategory,
  resolveCollection,
  resolveColors,
  type FieldDefinition,
  type LocalizedString,
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
      return <ComponentField label={field.label} fieldKey={field.key} />;

    case "reference": {
      const items = resolveReferenceItems(field);
      const { primary, secondary } = getReferenceActions(field);
      return (
        <ReferenceField
          items={items}
          primaryAction={primary}
          secondaryAction={secondary}
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

// Six different verb patterns across reference field types in baseline Hygraph.
function getReferenceActions(field: FieldDefinition): {
  primary: string;
  secondary?: string;
} {
  switch (field.key) {
    case "colorIds":
      return { primary: "Add existing entries", secondary: "Create new entry" };
    case "categoryId":
      return {
        primary: "Replace Category",
        secondary: "Create & replace Category",
      };
    case "collectionId":
      return {
        primary: "Replace Collection",
        secondary: "Create & replace Collection",
      };
    case "relatedProductIds":
      return { primary: "Add Related Products" };
    default:
      return { primary: "Add" };
  }
}

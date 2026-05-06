import {
  product,
  productFieldDefinitions,
  type FieldDefinition,
  type LocalizedString,
} from "@/data";
import { BooleanToggle } from "./BooleanToggle";
import { EnumSelect } from "./EnumSelect";
import { FormField } from "./FormField";
import { LocalizedTextInput } from "./LocalizedTextInput";
import { NumberInput } from "./NumberInput";
import { TextInput } from "./TextInput";

const SUPPORTED_TYPES: readonly string[] = [
  "text",
  "richtext",
  "number",
  "enum",
  "boolean",
];

export function EditorForm() {
  const supportedFields = productFieldDefinitions.filter((field) =>
    SUPPORTED_TYPES.includes(field.type),
  );

  return (
    <form className="mx-auto max-w-3xl space-y-8 px-8 py-8">
      {supportedFields.map((field) => (
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

    default:
      return null;
  }
}

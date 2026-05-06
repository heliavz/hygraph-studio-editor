import { product, productFieldDefinitions, type LocalizedString } from "@/data";
import { FormField } from "./FormField";
import { LocalizedTextInput } from "./LocalizedTextInput";
import { TextInput } from "./TextInput";

export function EditorForm() {
  const textFields = productFieldDefinitions.filter(
    (field) => field.type === "text" || field.type === "richtext",
  );

  return (
    <form className="mx-auto max-w-3xl space-y-8 px-8 py-8">
      {textFields.map((field) => {
        const value = product[field.key];

        if (field.isLocalized) {
          return (
            <FormField key={field.key} field={field}>
              <LocalizedTextInput
                value={(value ?? {}) as LocalizedString}
                multiline={field.type === "richtext"}
              />
            </FormField>
          );
        }

        return (
          <FormField key={field.key} field={field}>
            <TextInput value={typeof value === "string" ? value : ""} />
          </FormField>
        );
      })}
    </form>
  );
}

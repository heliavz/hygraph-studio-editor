import { LOCALES, type LocalizedString } from "@/data";

interface LocalizedTextInputProps {
  value: LocalizedString;
  multiline?: boolean;
}

export function LocalizedTextInput({
  value,
  multiline = false,
}: LocalizedTextInputProps) {
  return (
    <div className="space-y-4">
      {LOCALES.map((locale) => (
        <div key={locale.code} className="space-y-1.5">
          <span className="inline-block rounded bg-surface-5 px-1.5 py-0.5 text-xs font-medium text-soft">
            {locale.code}
          </span>
          {multiline ? (
            <textarea
              defaultValue={value[locale.code] ?? ""}
              rows={5}
              className="block w-full rounded-md border border-default bg-canvas px-3 py-2 text-sm text-strong placeholder:text-ghost focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          ) : (
            <input
              type="text"
              defaultValue={value[locale.code] ?? ""}
              className="block w-full rounded-md border border-default bg-canvas px-3 py-2 text-sm text-strong placeholder:text-ghost focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          )}
        </div>
      ))}
    </div>
  );
}

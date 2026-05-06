import {
  COMPLETION_STATUS_LABEL,
  getLocaleCompletionStatus,
  LOCALES,
  type LocaleCompletionStatus,
  type LocalizedString,
} from "@/data";

const CHIP_CLASSES: Record<LocaleCompletionStatus, string> = {
  complete: "bg-success/15 text-success",
  partial: "bg-warning/15 text-warning",
  empty: "bg-danger/15 text-danger",
};

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
      {LOCALES.map((locale) => {
        const status = getLocaleCompletionStatus(value, locale.code);
        return (
          <div key={locale.code} className="group/locale space-y-1.5">
            <div className="flex items-center justify-between">
              <span
                className={`inline-block rounded px-1.5 py-0.5 text-xs font-medium ${CHIP_CLASSES[status]}`}
                title={`${locale.name}: ${COMPLETION_STATUS_LABEL[status]}`}
              >
                {locale.code}
              </span>
              <button
                type="button"
                className="text-xs font-medium text-muted opacity-0 transition-opacity hover:text-strong group-hover/locale:opacity-100 group-focus-within/locale:opacity-100"
              >
                Clear
              </button>
            </div>
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
        );
      })}
    </div>
  );
}

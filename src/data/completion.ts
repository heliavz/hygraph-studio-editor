import { LOCALES } from "./types";
import type { LocaleCode, LocalizedString } from "./types";

export type LocaleCompletionStatus = "complete" | "partial" | "empty";

const PARTIAL_THRESHOLD = 0.6;

/**
 * Evaluate completion status for a localized value at a specific locale.
 *
 * - "complete" - content present, comparable in length to the default locale
 * - "partial"  - content present but significantly shorter than the default
 *                locale (likely an incomplete translation)
 * - "empty"    - no content for this locale
 *
 * The default locale is always either "complete" (has content) or "empty"
 * (doesn't), since there's nothing to compare it against.
 */
export function getLocaleCompletionStatus(
  value: LocalizedString | undefined,
  locale: LocaleCode,
): LocaleCompletionStatus {
  if (!value) return "empty";

  const localeValue = value[locale];
  if (!localeValue || localeValue.trim() === "") return "empty";

  const defaultLocale = LOCALES.find((l) => l.isDefault)?.code;
  if (!defaultLocale || locale === defaultLocale) return "complete";

  const defaultValue = value[defaultLocale];
  if (!defaultValue) return "complete";

  // If a non-default locale value is significantly shorter than
  // the default-locale value, it's probably an incomplete translation.
  if (localeValue.length < defaultValue.length * PARTIAL_THRESHOLD) {
    return "partial";
  }

  return "complete";
}

export const COMPLETION_STATUS_LABEL: Record<LocaleCompletionStatus, string> = {
  complete: "translation complete",
  partial: "likely incomplete (much shorter than default)",
  empty: "translation missing",
};

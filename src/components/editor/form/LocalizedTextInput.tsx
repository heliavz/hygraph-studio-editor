import {
  Bold,
  Code,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Maximize2,
  Quote,
  Subscript,
  Superscript,
  Table,
  Underline,
} from "lucide-react";
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
  richText?: boolean;
  viewMode?: "stacked" | "side-by-side";
}

export function LocalizedTextInput({
  value,
  multiline = false,
  richText = false,
  viewMode = "stacked",
}: LocalizedTextInputProps) {
  const isSideBySide = viewMode === "side-by-side";

  return (
    <div className={isSideBySide ? "grid grid-cols-2 gap-3" : "space-y-4"}>
      {LOCALES.map((locale) => {
        const status = getLocaleCompletionStatus(value, locale.code);
        const localeValue = value[locale.code] ?? "";

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
                className="text-xs font-medium text-muted opacity-0 transition-opacity hover:text-strong group-hover/locale:opacity-100 group-focus-within/locale:opacity-100 hover:cursor-pointer"
              >
                Clear
              </button>
            </div>

            {richText ? (
              <RichTextField html={localeValue} isSideBySide={isSideBySide} />
            ) : multiline ? (
              <textarea
                defaultValue={localeValue}
                rows={isSideBySide ? 8 : 5}
                className="block w-full rounded-md border border-default bg-canvas px-3 py-2 text-sm text-strong placeholder:text-ghost focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            ) : (
              <input
                type="text"
                defaultValue={localeValue}
                className="block w-full rounded-md border border-default bg-canvas px-3 py-2 text-sm text-strong placeholder:text-ghost focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function RichTextField({
  html,
  isSideBySide,
}: {
  html: string;
  isSideBySide: boolean;
}) {
  const minHeight = isSideBySide ? "min-h-48" : "min-h-32";

  return (
    <div className="rounded-md border border-default bg-canvas focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
      <RichTextToolbar />
      <div
        contentEditable
        suppressContentEditableWarning
        className={`prose prose-sm max-w-none px-4 py-3 text-sm text-strong focus:outline-none ${minHeight}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function RichTextToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-muted px-2 py-1.5">
      <ToolbarSelect />
      <ToolbarDivider />
      <ToolbarButton aria-label="Bold">
        <Bold className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton aria-label="Italic">
        <Italic className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton aria-label="Underline">
        <Underline className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarDivider />
      <ToolbarButton aria-label="Link">
        <LinkIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton aria-label="Quote">
        <Quote className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton aria-label="Code">
        <Code className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton aria-label="Image">
        <ImageIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarDivider />
      <ToolbarButton aria-label="Bulleted list">
        <List className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton aria-label="Numbered list">
        <ListOrdered className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarDivider />
      <ToolbarButton aria-label="Table">
        <Table className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton aria-label="Subscript">
        <Subscript className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton aria-label="Superscript">
        <Superscript className="h-3.5 w-3.5" />
      </ToolbarButton>
      <div className="ml-auto">
        <ToolbarButton aria-label="Fullscreen">
          <Maximize2 className="h-3.5 w-3.5" />
        </ToolbarButton>
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="rounded p-1.5 text-soft transition-colors hover:bg-surface-2 hover:text-strong hover:cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}

function ToolbarSelect() {
  return (
    <button
      type="button"
      className="flex items-center gap-1 rounded border border-default bg-canvas px-2 py-1 text-xs text-soft transition-colors hover:bg-surface-2 hover:cursor-pointer"
    >
      Normal text
      <span className="text-muted">▾</span>
    </button>
  );
}

function ToolbarDivider() {
  return <span className="mx-1 h-4 w-px bg-muted" aria-hidden="true" />;
}

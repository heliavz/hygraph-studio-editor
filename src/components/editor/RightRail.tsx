import { ExternalLink, Eye, PanelRightClose, Trash2 } from "lucide-react";
import { LOCALES, product } from "@/data";

export function RightRail() {
  return (
    <aside className="flex w-70 shrink-0 flex-col overflow-y-auto border-l border-muted bg-canvas">
      <Tabs />
      <EntryInfoSection />
      <ScheduleSection />
      <StagesSection />
      <LocalizationsSection />
      <VersionsSection />
      <VariantsSection />
      <PreviewSection />
    </aside>
  );
}

function Tabs() {
  return (
    <div className="flex shrink-0 items-center gap-1 border-b border-muted px-2">
      <button
        type="button"
        aria-label="Collapse panel"
        className="rounded-full p-1 text-muted hover:bg-surface-2 hover:text-strong"
      >
        <PanelRightClose className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="-mb-px border-b-2 border-primary px-3 py-3 text-xs font-semibold uppercase tracking-wider text-strong"
      >
        Info
      </button>
      <button
        type="button"
        className="-mb-px border-b-2 border-transparent px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted hover:text-strong"
      >
        Comments
      </button>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
      {children}
    </div>
  );
}

function EntryInfoSection() {
  return (
    <section className="border-b border-muted px-4 py-4">
      <SectionHeader>Entry Information</SectionHeader>
      <dl className="mt-3 space-y-2.5 text-sm">
        <div className="flex items-center justify-between gap-2">
          <dt className="shrink-0 text-muted">ID</dt>
          <dd className="truncate rounded bg-surface-5 px-2 py-0.5 font-mono text-xs text-soft">
            {product.id}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="shrink-0 text-muted">Created</dt>
          <dd className="flex items-center gap-2 text-soft">
            <span>{formatDate(product.createdAt)}</span>
            <span
              className="h-5 w-5 rounded-full bg-primary-muted"
              aria-hidden="true"
            />
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="shrink-0 text-muted">Last updated</dt>
          <dd className="flex items-center gap-2 text-soft">
            <span>{formatDate(product.updatedAt)}</span>
            <span
              className="h-5 w-5 rounded-full bg-primary-muted"
              aria-hidden="true"
            />
          </dd>
        </div>
      </dl>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section className="border-b border-muted px-4 py-4">
      <SectionHeader>Schedule</SectionHeader>
      <p className="mt-3 text-sm text-soft">
        This feature is available only in our custom plans, please{" "}
        <a href="#" className="text-primary hover:underline">
          upgrade
        </a>
        <ExternalLink className="ml-1 inline h-3 w-3 text-primary" />
      </p>

      <a
        href="#"
        className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        Learn more <ExternalLink className="h-3 w-3" />
      </a>
    </section>
  );
}

function StagesSection() {
  return (
    <section className="border-b border-muted px-4 py-4">
      <SectionHeader>Stages</SectionHeader>
      <p className="mt-3 text-sm text-soft">
        {product.publishedAt ? "Entry is published" : "Entry is not published"}
      </p>
    </section>
  );
}

function LocalizationsSection() {
  return (
    <section className="border-b border-muted px-4 py-4">
      <div className="flex items-center justify-between">
        <SectionHeader>Localizations</SectionHeader>
        <button type="button" className="text-sm text-primary hover:underline">
          Hide all
        </button>
      </div>
      <ul className="mt-3 space-y-2">
        {LOCALES.map((locale) => (
          <li
            key={locale.code}
            className="flex items-center justify-between gap-2 rounded-md border border-default px-3 py-2 text-sm"
          >
            <div className="flex min-w-0 items-center gap-2">
              <Eye className="h-4 w-4 shrink-0 text-muted" />
              <span className="truncate font-medium text-strong">
                {locale.name}
              </span>
              {locale.isDefault && (
                <span className="text-muted">(default)</span>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <span className="rounded bg-primary-muted px-1.5 py-0.5 text-xs font-medium text-primary">
                {locale.code}
              </span>
              <button
                type="button"
                aria-label={`Remove ${locale.name} localization`}
                className="rounded p-1 text-muted hover:bg-surface-2 hover:text-strong"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function VersionsSection() {
  return (
    <section className="border-b border-muted px-4 py-4">
      <SectionHeader>Versions</SectionHeader>
      <p className="mt-3 text-sm text-soft">
        This feature is not available in your plan, please{" "}
        <a href="#" className="text-primary hover:underline">
          upgrade
        </a>
        <ExternalLink className="ml-1 inline h-3 w-3 text-primary" />
      </p>
    </section>
  );
}

function VariantsSection() {
  return (
    <section className="border-b border-muted px-4 py-4">
      <SectionHeader>Variants</SectionHeader>
      <p className="mt-3 text-sm text-soft">
        Unlock the Variants feature with our Enterprise plans.
      </p>

      <a
        href="#"
        className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        Upgrade now or learn more <ExternalLink className="h-3 w-3" />
      </a>
    </section>
  );
}

function PreviewSection() {
  return (
    <section className="px-4 py-4">
      <SectionHeader>Preview</SectionHeader>
      <p className="mt-3 text-sm text-soft">
        Live preview your entry in a split screen as you edit in the content
        form.
      </p>

      <a
        href="#"
        className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        Configure Live Preview here <ExternalLink className="h-3 w-3" />
      </a>
    </section>
  );
}

// "DD Mon YYYY, HH:MM" UTC, matching Hygraph's display format.
function formatDate(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

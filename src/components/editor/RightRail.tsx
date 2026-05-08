"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Eye,
  PanelRightClose,
  PanelRightOpen,
  Trash2,
} from "lucide-react";
import {
  getLocaleCompletionStatus,
  LOCALES,
  product,
  productFieldDefinitions,
  type LocaleCode,
  type LocalizedString,
} from "@/data";

interface RightRailProps {
  viewMode: "stacked" | "side-by-side";
  onToggleViewMode: () => void;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}

export function RightRail({
  viewMode,
  onToggleViewMode,
  isCollapsed,
  onToggleCollapsed,
}: RightRailProps) {
  if (isCollapsed) {
    return (
      <aside className="flex w-10 shrink-0 flex-col items-center border-l border-muted bg-canvas py-3">
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label="Expand info panel"
          className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-2 hover:text-strong hover:cursor-pointer"
        >
          <PanelRightOpen className="h-4 w-4" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="relative flex w-70 shrink-0 flex-col overflow-y-auto border-l border-muted bg-canvas">
      <CollapseHandle onToggle={onToggleCollapsed} />
      <Tabs />
      <EntryInfoSection />
      <StagesSection />
      <LocalizationsSection
        viewMode={viewMode}
        onToggleViewMode={onToggleViewMode}
      />
      <UpgradesSection />
      <PreviewSection />
    </aside>
  );
}

function CollapseHandle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Collapse info panel"
      className="absolute left-2 top-2 z-10 rounded-md border border-default bg-canvas p-1 text-muted shadow-sm transition-colors hover:bg-surface-2 hover:text-strong hover:cursor-pointer"
    >
      <PanelRightClose className="h-3.5 w-3.5" />
    </button>
  );
}

function Tabs() {
  return (
    <div className="flex shrink-0 border-b border-muted px-4 pl-12">
      <button
        type="button"
        className="-mb-px border-b-2 border-primary px-3 py-3 text-xs font-semibold uppercase tracking-wider text-strong transition-colors hover:cursor-pointer"
      >
        Info
      </button>
      <button
        type="button"
        className="-mb-px border-b-2 border-transparent px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-strong hover:cursor-pointer"
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

function LocalizationsSection({
  viewMode,
  onToggleViewMode,
}: {
  viewMode: "stacked" | "side-by-side";
  onToggleViewMode: () => void;
}) {
  const localizedFields = productFieldDefinitions.filter((f) => f.isLocalized);

  function getCompletionCounts(localeCode: LocaleCode) {
    const statuses = localizedFields.map((f) => {
      const value = product[f.key] as LocalizedString | undefined;
      return getLocaleCompletionStatus(value, localeCode);
    });
    return {
      complete: statuses.filter((s) => s === "complete").length,
      partial: statuses.filter((s) => s === "partial").length,
      empty: statuses.filter((s) => s === "empty").length,
      total: localizedFields.length,
    };
  }

  return (
    <section className="border-b border-muted px-4 py-4">
      <div className="flex items-center justify-between">
        <SectionHeader>Localizations</SectionHeader>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleViewMode}
            title={
              viewMode === "stacked"
                ? "Switch to side-by-side view"
                : "Switch to stacked view"
            }
            className="rounded px-1.5 py-0.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:cursor-pointer"
          >
            {viewMode === "stacked" ? "↔" : "↕"}
          </button>
          <button
            type="button"
            className="text-sm text-primary transition-colors hover:underline hover:cursor-pointer"
          >
            Hide all
          </button>
        </div>
      </div>

      <ul className="mt-3 space-y-2">
        {LOCALES.map((locale) => {
          const { complete, partial, empty, total } = getCompletionCounts(
            locale.code,
          );
          const allComplete = complete === total;

          return (
            <li
              key={locale.code}
              className="rounded-md border border-default p-3 transition-colors hover:border-strong"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Toggle visibility of ${locale.name}`}
                    className="rounded p-1 text-muted transition-colors hover:bg-surface-2 hover:text-strong hover:cursor-pointer"
                  >
                    <Eye className="h-4 w-4 shrink-0" />
                  </button>
                  <span className="truncate text-sm font-medium text-strong">
                    {locale.name}
                  </span>
                  {locale.isDefault && (
                    <span className="text-sm text-muted">(default)</span>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <span className="rounded bg-primary-muted px-1.5 py-0.5 text-xs font-medium text-primary">
                    {locale.code}
                  </span>
                  <button
                    type="button"
                    disabled={locale.isDefault}
                    aria-label={
                      locale.isDefault
                        ? `Cannot remove default locale ${locale.name}`
                        : `Remove ${locale.name} localization`
                    }
                    title={
                      locale.isDefault
                        ? "The default locale can't be removed"
                        : undefined
                    }
                    className="rounded p-1 text-muted transition-colors hover:bg-surface-2 hover:text-strong hover:cursor-pointer disabled:cursor-not-allowed disabled:text-disabled disabled:hover:bg-transparent disabled:hover:text-disabled"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div
                className="mt-2.5 flex h-1.5 w-full overflow-hidden rounded-full bg-surface-5"
                role="progressbar"
                aria-label={`${locale.name} translation progress`}
                aria-valuenow={complete}
                aria-valuemin={0}
                aria-valuemax={total}
              >
                <div
                  className="bg-success transition-all"
                  style={{ width: `${(complete / total) * 100}%` }}
                />
                <div
                  className="bg-warning transition-all"
                  style={{ width: `${(partial / total) * 100}%` }}
                />
              </div>

              <p className="mt-1.5 text-xs">
                {allComplete ? (
                  <span className="text-success">
                    All {total} fields translated
                  </span>
                ) : (
                  <span className="text-muted">
                    <span className="text-success">{complete} complete</span>
                    {partial > 0 && (
                      <>
                        {" · "}
                        <span className="text-warning">{partial} partial</span>
                      </>
                    )}
                    {empty > 0 && <> · {empty} missing</>}
                  </span>
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function UpgradesSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="border-b border-muted px-4 py-4">
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between transition-colors hover:cursor-pointer"
      >
        <SectionHeader>Upgrade to unlock</SectionHeader>
        {isExpanded ? (
          <ChevronDown className="h-3.5 w-3.5 text-muted" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 text-muted" />
        )}
      </button>
      {isExpanded && (
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <span className="font-medium text-strong">Schedule publishing</span>
            <span className="text-soft"> - </span>
            <a
              href="#"
              className="text-primary transition-colors hover:underline"
            >
              upgrade
            </a>
          </li>
          <li>
            <span className="font-medium text-strong">Content versions</span>
            <span className="text-soft"> - </span>
            <a
              href="#"
              className="text-primary transition-colors hover:underline"
            >
              upgrade
            </a>
          </li>
          <li>
            <span className="font-medium text-strong">Variants</span>
            <span className="text-soft"> - </span>
            <a
              href="#"
              className="text-primary transition-colors hover:underline"
            >
              upgrade
            </a>
          </li>
        </ul>
      )}
    </section>
  );
}

function PreviewSection() {
  return (
    <section className="border-b border-muted px-4 py-4">
      <SectionHeader>Preview</SectionHeader>
      <p className="mt-3 text-sm text-soft">
        Live preview your entry in a split screen as you edit in the content
        form.
      </p>

      <a
        href="#"
        className="mt-2 inline-flex items-center gap-1 text-sm text-primary transition-colors hover:underline"
      >
        Configure Live Preview here <ExternalLink className="h-3 w-3" />
      </a>
    </section>
  );
}

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

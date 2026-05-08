import {
  ArrowUp,
  Bell,
  ChevronsUpDown,
  Clock,
  HelpCircle,
  MessageSquare,
  Search,
  Sparkles,
} from "lucide-react";

export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-muted bg-canvas pr-3">
      {/* Left: workspace + environment switcher */}
      <button
        type="button"
        className="group flex flex-1 rounded-md items-center gap-2 bg-success-muted px-2.5 py-1.5 transition-colors hover:bg-primary-muted hover:cursor-pointer"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-strong text-[11px] font-semibold text-white">
          TE
        </span>
        <span className="text-sm font-medium text-strong">Testing</span>
        <span className="text-ghost">·</span>
        <span className="text-sm text-success group-hover:text-soft">
          Master Environment
        </span>

        {/* Revealed on hover: tier pill + switch hint */}
        <span className="ml-1 hidden items-center rounded-full border border-default bg-canvas px-2 py-0.5 text-xs font-medium text-soft group-hover:inline-flex">
          Hobby
        </span>

        <span className="ml-auto hidden items-center gap-1 text-xs text-soft group-hover:inline-flex">
          switch
          <ChevronsUpDown className="h-3.5 w-3.5" />
        </span>
      </button>

      {/* Center: upgrade CTA + search */}
      <div className="flex flex-1 items-center justify-center gap-3">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-default bg-canvas px-3 py-1.5 text-sm font-medium text-body shadow-sm transition-colors hover:bg-surface-2 hover:cursor-pointer"
        >
          <ArrowUp className="h-3.5 w-3.5 text-muted" />
          Upgrade your plan
        </button>
        <div className="group flex w-full max-w-md items-center gap-2 rounded-md border border-default bg-canvas px-3 py-1.5 transition-colors hover:border-strong focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <Search className="h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-sm text-body placeholder:text-ghost focus:outline-none"
          />
          <kbd className="hidden items-center gap-0.5 rounded border border-muted bg-surface-2 px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted group-hover:inline-flex">
            Ctrl + K
          </kbd>
          <button
            type="button"
            aria-label="Recent searches"
            className="rounded p-0.5 text-muted transition-colors hover:bg-surface-2 hover:text-soft hover:cursor-pointer"
          >
            <Clock className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Right: AI Assist + helper icons + avatar */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="mr-1 flex items-center gap-1.5 rounded-md bg-primary-muted px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary-muted/70 hover:cursor-pointer"
        >
          <Sparkles className="h-5 w-5" />
          AI Assist
        </button>
        <IconButton aria-label="Help">
          <HelpCircle className="h-5 w-5" />
        </IconButton>
        <IconButton aria-label="Comments">
          <MessageSquare className="h-5 w-5" />
        </IconButton>
        <IconButton aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </IconButton>
        <div
          className="ml-1 h-8 w-8 rounded-full bg-primary-muted"
          role="img"
          aria-label="User avatar"
        />
      </div>
    </header>
  );
}

function IconButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="rounded-md p-2 text-muted transition-colors hover:bg-surface-2 hover:text-soft hover:cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}

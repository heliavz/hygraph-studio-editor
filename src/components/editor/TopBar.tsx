import {
  ArrowUp,
  Bell,
  Clock,
  HelpCircle,
  MessageSquare,
  Search,
  Sparkles,
} from "lucide-react";

export function TopBar() {
  return (
    <header className="flex h-14 items-center justify-between gap-3 border-b border-muted bg-canvas px-3">
      {/* Left: workspace + environment */}
      <div className="flex items-center gap-2 rounded-md bg-success-muted px-2.5 py-1.5">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-strong text-[11px] font-semibold text-white">
          TE
        </span>
        <span className="text-sm font-medium text-strong">Testing</span>
        <span className="text-ghost">·</span>
        <span className="text-sm text-success">Master Environment</span>
      </div>

      {/* Center: upgrade CTA + search */}
      <div className="flex flex-1 items-center justify-center gap-3">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-default bg-canvas px-3 py-1.5 text-sm font-medium text-body shadow-sm hover:bg-surface-2"
        >
          <ArrowUp className="h-3.5 w-3.5 text-muted" />
          Upgrade your plan
        </button>
        <div className="flex w-full max-w-md items-center gap-2 rounded-md border border-default bg-canvas px-3 py-1.5">
          <Search className="h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-sm text-body placeholder:text-ghost focus:outline-none"
          />
          <Clock className="h-4 w-4 text-muted" />
        </div>
      </div>

      {/* Right: AI Assist + helper icons + avatar */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="mr-1 flex items-center gap-1.5 rounded-md bg-primary-muted px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-muted/80"
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
      className="rounded-md p-2 text-muted hover:bg-surface-2 hover:text-soft"
      {...props}
    >
      {children}
    </button>
  );
}

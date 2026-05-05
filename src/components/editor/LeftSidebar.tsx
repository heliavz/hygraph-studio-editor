import {
  Code,
  Database,
  FileText,
  Home,
  Image as ImageIcon,
  LayoutGrid,
  Settings,
} from "lucide-react";

const mainNav = [
  { label: "Home", icon: Home, active: false },
  { label: "Schema", icon: Database, active: false },
  { label: "Content", icon: FileText, active: true },
  { label: "Assets", icon: ImageIcon, active: false },
  { label: "API Playground", icon: Code, active: false },
];

const bottomNav = [
  { label: "Apps", icon: LayoutGrid },
  { label: "Project Settings", icon: Settings },
];

export function LeftSidebar() {
  return (
    <aside className="flex w-50 shrink-0 flex-col border-r border-muted bg-canvas">
      {/* Logo + wordmark */}
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-strong text-sm font-bold text-white">
          h
        </div>
        <span className="text-sm font-semibold text-strong">hygraph</span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
          studio
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-2 py-2">
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                item.active
                  ? "bg-primary-muted font-medium text-primary"
                  : "text-soft hover:bg-surface-2 hover:text-strong"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Pinned bottom items */}
      <nav className="border-t border-muted px-2 py-2">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-soft hover:bg-surface-2 hover:text-strong"
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

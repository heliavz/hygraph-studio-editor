import { LeftSidebar } from "@/components/editor/LeftSidebar";
import { TopBar } from "@/components/editor/TopBar";

export default function EditorPage() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        {/* Field outline column */}
        <div className="w-55 shrink-0 border-r border-muted bg-canvas" />

        {/* Center form area */}
        <div className="flex-1 overflow-auto bg-surface-1" />

        {/* Right rail */}
        <div className="w-55 shrink-0 border-l border-muted bg-canvas" />
      </div>
    </div>
  );
}

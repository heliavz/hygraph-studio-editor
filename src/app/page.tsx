"use client";

import { useState } from "react";
import { EditorForm } from "@/components/editor/form/EditorForm";
import { EntryHeader } from "@/components/editor/EntryHeader";
import { FieldOutline } from "@/components/editor/FieldOutline";
import { LeftSidebar } from "@/components/editor/LeftSidebar";
import { RightRail } from "@/components/editor/RightRail";
import { TopBar } from "@/components/editor/TopBar";
import type { FieldSection } from "@/data";

export default function EditorPage() {
  const [collapsedSections, setCollapsedSections] = useState<Set<FieldSection>>(
    new Set(),
  );
  const [viewMode, setViewMode] = useState<"stacked" | "side-by-side">(
    "stacked",
  );

  const toggleSection = (section: FieldSection) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const toggleViewMode = () =>
    setViewMode((m) => (m === "stacked" ? "side-by-side" : "stacked"));

  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <EntryHeader />
          <div className="flex flex-1 overflow-hidden">
            <FieldOutline
              collapsedSections={collapsedSections}
              onToggleSection={toggleSection}
            />
            <div className="flex-1 overflow-auto scroll-smooth bg-canvas">
              <EditorForm
                collapsedSections={collapsedSections}
                onToggleSection={toggleSection}
                viewMode={viewMode}
              />
            </div>
            <RightRail viewMode={viewMode} onToggleViewMode={toggleViewMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

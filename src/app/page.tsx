import { EditorForm } from "@/components/editor/form/EditorForm";
import { EntryHeader } from "@/components/editor/EntryHeader";
import { FieldOutline } from "@/components/editor/FieldOutline";
import { LeftSidebar } from "@/components/editor/LeftSidebar";
import { RightRail } from "@/components/editor/RightRail";
import { TopBar } from "@/components/editor/TopBar";

export default function EditorPage() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <EntryHeader />
          <div className="flex flex-1 overflow-hidden">
            <FieldOutline />
            <div className="flex-1 overflow-auto bg-canvas">
              <EditorForm />
            </div>
            <RightRail />
          </div>
        </div>
      </div>
    </div>
  );
}

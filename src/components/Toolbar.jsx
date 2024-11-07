import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  return (
    <div className="flex gap-2 mb-2">
      <ToggleGroup type="single">
        <ToggleGroupItem
          value="bold"
          area-label="Toggle Bold"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
        >
          <Bold className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          area-label="Toggle Italic"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
        >
          <Italic className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline object-cover"
          area-label="Toggle UnderLine"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
        >
          <Underline className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default Toolbar;

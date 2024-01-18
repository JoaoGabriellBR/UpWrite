import { Icons } from "@/components/icons";
import { Toggle } from "@/components/ui/toggle";
import { BubbleMenu } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from "lucide-react";
import { NodeSelector } from "./node-selector";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ColorSelector } from "./color-selector";

export default function TiptapMenuBar({ editor }: any) {
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);

  const items: any = [
    {
      name: "bold",
      isActive: () => editor.isActive("bold"),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: () => editor.isActive("italic"),
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: () => editor.isActive("underline"),
      command: () => editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: () => editor.isActive("strike"),
      command: () => editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
  ];

  return (
    <>
      <BubbleMenu
        editor={editor}
        updateDelay={0}
        className="bg-card flex w-fit divide-x divide-secondary rounded border border-secondary shadow-xl"
        // className="w-fit flex flex-row flex-wrap justify-start items-center py-3 bg-card"
      >
        <NodeSelector
          editor={editor}
          isOpen={isNodeSelectorOpen}
          setIsOpen={() => {
            setIsNodeSelectorOpen(!isNodeSelectorOpen);
            setIsColorSelectorOpen(false);
            setIsLinkSelectorOpen(false);
          }}
        />

        <div className="flex">
          {items.map((item: any, index: any) => (
            <button
              key={index}
              onClick={item.command}
              className="p-2 text-sm bg-card hover:bg-accent"
              type="button"
            >
              <item.icon
                className={cn("h-4 w-4", {
                  "text-primary": item.isActive(),
                })}
              />
            </button>
          ))}
        </div>

        <ColorSelector
          editor={editor}
          isOpen={isColorSelectorOpen}
          setIsOpen={() => {
            setIsColorSelectorOpen(!isColorSelectorOpen);
            setIsNodeSelectorOpen(false);
            setIsLinkSelectorOpen(false);
          }}
        />

        {/* <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Icons.bold className="h-3.5 w-3.5" />
        </Toggle>

        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Icons.italic className="h-3.5 w-3.5" />
        </Toggle>

        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Icons.underline className="h-3.5 w-3.5" />
        </Toggle>

        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Icons.strikethrough className="h-3.5 w-3.5" />
        </Toggle>

        <Toggle
          variant="outline"
          aria-label="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <Icons.paragraph className="h-4 w-4" />
        </Toggle>

        <Toggle
          variant="outline"
          aria-label="Block Quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <Icons.blockquote className="h-4 w-4" />
        </Toggle>

        <Toggle
          variant="outline"
          aria-label="Code"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <Icons.code className="h-4 w-4" />
        </Toggle>

        <Toggle
          variant="outline"
          aria-label="Align Left"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <Icons.alignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          variant="outline"
          aria-label="Align Center"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          <Icons.alignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          variant="outline"
          aria-label="Align Right"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <Icons.alignRight className="h-4 w-4" />
        </Toggle>
        <Toggle
          variant="outline"
          aria-label="Align Justify"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
        >
          <Icons.alignJustify className="h-4 w-4" />
        </Toggle> */}
      </BubbleMenu>
    </>
  );
}

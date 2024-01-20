import { BubbleMenu } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  AlignCenter,
  AlignRight,
  AlignJustify,
  AlignLeft,
} from "lucide-react";
import { NodeSelector } from "./node-selector";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ColorSelector } from "./color-selector";
import { LinkSelector } from "./link-selector";
import { TooltipComponent } from "../ui/tooltip";

export default function TiptapMenuBar({ editor }: any) {
  
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);

  const items: any = [
    {
      name: "bold",
      label: "Negrito",
      isActive: () => editor.isActive("bold"),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      label: "Itálico",
      isActive: () => editor.isActive("italic"),
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      label: "Sublinhado",
      isActive: () => editor.isActive("underline"),
      command: () => editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      label: "Tachado",
      isActive: () => editor.isActive("strike"),
      command: () => editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "align left",
      label: "Alinhar à esquerda",
      command: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: () => editor.isActive({ textAlign: "left" }),
      icon: AlignLeft,
    },
    {
      name: "align center",
      label: "Alinhar ao centro",
      command: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: () => editor.isActive({ textAlign: "center" }),
      icon: AlignCenter,
    },
    {
      name: "align center",
      label: "Alinhar à direita",
      command: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: () => editor.isActive({ textAlign: "right" }),
      icon: AlignRight,
    },
    {
      name: "justify",
      label: "Justificar",
      command: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: () => editor.isActive({ textAlign: "justify" }),
      icon: AlignJustify,
    },
  ];

  return (
    <>
      <BubbleMenu
        editor={editor}
        updateDelay={0}
        className="bg-card flex w-fit divide-x divide-secondary rounded border border-secondary shadow-xl"
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

        <LinkSelector
          editor={editor}
          isOpen={isLinkSelectorOpen}
          setIsOpen={() => {
            setIsLinkSelectorOpen(!isLinkSelectorOpen);
            setIsColorSelectorOpen(false);
            setIsNodeSelectorOpen(false);
          }}
        />

        <div className="flex">
          {items.map((item: any, index: any) => (
            <TooltipComponent text={item.label} key={index} delayDuration={0}>
              <button
                onClick={item.command}
                className="p-2 text-xs bg-card hover:bg-accent"
                type="button"
              >
                <item.icon
                  className={cn("h-3.5 w-3.5", {
                    "text-primary": item.isActive(),
                  })}
                />
              </button>
            </TooltipComponent>
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
      </BubbleMenu>
    </>
  );
}

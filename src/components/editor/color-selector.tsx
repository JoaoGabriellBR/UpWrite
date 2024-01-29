import { Check, ChevronDown } from "lucide-react";
import { FC } from "react";
import * as Popover from "@radix-ui/react-popover";
import { BubbleColorMenuItem, ColorSelectorProps } from "@/lib/types";

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Padrão",
    color: "var(--black)",
  },
  {
    name: "Roxo",
    color: "#9333EA",
  },
  {
    name: "Vermelho",
    color: "#E00000",
  },
  {
    name: "Amarelo",
    color: "#EAB308",
  },
  {
    name: "Azul",
    color: "#2563EB",
  },
  {
    name: "Verde",
    color: "#008A00",
  },
  {
    name: "Laranja",
    color: "#FFA500",
  },
  {
    name: "Rosa",
    color: "#BA4081",
  },
  {
    name: "Cinza",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Padrão",
    color: "var(--highlight-default)",
  },
  {
    name: "Roxo",
    color: "var(--highlight-purple)",
  },
  {
    name: "vermelho",
    color: "var(--highlight-red)",
  },
  {
    name: "amarelo",
    color: "var(--highlight-yellow)",
  },
  {
    name: "azul",
    color: "var(--highlight-blue)",
  },
  {
    name: "verde",
    color: "var(--highlight-green)",
  },
  {
    name: "laranja",
    color: "var(--highlight-orange)",
  },
  {
    name: "rosa",
    color: "var(--highlight-pink)",
  },
  {
    name: "cinza",
    color: "var(--highlight-gray)",
  },
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger
          className="flex h-full items-center gap-1 p-2 text-xs font-medium hover:bg-accent active:bg-secondary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className="rounded-sm px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>

          <ChevronDown className="h-4 w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="bg-card z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-secondary p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <div className="my-1 px-2 text-xs">Cor</div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                if (name === "Padrão") {
                  editor.commands.unsetColor();
                } else {
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
                }
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-xs bg-card hover:bg-accent"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border border-secondary px-1 py-px font-medium"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("textStyle", { color }) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}

          <div className="mb-1 mt-2 px-2 text-xs">Fundo</div>

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== "Padrão" && editor.commands.setHighlight({ color });
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-xs bg-card hover:bg-accent"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="text-secondary rounded-sm border border-secondary px-1 py-px font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>Fundo {name}</span>
              </div>
              {editor.isActive("highlight", { color }) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};

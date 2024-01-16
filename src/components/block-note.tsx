
import { useTheme } from "next-themes";
import { BlockNoteEditor, type PartialBlock } from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  darkDefaultTheme,
  Theme,
} from "@blocknote/react";
// import "@blocknote/react/style.css";
import "@blocknote/core/style.css";


export default function Editor() {
  const { resolvedTheme } = useTheme();
  const editor: BlockNoteEditor = useBlockNote({ editable: false });

  const darkTheme = {
    colors: {
      editor: {
        text: "#ffffff",
        background: "#09090b",
      },
      menu: {
        text: "#bababa",
        background: "#09090b",
      },
      tooltip: {
        text: "#ffffff",
        background: "#09090b",
      },
      hovered: {
        text: "#ffffff",
        background: "#100c0cc",
      },
      selected: {
        text: "#ffffff",
        background: "#100c0c0",
      },
      disabled: {
        text: "#09090b",
        background: "#09090b",
      },
      shadow: "#09090b",
      border: "#09090b",
      sideMenu: "#bababa",
      highlights: darkDefaultTheme?.colors?.highlights,
    },
    fontFamily: "Poppins, sans-serif",
  } satisfies Theme;

  return (
    <div className="w-full h-full">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? darkTheme : "light"}
        // placeholder={`Adicione um texto, ou pressione "/" para comandos.`}
      />
    </div>
  );
}

import { EditorContent, useEditor } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import TiptapMenuBar from "./tiptap-menubar";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TiptapLink from "@tiptap/extension-link";
import Dropcursor from "@tiptap/extension-dropcursor";
import { Markdown } from "tiptap-markdown";
import SlashCommand from "./slash-command";
// import { EditorProps } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import "./styles/prosemirror.css";
import "./styles/colors.css";
import { useDebounce } from "usehooks-ts";
import { useEffect, useRef } from "react";

export interface EditorProps {
  form: any;
  content: any;
  handleChangeContent: (params: { editor: any; version?: string }) => void;
  onTitleChange?: (title: string) => void;
  readOnly?: boolean;
  version?: string;
}

export default function Editor({
  form,
  content,
  handleChangeContent,
  onTitleChange,
  readOnly = false,
  version,
}: EditorProps) {
  // Referências para controlar o estado de edição
  const isUserEditingRef = useRef(false);
  const lastUserInteractionRef = useRef(0);
  const editorInitializedRef = useRef(false);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "outline-none w-full h-full",
      },
    },
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside leading-3 -mt-2",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside leading-3 -mt-2",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "leading-normal -mb-2",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: "rounded-sm p-5 font-medium",
          },
        },
        code: {
          HTMLAttributes: {
            class: "rounded-md px-1.5 py-1 font-mono font-medium",
            spellcheck: "false",
          },
        },
        horizontalRule: false,
        dropcursor: {
          color: "#DBEAFE",
          width: 4,
        },
        gapcursor: false,
      }),
      Underline,
      Text,
      TextStyle,
      Dropcursor,
      SlashCommand,
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return `Título ${node.attrs.level}`;
          }
          return "Escreva algo, ou pressione '/' para comandos.";
        },
        includeChildren: true,
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "not-prose pl-2",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "flex items-start my-4",
        },
        nested: true,
      }),
      Markdown.configure({
        html: false,
        transformCopiedText: true,
        transformPastedText: true,
      }),
      TiptapLink.configure({
        HTMLAttributes: {
          class:
            "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      if (!readOnly) {
        // Marca que o usuário está editando ativamente
        isUserEditingRef.current = true;
        lastUserInteractionRef.current = Date.now();

        // Para de considerar que está editando após 2 segundos de inatividade
        setTimeout(() => {
          if (Date.now() - lastUserInteractionRef.current >= 2000) {
            isUserEditingRef.current = false;
          }
        }, 2000);

        handleChangeContent({ editor, version });
      }
    },
    onCreate({ editor }) {
      // Marca que o editor foi inicializado
      editorInitializedRef.current = true;
    },
    onFocus() {
      // Quando o editor ganha foco, marca como editando
      isUserEditingRef.current = true;
      lastUserInteractionRef.current = Date.now();
    },
    onBlur() {
      // Quando perde o foco, para de considerar como editando após um delay
      setTimeout(() => {
        if (Date.now() - lastUserInteractionRef.current >= 1000) {
          isUserEditingRef.current = false;
        }
      }, 1000);
    },
    editable: !readOnly,
  });

  // Effect otimizado para sincronização de conteúdo
  useEffect(() => {
    // Só sincroniza se:
    // 1. Editor existe e foi inicializado
    // 2. Há conteúdo para sincronizar
    // 3. Usuário não está editando ativamente
    // 4. O conteúdo realmente mudou
    if (
      editor &&
      editorInitializedRef.current &&
      content &&
      !isUserEditingRef.current
    ) {
      const currentContent = editor.getJSON();
      const contentChanged =
        JSON.stringify(currentContent) !== JSON.stringify(content);

      if (contentChanged) {
        // Preserva a seleção atual se possível
        const selection = editor.state.selection;

        // Atualiza o conteúdo sem interferir na digitação
        editor.commands.setContent(content, false);

        // Tenta restaurar a seleção se ainda for válida
        try {
          if (selection && selection.from <= editor.state.doc.content.size) {
            editor.commands.setTextSelection(selection);
          }
        } catch (e) {
          // Se não conseguir restaurar a seleção, não faz nada
          console.debug("Could not restore selection after content update");
        }
      }
    }
  }, [content, editor]);

  // Effect para inicializar o conteúdo quando o editor é criado
  useEffect(() => {
    if (editor && content && !editorInitializedRef.current) {
      editor.commands.setContent(content);
      editorInitializedRef.current = true;
    }
  }, [editor, content]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    form.setValue("title", newTitle);
    if (onTitleChange) {
      onTitleChange(newTitle);
    }
  };

  if (!editor) return null;

  return (
    <>
      <TiptapMenuBar editor={editor} />

      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  onChange={handleTitleChange}
                  outline
                  placeholder="Sem título"
                  className="pl-0 py-7 border-none font-bold placeholder:font-normal placeholder:opacity-40 scroll-m-20 tracking-tight text-2xl md:text-3xl lg:text-4xl"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
      </Form>

      <EditorContent
        className="tight-padding h-full w-full max-w-none prose prose-sm prose-stone dark:prose-invert md:prose-base dark:prose-pre:bg-secondary/70"
        editor={editor}
      />
    </>
  );
}

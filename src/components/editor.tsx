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
import Bold from "@tiptap/extension-bold";
import { Markdown } from "tiptap-markdown";
import { EditorProps } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import "../components/colors.css";
import "../components/prosemirror.css";

export default function Editor({
  form,
  content,
  handleChangeContent,
}: EditorProps) {
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
            class:
              "list-decimal list-outside leading-3 -mt-2",
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
            class:
              "rounded-sm p-5 font-medium",
          },
        },
        code: {
          HTMLAttributes: {
            class:
              "rounded-md px-1.5 py-1 font-mono font-medium",
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
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Escreva algo...",
        // emptyEditorClass:
        //   "before:select-none before:pointer-events-none before:float-left before:h-0 before:text-muted-foreground before:content-[attr(data-placeholder)]",
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
    ],
    content: content,
    onUpdate: ({ editor }) => handleChangeContent({ editor }),
  });

  if (!editor) return null;

  return (
    <>
      <TiptapMenuBar editor={editor} />

      {/* <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  outline
                  placeholder="Sem título"
                  className="pl-0 py-7 border-none font-bold placeholder:font-normal placeholder:opacity-40 scroll-m-20 tracking-tight text-2xl md:text-3xl lg:text-4xl"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
      </Form> */}

      <EditorContent
        className="tight-padding h-full w-full max-w-none prose prose-sm prose-stone dark:prose-invert md:prose-base dark:prose-pre:bg-secondary/70"
        editor={editor}
      />
    </>
  );
}

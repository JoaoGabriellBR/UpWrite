// import { EditorContent, useEditor } from "@tiptap/react";
// import { Input } from "@/components/ui/input";
// import TiptapMenuBar from "./tiptap-menubar";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import TextAlign from "@tiptap/extension-text-align";
// import Underline from "@tiptap/extension-underline";
// import { EditorProps } from "@/lib/types";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";

// export default function Editor({
//   form,
//   content,
//   handleChangeContent,
// }: EditorProps) {

//   const editor = useEditor({
//     editorProps: {
//       attributes: {
//         class: "outline-none w-full h-full",
//       },
//     },
//     extensions: [
//       StarterKit.configure({
//         bulletList: {
//           keepMarks: true,
//           keepAttributes: false,
//         },
//         orderedList: {
//           keepMarks: true,
//           keepAttributes: false,
//         },
//       }),
//       Underline,
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),
//       Placeholder.configure({
//         placeholder: "Escreva algo...",
//         emptyEditorClass:
//           "before:select-none before:pointer-events-none before:float-left before:h-0 before:text-muted-foreground before:content-[attr(data-placeholder)]",
//       }),
//     ],
//     content: content,
//     onUpdate: ({ editor }) => handleChangeContent({ editor }),
//   });

//   if (!editor) return null;

//   return (
//     <>
//       <TiptapMenuBar editor={editor} />
      
//       <Form {...form}>
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormControl>
//                 <Input
//                   {...field}
//                   outline
//                   placeholder="Sem título"
//                   className="pl-0 py-7 border-none font-bold placeholder:font-normal placeholder:opacity-40 scroll-m-20 tracking-tight text-2xl md:text-3xl lg:text-4xl"
//                 />
//               </FormControl>
//               <FormMessage className="text-sm" />
//             </FormItem>
//           )}
//         />
//       </Form>

//       <EditorContent
//         className="h-full w-full max-w-none prose prose-sm prose-stone dark:prose-invert md:prose-base dark:prose-pre:bg-secondary/70"
//         editor={editor}
//       />

//     </>
//   );
// }


import { Editor as NovelEditor } from "novel";

export default function Editor() {
  return (
     <NovelEditor className="dark dark-theme" />
  )
}


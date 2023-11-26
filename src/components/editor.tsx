import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import { Input } from "@/components/ui/input";
import TiptapMenuBar from './tiptap-menubar';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

interface EditorProps {
    note?: any;
    content: any;
    placeholder?: string;
    handleChangeContent: (newValue: JSONContent) => void;
}

export default function Editor({ content, handleChangeContent, placeholder }: EditorProps) {

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'outline-none w-full'
            }
        },
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: placeholder ?? 'Escreva algo...',
                emptyEditorClass:
                    'before:select-none before:pointer-events-none before:float-left before:h-0 before:text-muted-foreground before:content-[attr(data-placeholder)]'
            })
        ],
        content: content,
        onUpdate: ({ editor }) => handleChangeContent({ editor })
    });

    if (!editor) return null;

    return (
        <>
            <TiptapMenuBar editor={editor} />
            <Input outline placeholder="Sem título" className="font-bold py-7 px-0 border-none placeholder:font-normal scroll-m-20 text-5xl tracking-tight lg:text-4xl" />
            <EditorContent
                className="prose prose-sm prose-stone max-w-full dark:prose-invert md:prose-base dark:prose-pre:bg-secondary/70"
                editor={editor}
            />
        </>
    )
}
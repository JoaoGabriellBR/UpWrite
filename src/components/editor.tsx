import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Input } from "@/components/ui/input";
import TiptapMenuBar from './tiptap-menubar';

interface EditorProps {
    content: any;
    placeholder?: string;
    handleChangeContent: (newValue: JSONContent) => void;
}

export default function Editor({ content, handleChangeContent, placeholder }: EditorProps) {

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'outline-none'
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
            Placeholder.configure({
                placeholder: placeholder ?? 'Write something...',
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
            <Input outline placeholder="Título" className="border-none py-7 placeholder:opacity-70 scroll-m-20 text-2xl tracking-tight lg:text-3xl" />
            <EditorContent
                className="prose prose-sm prose-stone max-w-full dark:prose-invert md:prose-base dark:prose-pre:bg-secondary/70"
                editor={editor}
            />
        </>
    )
}
import { EditorContent, useEditor } from '@tiptap/react';
import { Input } from "@/components/ui/input";
import TiptapMenuBar from './tiptap-menubar';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorProps } from '@/lib/types';

export default function Editor({ title, content, handleChangeTitle, handleChangeContent }: EditorProps) {

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
                placeholder: 'Escreva algo...',
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
            <Input
                outline
                value={title}
                onChange={handleChangeTitle}
                placeholder="Sem título"
                className="py-7 px-0 border-none font-bold placeholder:font-normal placeholder:opacity-40 scroll-m-20 tracking-tight text-2xl md:text-3xl lg:text-4xl"
            />
            <EditorContent
                className="prose prose-sm prose-stone max-w-full dark:prose-invert md:prose-base dark:prose-pre:bg-secondary/70"
                editor={editor}
            />
        </>
    )
}
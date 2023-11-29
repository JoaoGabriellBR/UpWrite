import { EditorContent, useEditor } from '@tiptap/react';
import { Input } from "@/components/ui/input";
import TiptapMenuBar from './tiptap-menubar';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorProps } from '@/lib/types';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

export default function Editor({ form, content, handleChangeContent }: EditorProps) {

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'outline-none w-full h-full'
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
            <section className="flex flex-col items-start max-w-3xl mx-auto px-4 py-10">
                <TiptapMenuBar editor={editor} />
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        outline
                                        placeholder="Sem título"
                                        className="py-7 px-0 border-none font-bold placeholder:font-normal placeholder:opacity-40 scroll-m-20 tracking-tight text-2xl md:text-3xl lg:text-4xl"
                                    />
                                </FormControl>
                                <FormMessage className="text-sm" />
                            </FormItem>
                        )}
                    />
                </Form>
                <EditorContent
                    className="prose prose-sm prose-stone w-full max-w-full dark:prose-invert md:prose-base dark:prose-pre:bg-secondary/70"
                    editor={editor}
                />
            </section>
        </>
    )
}
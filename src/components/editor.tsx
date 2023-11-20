import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Toggle } from "@/components/ui/toggle";
import { Color } from '@tiptap/extension-color';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const deleteNote = async (noteId: any) => {
    await fetch(`/api/notes/noteId?id=${noteId}`, {
        method: 'DELETE'
    });
};

export default function Editor({note, title, content, handleChangeTitle, handleChangeContent }: any) {

    const router = useRouter();
    const queryClient = useQueryClient();

    console.log(typeof(content))

    const onSuccess = useCallback(() => {
        router.refresh();
        router.push('/notes');
    }, [router]);

    const onError = useCallback(() => {
        toast({
            title: 'Algo deu errado.',
            description: 'Sua nota não foi deletada. Tente novamente.',
            variant: 'destructive'
        });
    }, []);

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const handleClickDelete = useCallback(() => {
        mutate(note?.id);
    }, [mutate, note?.id]);

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "w-full outline-none",
            },
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
                placeholder: "Escreva suas ideias...",
                emptyEditorClass:
                    'before:select-none before:pointer-events-none before:float-left before:h-0 before:text-muted-foreground before:content-[attr(data-placeholder)]'
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify']
            }),
            Color.configure({
                types: ['textStyle'],
            }),
            Text,
            TextStyle,
        ], 
        content: content,
        onUpdate: ({ editor }) => handleChangeContent({ editor })
    });

    if (!editor) return null;

    const headingButtons = [
        {
            level: 1,
            label: 'Heading 1',
            icon: <Icons.heading1 className="h-4 w-4" />,
        },
        {
            level: 2,
            label: 'Heading 2',
            icon: <Icons.heading2 className="h-4 w-4" />,
        },
        {
            level: 3,
            label: 'Heading 3',
            icon: <Icons.heading3 className="h-4 w-4" />,
        },
        {
            level: 4,
            label: 'Heading 4',
            icon: <Icons.heading4 className="h-4 w-4" />,
        },
        {
            level: 5,
            label: 'Heading 5',
            icon: <Icons.heading5 className="h-4 w-4" />,
        },
    ];

    const formattedButtons = [
        {
            property: 'bold',
            label: 'Bold',
            icon: <Icons.bold className="h-3.5 w-3.5" />,
            toggleFunction: () => editor.chain().focus().toggleBold().run(),
        },
        {
            property: 'italic',
            label: 'Italic',
            icon: <Icons.italic className="h-3.5 w-3.5" />,
            toggleFunction: () => editor.chain().focus().toggleItalic().run(),
        },
        {
            property: 'strikethrough',
            label: 'Strike through',
            icon: <Icons.strikethrough className="h-3.5 w-3.5" />,
            toggleFunction: () => editor.chain().focus().toggleStrike().run(),
        },
        {
            property: 'codeBlock',
            label: 'Code Block',
            icon: <Icons.code className="h-4 w-4" />,
            toggleFunction: () => editor.chain().focus().toggleCodeBlock().run(),
        },
    ];

    return (
        <>
            <div className="flex flex-row justify-center items-center flex-wrap gap-2 py-3">

                {formattedButtons.map((button) => (
                    <Toggle
                        variant="outline"
                        size="sm"
                        aria-label={button.label}
                        className={`${editor.isActive(button.property) ? 'is-active' : ''} h-8 rounded-none `}
                        onClick={button.toggleFunction}
                        key={button.label}
                    >
                        {button.icon}
                    </Toggle>
                ))}

                {headingButtons.map(button => (
                    <Toggle
                        variant="outline"
                        aria-label={button.label}
                        onClick={() => editor.chain().focus().toggleHeading({ level: button.level }).run()}
                        className={editor.isActive('heading', { level: button.level }) ? 'is-active' : ''}
                        key={button.level}
                    >
                        {button.icon}
                    </Toggle>
                ))}

                <Toggle
                    variant="outline"
                    aria-label="Align Left"
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                >
                    <Icons.alignLeft className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                    aria-label="Align Center"
                >
                    <Icons.alignCenter className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Align Right"
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                >
                    <Icons.alignRight className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Align Justify"
                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                >
                    <Icons.alignJustify className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Paragraph"
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().setParagraph().run()}
                >
                    <Icons.paragraph className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Block Quote"
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <Icons.blockquote className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="List Unordered"
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <Icons.list className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="List Ordered"
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <Icons.listOrdered className="h-4 w-4" />
                </Toggle>

                <AlertDialog>
                    <AlertDialogTrigger>
                        <DropdownMenu>
                            <DropdownMenuTrigger><Icons.moreHorizontal className="w-7 h-7" /></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="cursor-pointer">
                                    <Icons.trash className="mr-2 h-4 w-4" />
                                    <p>Excluir nota</p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Essa ação não pode ser desfeita. Isso excluirá permanentemente sua nota.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleClickDelete}>
                                Excluir
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <Input
                value={title}
                onChange={handleChangeTitle}
                outline
                placeholder="Título"
                className="border-none py-7 placeholder:opacity-70 scroll-m-20 text-2xl tracking-tight lg:text-3xl"
            />

            <div className='w-full px-3 flex flex-row justify-start items-center'>
                <EditorContent
                    className="prose prose-sm prose-stone max-w-full dark:prose-invert md:prose-base dark:prose-pre:bg-secondary/70"
                    editor={editor}
                />
            </div>
        </>
    )
}
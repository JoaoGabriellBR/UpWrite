import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Toggle } from "@/components/ui/toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

import { Color } from '@tiptap/extension-color'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'

interface EditorProps {
    defaultValue: any;
    onChange: (newValue: JSONContent) => void;
}

export default function Editor({ defaultValue, onChange }: EditorProps) {

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "w-full outline-none",
            },
        },
        extensions: [
            StarterKit.configure({
                // codeBlock: false,
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
        content: defaultValue,
        onUpdate: ({ editor }) => onChange(editor.getJSON())
    });

    if (!editor) return null;

    return (
        <>
            <div className="flex flex-row justify-start items-center flex-wrap gap-2 py-3">
                <Toggle
                    size="sm"
                    className="h-8 rounded-none"
                    pressed={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Icons.bold className="h-3.5 w-3.5" />
                </Toggle>
                <Toggle
                    size="sm"
                    className="h-8 rounded-none"
                    pressed={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Icons.italic className="h-3.5 w-3.5" />
                </Toggle>
                <Toggle
                    size="sm"
                    className="h-8 rounded-none"
                    pressed={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Icons.strikethrough className="h-3.5 w-3.5" />
                </Toggle>


                <Select>
                    <SelectTrigger className="w-[180px] border-none">
                        <SelectValue placeholder="Arial" />
                    </SelectTrigger>
                    <SelectContent className="border-none">
                        <SelectItem value="8pt">Arial</SelectItem>
                        <SelectItem value="10pt">Arial Black</SelectItem>
                        <SelectItem value="12pt">Inter</SelectItem>
                        <SelectItem value="14pt">Raleway</SelectItem>
                        <SelectItem value="16pt">Open Sans</SelectItem>
                        <SelectItem value="18pt">Helvetica</SelectItem>
                        <SelectItem value="18pt">Georgia</SelectItem>
                        <SelectItem value="24pt">Impact</SelectItem>
                        <SelectItem value="36pt">Comic Sans MS</SelectItem>
                        <SelectItem value="36pt">Verdana</SelectItem>
                        <SelectItem value="36pt">Tahoma</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-[180px] border-none">
                        <SelectValue placeholder="Texto" />
                    </SelectTrigger>
                    <SelectContent className="border-none">

                        {/* <SelectItem
                            className="text-[24px]"
                            value="titulo1"
                            pressed={editor.isActive('heading', { level: 1 })}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        >
                            Título 1
                        </SelectItem> */}


                        <SelectItem className="text-[20px]" value="titulo2">Título 2</SelectItem>
                        <SelectItem className="text-[18px]" value="titulo3">Título 3</SelectItem>
                        <SelectItem className="text-[16px]" value="titulo4">Título 4</SelectItem>
                        <SelectItem className="text-[12px]" value="titulo5">Título 5</SelectItem>
                        <SelectItem className="text-[8px]" value="titulo6">Título 6</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-[180px] border-none">
                        <SelectValue placeholder="28px" />
                    </SelectTrigger>
                    <SelectContent className="border-none">
                        <SelectItem value="8pt">8px</SelectItem>
                        <SelectItem value="10pt">10px</SelectItem>
                        <SelectItem value="12pt">12px</SelectItem>
                        <SelectItem value="14pt">14px</SelectItem>
                        <SelectItem value="16pt">16px</SelectItem>
                        <SelectItem value="18pt">18px</SelectItem>
                        <SelectItem value="24pt">24px</SelectItem>
                        <SelectItem value="36pt">36px</SelectItem>
                    </SelectContent>
                </Select>

                <Toggle
                    variant="outline"
                    aria-label="Align Left"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                >
                    <Icons.alignLeft className="h-4 w-4" />
                </Toggle>

                <Toggle 
                    variant="outline"
                    aria-label="Align Center"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                >
                    <Icons.alignCenter className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Align Right"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                >
                    <Icons.alignRight className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Align Justify"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                >
                    <Icons.alignJustify className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Text Color"
                >
                    <Icons.baseline className="h-4 w-4" />
                </Toggle>

                <input
                    type="color"
                    onInput={e => editor.chain().focus().setColor(e.target.value).run()}
                    value={editor.getAttributes('textStyle').color}
                    data-testid="setColor"
                />

                <Toggle variant="outline" aria-label="Image">
                    <Icons.image className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Paragraph"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    <Icons.paragraph className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Block Quote"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    <Icons.blockquote className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Code"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    <Icons.code className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="List Unordered"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    <Icons.list className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="List Ordered"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
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
                            <AlertDialogAction>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <Input outline placeholder="Título" className="border-none py-7 placeholder:opacity-70 scroll-m-20 text-2xl tracking-tight lg:text-3xl" />
            <div className='w-full px-4'>
                <EditorContent
                    className="prose prose-sm prose-stone max-w-full dark:prose-invert md:prose-base dark:prose-pre:bg-secondary/70"
                    editor={editor}
                />
            </div>

        </>
    )
}
import { Icons } from "@/components/icons";
import { Toggle } from "@/components/ui/toggle";
import { BubbleMenu } from "@tiptap/react";

export default function TiptapMenuBar({ editor }: any) {
    return (
        <>
            <BubbleMenu
                editor={editor}
                updateDelay={0}
                className="flex flex-row flex-wrap justify-start items-center py-3 bg-card"
            >
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
                    pressed={editor.isActive('underline')}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                    <Icons.underline className="h-3.5 w-3.5" />
                </Toggle>

                <Toggle
                    size="sm"
                    className="h-8 rounded-none"
                    pressed={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Icons.strikethrough className="h-3.5 w-3.5" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Heading 1"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    <Icons.heading1 className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Heading 2"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    <Icons.heading2 className="h-4 w-4" />
                </Toggle>

                <Toggle
                    variant="outline"
                    aria-label="Heading 3"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    <Icons.heading3 className="h-4 w-4" />
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

            </BubbleMenu>
        </>
    )
}
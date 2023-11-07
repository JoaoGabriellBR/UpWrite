import { BubbleMenu, EditorContent, JSONContent, useEditor } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit';
import { Toggle } from './ui/toggle';
import { Icons } from './icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditorProps {
  defaultValue: any;
  placeholder?: string;
  onChange: (newValue: JSONContent) => void;
}

export const CustomInput = ({ defaultValue, onChange, placeholder }: EditorProps) => {

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'outline-none'
      }
    },
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({
        placeholder: placeholder ?? 'Write something...',
        emptyEditorClass:
          'before:select-none before:pointer-events-none before:float-left before:h-0 before:text-muted-foreground before:content-[attr(data-placeholder)]'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify']
      })
    ],
    content: defaultValue,
    onUpdate: ({ editor }) => onChange(editor.getJSON())
  });

  if (!editor) return null;

  // const headingOptions = [
  //   { label: 'Normal', value: 'heading', args: { level: 0 } },
  //   { label: 'Título 1', value: 'heading1', args: { level: 1 } },
  //   { label: 'Título 2', value: 'heading2', args: { level: 2 } },
  //   { label: 'Título 3', value: 'heading3', args: { level: 3 } },
  //   { label: 'Título 4', value: 'heading4', args: { level: 4 } },
  //   { label: 'Título 5', value: 'heading5', args: { level: 5 } },
  // ];

  return (
    <>
      <EditorContent
        className="prose prose-sm prose-stone max-w-full dark:prose-invert md:prose-base dark:prose-pre:bg-secondary/70"
        editor={editor}
      />
      <BubbleMenu
        editor={editor}
        updateDelay={0}
        className='flex divide-x'
      // className="w-auto flex divide-x overflow-hidden rounded-lg border bg-card shadow-lg shadow-black/20"
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
          pressed={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Icons.strikethrough className="h-3.5 w-3.5" />
        </Toggle>

        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Icons.heading1 className="h-3.5 w-3.5" />
        </Toggle>

        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Icons.heading2 className="h-3.5 w-3.5" />
        </Toggle>


        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Icons.heading3 className="h-3.5 w-3.5" />
        </Toggle>

        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Icons.code className="h-3.5 w-3.5" />
        </Toggle>


        {/* <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Título" />
          </SelectTrigger>
          <SelectContent>
            {headingOptions?.map((option, index) => (
              <SelectItem 
                key={index} 
                value={option?.value}
                onClick={() => editor.chain().focus().toggleHeading(option?.args as Level).run()}
              >
              {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        {/* <Select
          value={editor.isActive('heading', { level: 0 })}
          options={headingOptions}
          onChange={(option: any) => {
            editor.chain().focus().toggleHeading(option.args).run();
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Texto" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {headingOptions?.map((option, index) => (
                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>

        </Select> */}

      </BubbleMenu>
    </>
  );
};

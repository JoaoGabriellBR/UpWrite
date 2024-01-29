import { ReactNode } from "react";
import { JSONContent } from "@tiptap/react";
import { LucideIcon } from "lucide-react";
import { Editor, Range } from "@tiptap/core";
import { Dispatch, SetStateAction } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  randomKey: string;
}

export interface Session {
  user: User;
  expires: string;
}

export interface Params {
  params: { noteId: string };
}

export interface NoteProps {
  id: string;
  title: string;
  content: any;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface EditorProps {
  form?: any;
  content: any;
  handleChangeContent: (newValue: JSONContent) => void;
}

export interface MailProps {
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export interface SideBarProps {
  isCollapsed: boolean;
  links: {
    title: string | any;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    onClick?: any;
  }[];
}

export interface PrivateLayoutProps {
  children: ReactNode;
}

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

export interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface NodeSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface CommandProps {
  editor: Editor;
  range: Range;
}

export interface UseUnarchiveNoteProps {
  setOpen?: (value: boolean) => void;
}

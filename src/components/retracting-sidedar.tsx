import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuArrowLeftFromLine, LuTrash, LuLogOut } from "react-icons/lu";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, File, MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NotesList } from "@/app/(notes-routes)/notes/components/notes-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { signOut } from "next-auth/react";
import DropdownAvatar from "@/components/dropdown-avatar";
import { SettingsDialog } from "@/components/settings-dialog";
import TrashPopover from "@/components/trash-popover";
import Editor from "@/components/editor/editor";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { NoteSkeleton, NoteListSkeleton } from "@/components/note-skeleton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTitleSchema } from "@/lib/schemas";
import * as z from "zod";
import useArchiveNote from "@/hooks/use-archive-note";
import { toast } from "@/components/ui/use-toast";
import debounce from "lodash/debounce";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export const RetractingSideBar = ({
  defaultLayout = [265, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: {
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
}) => {
  const [open, setOpen] = useState(!defaultCollapsed);
  const [selected, setSelected] = useState("Nova nota");
  const [isOpen, setIsOpened] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [currentNote, setCurrentNote] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(createTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("/api/notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      return response.json();
    },
  });

  const { mutate: updateNote } = useMutation({
    mutationFn: async ({ id, title, content }: any) => {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsUpdating(false);
    },
  });

  const { mutate: createNote } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Nova nota",
          content: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setSelectedNote(data);
      setCurrentNote(data);
    },
  });

  const { handleArchiveNote, isPendingArchive } = useArchiveNote();

  const handleNewNote = () => {
    createNote();
  };

  const handleNoteSelect = (note: any) => {
    setSelectedNote(note);
    setCurrentNote(note);
  };

  const handleChangeContent = ({ editor }: { editor: any }) => {
    if (!selectedNote) return;
    setIsUpdating(true);
    updateNote({
      id: selectedNote.id,
      title: selectedNote.title,
      content: editor.getJSON(),
    });
  };

  const handleTitleChange = (title: string) => {
    if (!selectedNote) return;
    setIsUpdating(true);
    updateNote({
      id: selectedNote.id,
      title,
      content: selectedNote.content,
    });
  };

  const handleArchiveClick = () => {
    if (!selectedNote) return;
    handleArchiveNote(selectedNote.id, {
      onSuccess: () => {
        setSelectedNote(null);
        setCurrentNote(null);
        toast({
          description: "Nota movida para a lixeira",
        });
      },
    });
  };

  const sortedNotes = notes?.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="flex h-screen">
      <motion.nav
        layout
        className="sticky top-0 max-h-screen shrink-0 border-r border-border bg-background space-y-4"
        style={{
          width: open ? "265px" : "50px",
        }}
      >
        <div className="flex flex-col h-full">
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              !open ? "h-[52px]" : "px-2"
            )}
          >
            <ToggleClose open={open} setOpen={setOpen} />
          </div>
          <Separator />
          <div className="space-y-1 p-2">
            <Option
              Icon={MdOutlineAddCircleOutline}
              title="Nova nota"
              selected={selected}
              setSelected={setSelected}
              open={open}
              variant="default"
              onClick={handleNewNote}
            />
            <Option
              Icon={IoSettingsOutline}
              title="Configurações"
              selected={selected}
              setSelected={setSelected}
              open={open}
              variant="ghost"
              onClick={() => setIsOpened(true)}
            />
            <Option
              Icon={LuTrash}
              title="Lixeira"
              selected={selected}
              setSelected={setSelected}
              open={open}
              variant="ghost"
              onClick={() => setIsTrashOpen(true)}
            />
            <Option
              Icon={LuLogOut}
              title="Sair"
              selected={selected}
              setSelected={setSelected}
              open={open}
              variant="ghost"
              onClick={() => signOut()}
            />
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar notas..."
                  className={cn("w-full pl-8", !open && "hidden")}
                />
              </div>
            </div>
            <ScrollArea className="h-[calc(100%-60px)]">
              {open &&
                (isLoading ? (
                  <NoteListSkeleton />
                ) : (
                  <NotesList
                    notes={sortedNotes}
                    isLoading={isLoading}
                    onNoteSelect={handleNoteSelect}
                    selectedNote={selectedNote}
                    isCollapsed={!open}
                    onNewNote={handleNewNote}
                  />
                ))}
            </ScrollArea>
          </div>

          <div className="mt-auto p-2">
            <DropdownAvatar isCollapsed={!open} />
          </div>
        </div>
      </motion.nav>

      <div className="flex-1">
        <div className="h-full flex flex-col">
          {isLoading ? (
            <div className="p-4">
              <NoteSkeleton />
            </div>
          ) : selectedNote ? (
            <>
              <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-xl font-semibold truncate">
                  {selectedNote.title}
                </h1>
                <div className="flex items-center gap-2">
                  {isUpdating && (
                    <Icons.spinner className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        {isPendingArchive ? (
                          <Icons.spinner className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleArchiveClick}>
                        <LuTrash className="mr-2 h-4 w-4" />
                        <span>Excluir nota</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <Editor
                  form={form}
                  content={currentNote?.content}
                  handleChangeContent={handleChangeContent}
                  onTitleChange={handleTitleChange}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <File className="w-12 h-12 mb-4" />
              <p>Selecione uma nota ou crie uma nova</p>
            </div>
          )}
        </div>
      </div>

      <SettingsDialog isOpen={isOpen} setIsOpened={setIsOpened} />
      <TrashPopover isTrashOpen={isTrashOpen} setIsTrashOpen={setIsTrashOpen} />
    </div>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  variant = "ghost",
  onClick,
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  variant?: "default" | "ghost";
  onClick?: () => void;
}) => {
  const button = (
    <motion.button
      layout
      onClick={() => {
        setSelected(title);
        onClick?.();
      }}
      className={cn(
        "relative flex h-9 w-full items-center rounded-md transition-colors px-2",
        variant === "default"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "hover:bg-accent",
        !open && "justify-center w-9"
      )}
    >
      <motion.div
        layout
        className={cn(
          "grid place-content-center",
          open ? "h-4 w-4 mr-2" : "h-4 w-4"
        )}
      >
        <Icon className="h-4 w-4" />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm"
        >
          {title}
        </motion.span>
      )}
    </motion.button>
  );

  if (!open) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center">
          {title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const button = (
    <motion.button
      layout
      className="flex h-9 w-full items-center rounded-md transition-colors hover:bg-accent px-2"
      onClick={() => setOpen((pv) => !pv)}
    >
      <motion.div layout className="grid h-full w-4 place-content-center">
        {open ? (
          <LuArrowLeftFromLine className="h-4 w-4 transition-transform" />
        ) : (
          <RxHamburgerMenu
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          />
        )}
      </motion.div>

      {open && (
        <motion.span
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="ml-2 text-sm"
        >
          Esconder
        </motion.span>
      )}
    </motion.button>
  );

  if (!open) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center">
          Expandir
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
};

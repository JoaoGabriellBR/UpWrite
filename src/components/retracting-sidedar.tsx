import React, { Dispatch, SetStateAction, useState, useCallback } from "react";
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

interface Note {
  id: string;
  title: string;
  content: any;
  updatedAt: string;
}

interface UpdateNoteData {
  id: string;
  title: string;
  content: any;
}

interface MutationContext {
  previousNotes: Note[] | undefined;
  previousNote: Note | undefined;
}

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
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
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
    mutationFn: async ({ id, title, content }: UpdateNoteData) => {
      const response = await fetch(`/api/notes/${id}?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || "",
          content: typeof content === "string" ? JSON.parse(content) : content,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update note");
      }

      const data = await response.json();
      return data;
    },
    onMutate: async (newNote: UpdateNoteData) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      await queryClient.cancelQueries({ queryKey: ["note", newNote.id] });

      const previousNotes = queryClient.getQueryData<Note[]>(["notes"]) || [];
      const previousNote = queryClient.getQueryData<Note>(["note", newNote.id]);

      const updatedNote = {
        ...(previousNote || {}),
        ...newNote,
        title: newNote.title?.trim() || "",
        content:
          typeof newNote.content === "string"
            ? JSON.parse(newNote.content)
            : newNote.content,
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Note[]>(["notes"], (old = []) =>
        old.map((note) => (note.id === newNote.id ? updatedNote : note))
      );

      queryClient.setQueryData<Note>(["note", newNote.id], updatedNote);

      return { previousNotes, previousNote } as MutationContext;
    },
    onError: (
      error: Error,
      newNote: UpdateNoteData,
      context?: MutationContext
    ) => {
      console.error("Update error:", error);

      if (context?.previousNotes) {
        queryClient.setQueryData(["notes"], context.previousNotes);
      }
      if (context?.previousNote) {
        queryClient.setQueryData(["note", newNote.id], context.previousNote);
      }

      toast({
        title: "Erro ao salvar",
        description: error.message || "Não foi possível atualizar a nota",
        variant: "destructive",
      });

      setIsUpdating(false);
    },
    onSuccess: (updatedNote: Note) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", updatedNote.id] });

      setSelectedNote((prev) =>
        prev?.id === updatedNote.id ? updatedNote : prev
      );
      setCurrentNote((prev) =>
        prev?.id === updatedNote.id ? updatedNote : prev
      );

      setIsUpdating(false);
    },
    onSettled: () => {
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
          title: "",
          content: {
            type: "doc",
            content: [{ type: "paragraph", content: [] }],
          },
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
      form.setValue("title", data.title);
    },
  });

  const { handleArchiveNote, isPendingArchive } = useArchiveNote();

  const handleNewNote = () => {
    createNote();
  };

  const handleNoteSelect = (note: any) => {
    setSelectedNote(note);
    setCurrentNote(note);
    form.setValue("title", note.title);
  };

  const handleChangeContent = useCallback(
    debounce(({ editor }: { editor: any }) => {
      if (!selectedNote?.id) return;

      const content = editor.getJSON();
      if (!content || typeof content !== "object") {
        console.error("Invalid content format");
        return;
      }

      setIsUpdating(true);
      try {
        updateNote({
          id: selectedNote.id,
          title: selectedNote.title,
          content: JSON.stringify(content),
        });
      } catch (error) {
        console.error("Error updating content:", error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível atualizar o conteúdo da nota",
          variant: "destructive",
        });
        setIsUpdating(false);
      }
    }, 1000),
    [selectedNote, updateNote]
  );

  const handleTitleChange = useCallback(
    debounce((title: string) => {
      if (!selectedNote?.id) return;

      setIsUpdating(true);
      try {
        updateNote({
          id: selectedNote.id,
          title: title,
          content: selectedNote.content,
        });
      } catch (error) {
        console.error("Error updating title:", error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível atualizar o título da nota",
          variant: "destructive",
        });
        setIsUpdating(false);
      }
    }, 500),
    [selectedNote, updateNote]
  );

  const handleArchiveClick = () => {
    if (!selectedNote) return;
    handleArchiveNote(selectedNote.id);
    setSelectedNote(null);
    setCurrentNote(null);
    toast({
      description: "Nota movida para a lixeira",
    });
  };

  const sortedNotes = notes?.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  React.useEffect(() => {
    if (notes && notes.length > 0 && !selectedNote) {
      const firstNote = notes[0];
      setSelectedNote(firstNote);
      setCurrentNote(firstNote);
      form.setValue("title", firstNote.title);
    }
  }, [notes, selectedNote, form]);

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
                  className={cn("w-full p-8", !open && "hidden")}
                />
              </div>
            </div>
            <ScrollArea className="h-[calc(100%-60px)]">
              {open &&
                (isLoading ? (
                  <NoteListSkeleton />
                ) : (
                  <div className="space-y-1 p-2">
                    {sortedNotes?.map((note: any) => (
                      <div
                        key={note.id}
                        className={cn(
                          "flex items-center justify-between rounded-md px-2 py-1",
                          selectedNote?.id === note.id
                            ? "bg-accent"
                            : "hover:bg-accent/50"
                        )}
                      >
                        <button
                          className="flex-1 text-left truncate text-sm"
                          onClick={() => handleNoteSelect(note)}
                        >
                          {note.title?.trim() || "Sem título"}
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                const noteToArchive =
                                  selectedNote?.id === note.id
                                    ? selectedNote?.id
                                    : note.id;
                                handleArchiveNote(noteToArchive);
                                if (selectedNote?.id === note.id) {
                                  setSelectedNote(null);
                                  setCurrentNote(null);
                                }
                                toast({
                                  description: "Nota movida para a lixeira",
                                });
                              }}
                            >
                              <LuTrash className="mr-2 h-4 w-4" />
                              <span>Excluir nota</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
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
                <Input
                  value={selectedNote.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-xl font-semibold bg-transparent border-none h-auto p-0 focus-visible:ring-0"
                />
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
              <div className="flex-1 overflow-y-auto py-10 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-32 sm:px-32 md:px-48 lg:px-60 xl:px-72">
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

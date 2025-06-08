import React, {
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useRef,
} from "react";
import { IconType } from "react-icons";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuArrowLeftFromLine, LuTrash, LuLogOut } from "react-icons/lu";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { File, MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
import useArchiveNote from "@/hooks/use-archive-note";
import { toast } from "@/components/ui/use-toast";
import debounce from "lodash/debounce";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import AlertArchiveNote from "./alert-archive-note";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";

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
  defaultCollapsed = false,
  navCollapsedSize,
}: any) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isOpen, setIsOpened] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [isArchiveAlertOpen, setIsArchiveAlertOpen] = useState(false);
  const [noteToArchive, setNoteToArchive] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selected, setSelected] = useState("Nova nota");
  const [open, setOpen] = useState(true);

  // Estados para controlar edição local vs remota
  const [localContent, setLocalContent] = useState<any>(null);
  const [localTitle, setLocalTitle] = useState<string>("");
  const isEditingRef = useRef(false);
  const pendingUpdatesRef = useRef(new Set<string>());

  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { handleArchiveNote, isPendingArchive } = useArchiveNote();
  const currentVersionRef = useRef<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);

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

  const generateVersion = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const { mutate: updateNote } = useMutation({
    mutationFn: async ({
      id,
      title,
      content,
      version,
    }: UpdateNoteData & { version: string }) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      // Adiciona o ID à lista de atualizações pendentes
      pendingUpdatesRef.current.add(id);

      const response = await fetch(`/api/notes/${id}?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || "",
          content: typeof content === "string" ? JSON.parse(content) : content,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update note");
      }

      if (version !== currentVersionRef.current) {
        throw new Error("Note version mismatch - update cancelled");
      }

      const data = await response.json();

      // Remove o ID da lista de atualizações pendentes
      pendingUpdatesRef.current.delete(id);

      return data;
    },
    onMutate: async (newNote) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      await queryClient.cancelQueries({ queryKey: ["note", newNote.id] });

      const previousNotes = queryClient.getQueryData<Note[]>(["notes"]) || [];
      const previousNote = queryClient.getQueryData<Note>(["note", newNote.id]);

      // CORREÇÃO CRÍTICA: Não atualiza o cache se o usuário está editando
      // Isso evita que as atualizações otimistas interfiram na digitação
      if (!isEditingRef.current) {
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
      }

      return { previousNotes, previousNote } as MutationContext;
    },
    onError: (error: Error, newNote, context?: MutationContext) => {
      // Remove da lista de pendentes em caso de erro
      pendingUpdatesRef.current.delete(newNote.id);

      if (
        error.name === "AbortError" ||
        error.message.includes("version mismatch")
      ) {
        return;
      }

      console.error("Update error:", error);

      if (context?.previousNotes && !isEditingRef.current) {
        queryClient.setQueryData(["notes"], context.previousNotes);
      }
      if (context?.previousNote && !isEditingRef.current) {
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
      // Remove da lista de pendentes
      pendingUpdatesRef.current.delete(updatedNote.id);

      // CORREÇÃO: Só invalida queries se não estiver editando ativamente
      if (!isEditingRef.current) {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        queryClient.invalidateQueries({ queryKey: ["note", updatedNote.id] });

        setSelectedNote((prev) =>
          prev?.id === updatedNote.id ? updatedNote : prev
        );
        setCurrentNote((prev) =>
          prev?.id === updatedNote.id ? updatedNote : prev
        );
      } else {
        // Se estiver editando, apenas atualiza silenciosamente em background
        queryClient.setQueryData<Note[]>(
          ["notes"],
          (old = []) =>
            old?.map((note) =>
              note.id === updatedNote.id ? updatedNote : note
            ) || []
        );
      }

      setIsUpdating(false);
    },
    onSettled: () => {
      setIsUpdating(false);
      abortControllerRef.current = null;
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
      setLocalContent(data.content);
      setLocalTitle(data.title);
      form.setValue("title", data.title);
    },
  });

  const handleNewNote = () => {
    createNote();
  };

  const handleNoteSelect = (note: any) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const newVersion = generateVersion();
    currentVersionRef.current = newVersion;

    // Reset do estado de edição
    isEditingRef.current = false;

    setSelectedNote(note);
    setCurrentNote(note);
    setLocalContent(note.content);
    setLocalTitle(note.title);
    form.setValue("title", note.title);
  };

  const handleChangeContent = useCallback(
    debounce(({ editor, version }: { editor: any; version: string }) => {
      if (!selectedNote?.id) return;
      if (version !== currentVersionRef.current) return;

      // Marca que está editando
      isEditingRef.current = true;

      const newContent = editor.getJSON();
      setLocalContent(newContent);
      setIsUpdating(true);

      try {
        updateNote({
          id: selectedNote.id,
          title: localTitle || selectedNote.title,
          content: JSON.stringify(newContent),
          version,
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
    [selectedNote, updateNote, localTitle]
  );

  const handleTitleChange = useCallback(
    debounce((title: string) => {
      if (!selectedNote?.id) return;

      // Marca que está editando
      isEditingRef.current = true;

      setLocalTitle(title);
      setIsUpdating(true);

      try {
        updateNote({
          id: selectedNote.id,
          title: title,
          content: localContent || selectedNote.content,
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
    [selectedNote, updateNote, localContent]
  );

  const handleArchiveClick = () => {
    if (!selectedNote) return;
    setIsArchiveAlertOpen(true);
  };

  const handleArchiveComplete = useCallback(() => {
    if (selectedNote?.id === noteToArchive) {
      setSelectedNote(null);
      setCurrentNote(null);
      setLocalContent(null);
      setLocalTitle("");
    }
    setNoteToArchive(null);
  }, [selectedNote?.id, noteToArchive]);

  const sortedNotes = notes?.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  React.useEffect(() => {
    if (notes && notes.length > 0 && !selectedNote) {
      const firstNote = notes[0];
      setSelectedNote(firstNote);
      setCurrentNote(firstNote);
      setLocalContent(firstNote.content);
      setLocalTitle(firstNote.title);
      form.setValue("title", firstNote.title);
    }
  }, [notes, selectedNote, form]);

  // Effect para sincronizar estado local com mudanças externas
  React.useEffect(() => {
    if (
      selectedNote &&
      !isEditingRef.current &&
      !pendingUpdatesRef.current.has(selectedNote.id)
    ) {
      setLocalContent(selectedNote.content);
      setLocalTitle(selectedNote.title);
    }
  }, [selectedNote]);

  return (
    <div className="flex h-screen">
      <motion.nav
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
          <Separator className="my-[6px]" />
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
                                const noteId =
                                  selectedNote?.id === note.id
                                    ? selectedNote?.id
                                    : note.id;
                                setNoteToArchive(noteId);
                                setIsArchiveAlertOpen(true);
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

      <AlertArchiveNote
        isAlertOpen={isArchiveAlertOpen}
        setIsAlertOpen={setIsArchiveAlertOpen}
        noteId={noteToArchive}
        onArchive={handleArchiveComplete}
      />

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
                  value={localTitle}
                  placeholder="Sem título"
                  readOnly
                  className="text-xl font-semibold bg-transparent border-none h-auto p-0 focus-visible:ring-0 placeholder:text-muted-foreground placeholder:font-normal"
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
                  content={localContent}
                  handleChangeContent={handleChangeContent}
                  onTitleChange={handleTitleChange}
                  version={currentVersionRef.current}
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
      className={cn(
        "relative flex h-9 w-full rounded-md transition-colors px-2",
        open ? "justify-start items-center" : "justify-center items-center"
      )}
      onClick={() => setOpen((pv) => !pv)}
    >
      <motion.div
        layout
        className={cn("w-full", open ? "h-4 w-4 mr-2" : "h-4 w-4")}
      >
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
          className="text-sm"
        >
          Esconder
        </motion.span>
      )}
    </motion.button>
  );

  // if (!open) {
  //   return (
  //     <Tooltip delayDuration={0}>
  //       <TooltipTrigger asChild>{button}</TooltipTrigger>
  //       <TooltipContent side="right" className="flex items-center">
  //         Expandir
  //       </TooltipContent>
  //     </Tooltip>
  //   );
  // }

  return button;
};

"use client";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { File, Trash2, MoreHorizontal } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { MailProps, NoteProps } from "@/lib/types";
import Editor from "@/components/editor/editor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTitleSchema } from "@/lib/schemas";
import * as z from "zod";
import useArchiveNote from "@/hooks/use-archive-note";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { NoteSkeleton } from "@/components/note-skeleton";
import debounce from "lodash/debounce";
import AlertArchiveNote from "./alert-archive-note";

export default function Test({
  defaultLayout = [265, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps | any) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isOpen, setIsOpened] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [isArchiveAlertOpen, setIsArchiveAlertOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteProps | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { handleArchiveNote, isPendingArchive } = useArchiveNote();

  const form = useForm<z.infer<typeof createTitleSchema>>({
    mode: "onChange",
    resolver: zodResolver(createTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  const getUserNotes = async () => {
    const notes = await fetch("/api/notes");
    const data = await notes.json();
    return data;
  };

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getUserNotes,
  });

  const getNoteById = async (noteId: string) => {
    const response = await fetch(`/api/notes/noteId?id=${noteId}`);
    const data = await response.json();
    return data;
  };

  const { data: currentNote, isLoading: isLoadingNote } = useQuery({
    queryKey: ["note", selectedNote?.id],
    queryFn: () => (selectedNote?.id ? getNoteById(selectedNote.id) : null),
    enabled: !!selectedNote?.id,
  });

  const createNewNote = async () => {
    const response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({
        title: "Nova nota",
        content: {
          type: "doc",
          content: [{ type: "paragraph", content: [] }],
        },
      }),
    });
    const data = await response.json();
    return data;
  };

  const { mutate: createNoteMutation, isPending: isCreating } = useMutation({
    mutationFn: createNewNote,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setSelectedNote(newNote);
      form.setValue("title", newNote.title);
    },
    onError: () => {
      toast({
        title: "Erro ao criar nota",
        description: "Não foi possível criar uma nova nota.",
        variant: "destructive",
      });
    },
  });

  const updateNote = async (noteData: {
    id: string;
    title?: string;
    content?: any;
  }) => {
    if (!noteData?.id) {
      console.error("Tentativa de atualizar nota sem ID");
      return;
    }

    try {
      const response = await fetch(`/api/notes/noteId?id=${noteData.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: noteData.title,
          content: noteData.content,
        }),
      });
      const updatedNote = await response.json();
      return updatedNote;
    } catch (error) {
      console.error("Erro ao atualizar nota:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  const { mutate: updateNoteMutation } = useMutation({
    mutationFn: updateNote,
    onMutate: async (newNote) => {
      await queryClient.cancelQueries({ queryKey: ["note", newNote.id] });
      await queryClient.cancelQueries({ queryKey: ["notes"] });

      // Snapshot do estado anterior
      const previousNote = queryClient.getQueryData(["note", newNote.id]);
      const previousNotes = queryClient.getQueryData(["notes"]);

      // Atualização otimista da nota atual
      queryClient.setQueryData(["note", newNote.id], (old: any) => ({
        ...old,
        ...newNote,
      }));

      // Atualização otimista da lista de notas
      if (previousNotes) {
        queryClient.setQueryData(["notes"], (old: any) =>
          old.map((note: NoteProps) =>
            note.id === newNote.id
              ? {
                  ...note,
                  ...newNote,
                  updated_at: new Date().toISOString(),
                }
              : note
          )
        );
      }

      return { previousNote, previousNotes };
    },
    onError: (err, newNote, context: any) => {
      // Em caso de erro, reverte as alterações
      if (context?.previousNote) {
        queryClient.setQueryData(["note", newNote.id], context.previousNote);
      }
      if (context?.previousNotes) {
        queryClient.setQueryData(["notes"], context.previousNotes);
      }
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    },
    onSettled: (data, error, variables) => {
      // Revalida silenciosamente apenas a nota atual
      queryClient.invalidateQueries({
        queryKey: ["note", variables.id],
        exact: true,
        refetchType: "none",
      });
    },
  });

  // Ref para armazenar as funções de debounce
  const debouncedFns = React.useRef({
    content: debounce((data: any) => updateNoteMutation(data), 1000),
    title: debounce((data: any) => updateNoteMutation(data), 500),
  }).current;

  const handleChangeContent = useCallback(
    ({ editor }: any) => {
      if (!selectedNote?.id) return;

      const content = editor.getJSON();
      const now = new Date().toISOString();

      // Atualização otimista local da nota e da lista
      const updatedNote = {
        id: selectedNote.id,
        content,
        updated_at: now,
      };

      // Atualiza o cache da nota e da lista
      queryClient.setQueryData(["note", selectedNote.id], (old: any) => ({
        ...old,
        ...updatedNote,
      }));

      queryClient.setQueryData(["notes"], (old: any) =>
        old?.map((note: NoteProps) =>
          note.id === selectedNote.id ? { ...note, ...updatedNote } : note
        )
      );

      // Debounce da atualização no servidor
      debouncedFns.content(updatedNote);
    },
    [selectedNote?.id, queryClient, debouncedFns]
  );

  const handleTitleChange = useCallback(
    (title: string) => {
      if (!selectedNote?.id) return;

      const now = new Date().toISOString();
      const updatedNote = {
        id: selectedNote.id,
        title,
        updated_at: now,
      };

      // Atualiza o cache da nota e da lista
      queryClient.setQueryData(["note", selectedNote.id], (old: any) => ({
        ...old,
        ...updatedNote,
      }));

      queryClient.setQueryData(["notes"], (old: any) =>
        old?.map((note: NoteProps) =>
          note.id === selectedNote.id ? { ...note, ...updatedNote } : note
        )
      );

      // Debounce da atualização no servidor
      debouncedFns.title(updatedNote);
    },
    [selectedNote?.id, queryClient, debouncedFns]
  );

  // Limpa os debounces quando o componente é desmontado
  useEffect(() => {
    return () => {
      debouncedFns.content.cancel();
      debouncedFns.title.cancel();
    };
  }, [debouncedFns]);

  // Set the most recent note as selected when notes are loaded
  useEffect(() => {
    if (notes && notes.length > 0 && !selectedNote) {
      const sortedNotes = [...notes].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setSelectedNote(sortedNotes[0]);
      form.setValue("title", sortedNotes[0].title);
    }
  }, [notes, form, selectedNote]);

  const handleNoteSelect = (note: NoteProps) => {
    setSelectedNote(note);
    form.setValue("title", note.title);
  };

  const handleNewNote = () => {
    createNoteMutation();
  };

  const handleArchiveClick = useCallback(() => {
    if (!selectedNote?.id) {
      return;
    }

    setIsArchiveAlertOpen(true);
  }, [selectedNote]);

  const handleArchiveComplete = useCallback(() => {
    setSelectedNote(null);
  }, []);

  const sortedNotes = notes
    ? [...notes].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    : [];

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-full flex flex-col">
        {isLoadingNote ? (
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
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Excluir nota</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertArchiveNote
                  isAlertOpen={isArchiveAlertOpen}
                  setIsAlertOpen={setIsArchiveAlertOpen}
                  noteId={selectedNote?.id}
                  onArchive={handleArchiveComplete}
                />
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
    </TooltipProvider>
  );
}

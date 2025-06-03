"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MailProps, NoteProps } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTitleSchema } from "@/lib/schemas";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import debounce from "lodash/debounce";
import { RetractingSideBar } from "@/components/retracting-sidedar";

export default function Main({ defaultCollapsed = false }: MailProps | any) {
  const [selectedNote, setSelectedNote] = useState<NoteProps | null>(null);
  const queryClient = useQueryClient();

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

  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: getUserNotes,
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

  return (
    <TooltipProvider delayDuration={0}>
      <RetractingSideBar defaultCollapsed={defaultCollapsed} />
    </TooltipProvider>
  );
}

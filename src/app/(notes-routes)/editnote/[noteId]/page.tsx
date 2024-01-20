"use client";

import { useCallback, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import HeaderNotes from "@/components/header-notes";
import Editor from "@/components/editor/editor";
import { Params, NoteProps } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "@/components/icons";
import { createTitleSchema } from "@/lib/createTitleSchema";

export default function EditNote({ params }: Params) {
  const noteId = params.noteId;
  const queryClient = useQueryClient();

  const [note, setNote] = useState<NoteProps>();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof createTitleSchema>>({
    mode: "onChange",
    resolver: zodResolver(createTitleSchema),
    defaultValues: {
      title: note?.title ?? "",
    },
  });

  const getNoteById = async () => {
    const response = await fetch(`/api/notes/noteId?id=${noteId}`);
    const data = await response.json();
    setNote(data);
    form.setValue("title", data?.title || "");
  };

  const { isLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: getNoteById,
  });

  const updateNote = async () => {
    setLoading(true);

    const title = form.getValues("title");
    const content = note?.content;

    await fetch(`/api/notes/noteId?id=${noteId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        content,
      }),
    });
    setLoading(false);
  };

  const onSuccess = useCallback(() => {
    toast({
      title: "Sucesso.",
      description: "Sua nota foi atualizada com sucesso.",
      variant: "default",
      duration: 3000,
    });
  }, []);

  const onError = useCallback(() => {
    toast({
      title: "Algo deu errado.",
      description: "Não foi possível atualizar a sua nota. Tente novamente.",
      variant: "destructive",
      duration: 3000,
    });
  }, []);

  const { mutate } = useMutation({
    mutationFn: updateNote,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleClickEditNote = useCallback(() => {
    mutate();
  }, [mutate]);

  const handleChangeContent = ({ editor }: any) => {
    if (note) {
      const updatedNote = { ...note, content: editor.getJSON() };
      setNote(updatedNote);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Icons.spinner className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <section className="w-full grid grid-cols-2 grid-rows-6 gap-2 max-w-8x1 mx-auto min-h-screen py-3">
      <HeaderNotes
        form={form}
        note={note}
        handleClick={handleClickEditNote}
        loading={loading}
        className="col-span-2 row-span-1"
      />

      <div className="col-span-2 row-span-5">
        <div className="w-4/6 h-full mx-auto flex flex-col items-start gap-y-1">
          <Editor
            form={form}
            content={note?.content}
            handleChangeContent={handleChangeContent}
          />
        </div>
      </div>
    </section>
  );
}

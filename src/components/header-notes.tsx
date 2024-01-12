"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import AlertDeleteNote from "./alert-delete-note";

export default function HeaderNotes({ form, note, handleClick, loading }: any) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteNote = async () => {
    await fetch(`/api/notes/noteId?id=${note?.id}`, {
      method: "DELETE",
    });
  };

  const onSuccess = useCallback(() => {
    router.refresh();
    router.push("/notes");
  }, [router]);

  const onError = useCallback(() => {
    toast({
      title: "Algo deu errado.",
      description: "Sua nota não foi deletada. Tente novamente.",
      variant: "destructive",
    });
  }, []);

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleClickDelete = useCallback(() => {
    mutate(note?.id);
  }, [mutate, note?.id]);

  const hasTitle = form.getValues("title");
  const isTitleValid = hasTitle && hasTitle.length <= 100;

  return (
    <>
      <header className=" w-full py-3">
        <div className="max-w-8xl mx-auto px-4 flex flex-row justify-between items-center">
          <Button variant="ghost" onClick={() => router.back()}>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="flex flex-row items-center justify-between gap-3">
            <Button
              disabled={!isTitleValid || loading}
              onClick={handleClick}
              variant="outline"
              type="submit"
              className="h-9 border-none"
            >
              {loading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Salvando
                </>
              ) : (
                <>
                  <Icons.check className="mr-2 h-5 w-5" />
                  Salvar
                </>
              )}
            </Button>

            <AlertDeleteNote handleClickDelete={handleClickDelete} />
          </div>
        </div>
      </header>
    </>
  );
}

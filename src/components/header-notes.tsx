"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import AlertDeleteNote from "./alert-delete-note";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HeaderNotes({
  form,
  note,
  handleClick,
  loading,
  ...props
}: any) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  // const deleteNote = async () => {
  //   await fetch(`/api/notes/noteId?id=${note?.id}`, {
  //     method: "DELETE",
  //   });
  // };

  const archiveNote = async (noteId: any) => {
    await fetch(`/api/notes/archive?id=${noteId}`, {
      method: "PATCH",
    });
  };

  const onSuccess = useCallback(() => {
    router.refresh();
    router.push("/notes");
    toast({
      title: "Nota arquivada",
      description: "Sua nota foi arquivada com sucesso.",
      variant: "default",
    });
  }, [router]);

  const onError = useCallback(() => {
    toast({
      title: "Algo deu errado.",
      description: "Sua nota não foi arquivada. Tente novamente.",
      variant: "destructive",
    });
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: archiveNote,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["archivedNotes"] });
    },
  });

  const handleClickArchive = useCallback(() => {
    mutate(note?.id);
  }, [mutate, note?.id]);

  const hasTitle = form.getValues("title");
  const isTitleValid = hasTitle && hasTitle.length <= 100;

  const buttons = [
    {
      text: "Restaurar",
      onClick: "",
    },
    {
      text: "Excluir para sempre",
      onClick: "",
    },
    {
      text: "Voltar",
      onClick: "",
    },
  ];

  return (
    <>
      <header {...props}>
        {note?.deleted_at !== null && pathname !== "/createnote" ? (
          <div className="py-2 flex flex-wrap justify-center items-center gap-3 bg-red-500">
            <p className="text-sm">Essa nota está na lixeira.</p>
            {buttons?.map((butt, index) => (
              <button
                key={index}
                className="flex justify-center items-center w-auto h-5 border border-white p-5 rounded-full text-sm"
              >
                {butt.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center">
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
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">
                    {isPending ? (
                      <Icons.spinner className="h-5 w-5 animate-spin" />
                    ) : (
                      <Icons.moreHorizontal className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleClickArchive}
                  >
                    <Icons.trash className="mr-2 h-4 w-4" />
                    <p>Excluir nota</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <AlertDeleteNote handleClickDelete={handleClickDelete} /> */}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

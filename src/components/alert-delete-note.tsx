import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function AlertDeleteNote({
  isAlertOpen,
  setIsAlertOpen,
  noteId,
}: any) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteNote = async () => {
    await fetch(`/api/notes/noteId?id=${noteId}`, {
      method: "DELETE",
    });
  };

  const onSuccess = useCallback(() => {
    router.refresh();
    router.push("/notes");
    toast({
      title: "Nota excluida",
      description: "Sua nota foi excluida com sucesso.",
      variant: "default",
    });
  }, [router]);

  const onError = useCallback(() => {
    toast({
      title: "Algo deu errado.",
      description: "Sua nota não foi excluida. Tente novamente.",
      variant: "destructive",
    });
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["archivedNotes"] });
    },
  });

  const handleClickDelete = useCallback(() => {
    mutate(noteId);
  }, [mutate, noteId]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <AlertDialog
          open={isAlertOpen}
          onOpenChange={() => setIsAlertOpen(false)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso excluirá permanentemente
                sua nota.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleClickDelete}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </>
  );
}

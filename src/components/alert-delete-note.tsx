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
import useDeleteNote from "@/hooks/use-delete-note";
import { Icons } from "./icons";

export default function AlertDeleteNote({
  isAlertOpen,
  setIsAlertOpen,
  noteId,
}: any) {
  const [isClient, setIsClient] = useState(false);
  const { handleDeleteNote, isPendingDelete } = useDeleteNote();

  const handleClickDeleteNote = useCallback(() => {
    handleDeleteNote(noteId);
  }, [handleDeleteNote, noteId]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <AlertDialog
          open={isAlertOpen || isPendingDelete}
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
              <AlertDialogAction
                onClick={handleClickDeleteNote}
                disabled={isPendingDelete}
              >
                {isPendingDelete ? (
                  <Icons.spinner className="w-4 h-4 animate-spin" />
                ) : (
                  "Excluir"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </>
  );
}

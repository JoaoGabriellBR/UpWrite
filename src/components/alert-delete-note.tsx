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

export default function AlertDeleteNoteForever({
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
                Gostaria mesmo de excluir esta nota da lixeira permanentemente?
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

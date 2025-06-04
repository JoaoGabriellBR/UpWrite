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
import useArchiveNote from "@/hooks/use-archive-note";
import { Icons } from "./icons";

interface AlertArchiveNoteProps {
  isAlertOpen: boolean;
  setIsAlertOpen: (open: boolean) => void;
  noteId: string | null;
  onArchive?: () => void;
}

export default function AlertArchiveNote({
  isAlertOpen,
  setIsAlertOpen,
  noteId,
  onArchive,
}: AlertArchiveNoteProps) {
  const [isClient, setIsClient] = useState(false);
  const { handleArchiveNote, isPendingArchive } = useArchiveNote();

  const handleClickArchiveNote = useCallback(() => {
    handleArchiveNote(noteId);
    setIsAlertOpen(false);
    if (onArchive) {
      onArchive();
    }
  }, [handleArchiveNote, noteId, setIsAlertOpen, onArchive]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <AlertDialog
          open={isAlertOpen || isPendingArchive}
          onOpenChange={() => setIsAlertOpen(false)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Gostaria mesmo de mover esta nota para a lixeira?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleClickArchiveNote}
                disabled={isPendingArchive}
              >
                {isPendingArchive ? (
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

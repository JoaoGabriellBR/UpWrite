"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CornerUpLeft, Trash } from "lucide-react";
import { TooltipComponent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import Link from "next/link";
import { Icons } from "./icons";
import AlertDeleteNote from "./alert-delete-note";
import useUnarchiveNote from "@/hooks/use-unarchive-note";

export default function TrashPopover({ isTrashOpen, setIsTrashOpen }: any) {
  const [restoringNoteId, setRestoringNoteId] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { handleUnarchiveNote } = useUnarchiveNote(setIsTrashOpen);

  const getArchivedNotes = async () => {
    const notes = await fetch("/api/notes/archive");
    const data = await notes.json();
    return data;
  };

  const { data: archivedNotes, isLoading } = useQuery({
    queryKey: ["archivedNotes"],
    queryFn: getArchivedNotes,
  });

  const handleClickUnarchiveNote = useCallback(
    (noteId: any) => {
      handleUnarchiveNote(noteId);
      setRestoringNoteId(noteId);
    },
    [handleUnarchiveNote]
  );

  return (
    <Dialog open={isTrashOpen} onOpenChange={() => setIsTrashOpen(false)}>
      <DialogContent className="min-h-72">
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Notas excluídas</h2>
        </DialogHeader>

        <ScrollArea className="h-72" aria-orientation="vertical">
          {isLoading ? (
            <h1>Carregando...</h1>
          ) : !archivedNotes?.length ? (
            <p className="text-muted-foreground">
              Você não possui notas excluídas.
            </p>
          ) : (
            archivedNotes?.map((note: any) => (
              <div key={note?.id} className="flex items-center justify-between">
                <Link href={`/editnote/${note?.id}`}>
                  <Label className="cursor-pointer hover:underline underline-offset-2">
                    {note?.title}
                  </Label>
                </Link>
                <div className="flex flex-row items-center">
                  <TooltipComponent text="Restaurar">
                    <Button
                      variant="ghost"
                      onClick={() => handleClickUnarchiveNote(note?.id)}
                      disabled={restoringNoteId === note?.id}
                    >
                      {restoringNoteId === note?.id ? (
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                      ) : (
                        <CornerUpLeft className="w-4 h-4" />
                      )}
                    </Button>
                  </TooltipComponent>
                  <TooltipComponent text="Excluir permanentemente">
                    <Button
                      variant="ghost"
                      onClick={() => setIsAlertOpen(true)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TooltipComponent>
                  <AlertDeleteNote
                    isAlertOpen={isAlertOpen}
                    setIsAlertOpen={setIsAlertOpen}
                    noteId={note?.id}
                  />
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

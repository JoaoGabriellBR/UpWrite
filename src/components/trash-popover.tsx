"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/contexts/mode-toggle";
import { CornerUpLeft, Trash } from "lucide-react";
import { TooltipComponent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

export default function TrashPopover({ isTrashOpen, setIsTrashOpen }: any) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [restoringNoteId, setRestoringNoteId] = useState(null);

  const getArchivedNotes = async () => {
    const notes = await fetch("/api/notes/archive");
    const data = await notes.json();
    return data;
  };

  const { data: archivedNotes, isLoading } = useQuery({
    queryKey: ["archivedNotes"],
    queryFn: getArchivedNotes,
  });

  const unarchiveNote = async (noteId: any) => {
    await fetch(`/api/notes/unarchive?id=${noteId}`, {
      method: "PATCH",
    });
  };

  const onSuccess = useCallback(() => {
    router.refresh();
    setIsTrashOpen(false);
    toast({
      title: "Nota restaurada",
      description: "Sua nota foi restaurada com sucesso.",
      variant: "default",
    });
  }, [router, setIsTrashOpen]);

  const onError = useCallback(() => {
    toast({
      title: "Algo deu errado.",
      description: "Sua nota não foi deletada. Tente novamente.",
      variant: "destructive",
    });
  }, []);

  const { mutate } = useMutation({
    mutationFn: unarchiveNote,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["archivedNotes"] });
    },
  });

  const handleClickUnarchiveNote = useCallback(
    (noteId: any) => {
      mutate(noteId);
      setRestoringNoteId(noteId);
    },
    [mutate]
  );

  const buttons = [
    {
      text: "Restaurar",
      icon: CornerUpLeft,
      // onClick: () => handleClickUnarchiveNote()
    },
    {
      text: "Excluir permanentemente",
      icon: Trash,
    },
  ];

  return (
    <Dialog open={isTrashOpen} onOpenChange={() => setIsTrashOpen(false)}>
      <DialogContent className="max-h-72">
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Notas arquivadas</h2>
        </DialogHeader>

        <ScrollArea className="h-72" aria-orientation="vertical">
          {isLoading ? (
            <h1>Carregando...</h1>
          ) : !archivedNotes?.length ? (
            <p className="text-muted-foreground">
              Você não possui notas arquivadas.
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
                      // onClick={() => handleClickUnarchiveNote(note?.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TooltipComponent>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUnarchiveNote from "@/hooks/use-unarchive-note";
import { useState } from "react";
import AlertDeleteNote from "./alert-delete-note";
import useDeleteNote from "@/hooks/use-delete-note";
import useArchiveNote from "@/hooks/use-archive-note";

export default function HeaderNotes({
  form,
  note,
  handleClick,
  loading,
  ...props
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [restoringNoteId, setRestoringNoteId] = useState(null);
  const { isPendingDelete } = useDeleteNote();
  const { handleArchiveNote, isPendingArchive } = useArchiveNote();
  const { handleUnarchiveNote, isPendingUnarchive, isSuccessUnarchive } =
    useUnarchiveNote({});

  const handleClickArchiveNote = useCallback(() => {
    handleArchiveNote(note?.id);
  }, [handleArchiveNote, note?.id]);

  const handleClickUnarchiveNote = useCallback(
    (noteId: any) => {
      handleUnarchiveNote(noteId);
      setRestoringNoteId(noteId);
    },
    [handleUnarchiveNote]
  );

  const hasTitle = form.getValues("title");
  const isTitleValid = hasTitle && hasTitle.length <= 100;

  const buttons = [
    {
      text: "Restaurar",
      onClick: () => handleClickUnarchiveNote(note?.id),
      disabled: restoringNoteId === note?.id,
      condition: isPendingUnarchive,
    },
    {
      text: "Excluir para sempre",
      onClick: () => setIsAlertOpen(true),
      disabled: isPendingDelete,
    },
    {
      text: "Voltar",
      onClick: () => router.push("/notes"),
    },
  ];

  return (
    <>
      <header {...props}>
        {note?.deleted_at !== null &&
        pathname !== "/createnote" &&
        !isSuccessUnarchive ? (
          <div className="py-2 flex flex-wrap justify-center items-center gap-3 bg-red-500">
            <p className="text-sm">Essa nota está na lixeira.</p>
            {buttons?.map((butt, index) => (
              <button
                key={index}
                onClick={butt.onClick}
                disabled={butt.disabled}
                className="flex justify-center items-center min-w-50 h-5 border border-white p-5 rounded-full text-sm"
              >
                {butt.condition ? (
                  <Icons.spinner className="h-4 w-4 animate-spin" />
                ) : (
                  butt.text
                )}
              </button>
            ))}
            <AlertDeleteNote
              isAlertOpen={isAlertOpen}
              setIsAlertOpen={setIsAlertOpen}
              noteId={note?.id}
            />
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center px-3">
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
              {pathname === "/createnote" ? null : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">
                      {isPendingArchive ? (
                        <Icons.spinner className="h-5 w-5 animate-spin" />
                      ) : (
                        <Icons.moreHorizontal className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleClickArchiveNote}
                    >
                      <Icons.trash className="mr-2 h-4 w-4" />
                      <p>Excluir nota</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";
import { File, Plus } from "lucide-react";
import { getNoteTimestamp } from "@/lib/getNoteTimestamp";
import { NoteProps } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface NotesListProps {
  notes: NoteProps[];
  isLoading: boolean;
  onNoteSelect: (note: NoteProps) => void;
  selectedNote: NoteProps | null;
  isCollapsed: boolean;
  onNewNote: () => void;
}

export function NotesList({
  notes,
  isLoading,
  onNoteSelect,
  selectedNote,
  isCollapsed,
  onNewNote,
}: NotesListProps) {
  if (isLoading) {
    return (
      <div className="mt-4 h-full w-full flex justify-center items-center">
        <Icons.spinner className="text-primary h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!notes?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-muted-foreground">
        <File className="h-8 w-8 mb-4" />
        <p className="text-sm text-center mb-4">
          Você ainda não possui nenhuma nota
        </p>
        <Button
          variant="outline"
          size="icon"
          onClick={onNewNote}
          className="h-10 w-10 rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const sortedNotes = [...notes].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return (
    <div className="px-2">
      {sortedNotes.map((note) => (
        <button
          key={note.id}
          onClick={() => onNoteSelect(note)}
          className={cn(
            "w-full text-left px-2 py-1.5 rounded-lg transition-colors",
            "hover:bg-muted/50",
            selectedNote?.id === note.id && "bg-muted",
            "flex items-start gap-2",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          {isCollapsed ? (
            <File className="h-4 w-4 shrink-0 mt-0.5" />
          ) : (
            <>
              <File className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  {note.title || "Sem título"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {getNoteTimestamp(note)}
                </p>
              </div>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

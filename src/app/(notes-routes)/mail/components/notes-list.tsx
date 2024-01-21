"use client";
import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from 'date-fns/locale/pt-BR';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function NotesList({ items }: any) {
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleNoteClick = (noteId: any) => {
    setSelectedNoteId(noteId);
  };

  const getUserNotes = async () => {
    const notes = await fetch("/api/notes");
    const data = await notes.json();
    return data;
  };

  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: getUserNotes,
  });
  const noteId = notes?.map((note: any) => note.id);

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items?.map((item: any) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-card active:bg-card",
              selectedNoteId === item.id && "bg-card",
              noteId === item.id && "bg-card"
            )}
            onClick={() => handleNoteClick(item.id)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.title}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selectedNoteId === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">
                {/* {item.subject} */}
                <p>teste</p>
              </div>
            </div>

            {/* <div className="line-clamp-2 text-xs text-muted-foreground">
           {item.text.substring(0, 300)} 
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quos
              saepe praesentium molestias, autem ipsam quis ab doloribus
              excepturi. Voluptatem?
            </div> */}

            {/* {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label: any) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

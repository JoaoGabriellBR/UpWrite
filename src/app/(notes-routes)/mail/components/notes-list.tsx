"use client";
import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/button-group";
import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Icons } from "@/components/icons";
import Link from "next/link";

export function NotesList({ notes, selectedNote, handleNoteClick }: any) {
  const noteId = notes?.map((note: any) => note.id);

  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-full p-4 flex flex-col md:flex-row lg:flex-row justify-start items-center gap-3">
        
        <Card className="text-white bg-primary cursor-pointer hidden md:w-[12rem] md:h-[15rem] flex flex-col justify-center items-center gap-2">
          
          <div className="flex items-center justify-center rounded-full">
            <Icons.bookOpen className={cn("h-10 w-10")} />
          </div>

          <h2 className={cn("text-md")}>
            Nova nota
          </h2>
        </Card>

        {notes?.map((note: any) => (
          <Card
            key={note?.id}
            className="w-full md:w-[12rem] lg:w-[12rem] h-[10rem] md:h-[15rem] lg:h-[15rem] flex flex-col justify-between"
          >
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-heading text-md p-o m-0">
                {note?.title?.length >= 20
                  ? note?.title.slice(0, 20) + "..."
                  : note?.title}
              </CardTitle>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-2">
                    <MoreVertical className="cursor-pointer h-4 w-4 text-secondary-foreground" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  alignOffset={-5}
                  className="w-fit bg-card"
                  forceMount
                >
                  <DropdownMenuSeparator />

                  <DropdownMenuCheckboxItem className="m-0 px-2 w-full flex flex-row justify-start items-center">
                    <Trash2 className="mr-2 h-4 w-4" /> Excluir
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            <CardFooter className="flex flex-row justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(note?.created_at), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </span>
              <Link href={`/editnote/${note.id}`}>
                <Button className="text-xs" variant="link">
                  ver mais
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

{
  /* <div className="flex flex-row justify-start gap-2 p-4 pt-0">
  {notes?.map((item: any) => (
    <button
      key={item.id}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-secondary active:bg-secondary",
        selectedNote?.id === item.id && "bg-secondary",
        noteId === item.id && "bg-secondary"
      )}
      onClick={() => handleNoteClick(item)}
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
              selectedNote?.id === item.id
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
          {item.subject}
          <p>teste</p>
        </div>
      </div>

       <div className="line-clamp-2 text-xs text-muted-foreground">
     {item.text.substring(0, 300)} 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quos
        saepe praesentium molestias, autem ipsam quis ab doloribus
        excepturi. Voluptatem?
      </div> */
}

{
  /* {item.labels.length ? (
        <div className="flex items-center gap-2">
          {item.labels.map((label: any) => (
            <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
              {label}
            </Badge>
          ))}
        </div>
      ) : null} 
    </button>
  ))}
</div> */
}

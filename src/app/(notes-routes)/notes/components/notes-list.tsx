"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { getNoteTimestamp } from "@/lib/getNoteTimestamp";

export function NotesList({ notes }: any) {
  return (
    <ScrollArea className="h-screen">
      <div className="w-full h-full p-4 flex flex-col md:flex-row lg:flex-row flex-wrap justify-start items-center gap-3">
        <Link href="/createnote">
          <Card className="text-white bg-primary cursor-pointer hidden md:w-[12rem] md:h-[15rem] flex flex-col justify-center items-center gap-2">
            <div className="flex items-center justify-center rounded-full">
              <Icons.bookOpen className={cn("h-10 w-10")} />
            </div>
            <h2 className={cn("text-md")}>Nova nota</h2>
          </Card>
        </Link>
        {notes?.map((note: any) => (
          <Card
            key={note?.id}
            className="w-full md:w-[12rem] lg:w-[12rem] h-[10rem] md:h-[15rem] lg:h-[15rem] flex flex-col justify-between"
          >
            <CardHeader className="flex flex-row justify-between items-center">
              <Link href={`/editnote/${note?.id}`}>
                <CardTitle className="cursor-pointer text-heading text-md hover:underline underline-offset-2">
                  {note?.title?.length >= 40
                    ? note?.title.slice(0, 40) + "..."
                    : note?.title}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardFooter>
              <span className="text-xs text-muted-foreground">
                {getNoteTimestamp(note)}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/contexts/mode-toggle";
import { CornerUpLeft, Trash } from "lucide-react";
import { TooltipComponent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function TrashPopover({ isTrashOpen, setIsTrashOpen }: any) {
  const getArchivedNotes = async () => {
    const notes = await fetch("/api/notes/archive");
    const data = await notes.json();
    return data;
  };

  const { data: archivedNotes } = useQuery({
    queryKey: ["archivedNotes"],
    queryFn: getArchivedNotes,
  });

  const buttons = [
    {
      text: "Restaurar",
      icon: CornerUpLeft,
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
          {archivedNotes?.map((note: any) => (
            <div key={note?.id} className="flex items-center justify-between">
              <Link href={`/editnote/${note?.id}`}>
                <Label className="cursor-pointer hover:underline underline-offset-2">
                  {note?.title}
                </Label>
              </Link>
              <div className="flex flex-row items-center">
                {buttons?.map((button: any, index: any) => (
                  <TooltipComponent key={index} text={button.text}>
                    <Button variant="ghost">
                      <button.icon className="w-4 h-4" />
                    </Button>
                  </TooltipComponent>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

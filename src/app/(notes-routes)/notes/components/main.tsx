"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Archive,
  File,
  LogOut,
  Plus,
  Search,
  Settings,
  Trash2,
} from "lucide-react";

import { NotesList } from "@/app/(notes-routes)/notes/components/notes-list";
import { SideBar } from "@/app/(notes-routes)/notes/components/sidebar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DropdownAvatar from "@/components/dropdown-avatar";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useMediaQuery } from "usehooks-ts";
import { SettingsDialog } from "@/components/settings-dialog";
import TrashPopover from "@/components/trash-popover";
import { MailProps, NoteProps } from "@/lib/types";
import Editor from "@/components/editor/editor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTitleSchema } from "@/lib/schemas";
import * as z from "zod";

export default function Main({
  defaultLayout = [265, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps | any) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isOpen, setIsOpened] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteProps | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const form = useForm<z.infer<typeof createTitleSchema>>({
    mode: "onChange",
    resolver: zodResolver(createTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  const getUserNotes = async () => {
    const notes = await fetch("/api/notes");
    const data = await notes.json();
    return data;
  };

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getUserNotes,
  });

  // Set the most recent note as selected when notes are loaded
  useEffect(() => {
    if (notes && notes.length > 0) {
      const sortedNotes = [...notes].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      setSelectedNote(sortedNotes[0]);
      form.setValue("title", sortedNotes[0].title);
    }
  }, [notes, form]);

  const handleNoteSelect = (note: NoteProps) => {
    setSelectedNote(note);
    form.setValue("title", note.title);
  };

  const handleNewNote = () => {
    router.push("/createnote");
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={isMobile ? 40 : 30}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div className="flex flex-col h-full">
            <div
              className={cn(
                "flex h-[52px] items-center justify-center",
                isCollapsed ? "h-[52px]" : "px-2"
              )}
            >
              <DropdownAvatar isCollapsed={isCollapsed} />
            </div>
            <Separator />

            <SideBar
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Nova nota",
                  label: "",
                  icon: Plus,
                  variant: "default",
                  onClick: handleNewNote,
                },
                {
                  title: "Configurações",
                  label: "",
                  icon: Settings,
                  variant: "ghost",
                  onClick: () => setIsOpened(true),
                },
                {
                  title: "Lixeira",
                  label: "",
                  icon: Trash2,
                  variant: "ghost",
                  onClick: () => setIsTrashOpen(true),
                },
                {
                  title: "Sair",
                  label: "",
                  icon: LogOut,
                  variant: "ghost",
                  onClick: () => signOut(),
                },
              ]}
            />

            <div className="flex-1 overflow-hidden">
              <div className="p-2">
                <Input
                  placeholder="Pesquisar notas..."
                  className="w-full"
                  prefix={<Search className="w-4 h-4 text-muted-foreground" />}
                />
              </div>
              <div className="h-[calc(100%-60px)] overflow-y-auto">
                <NotesList
                  notes={notes}
                  isLoading={isLoading}
                  onNoteSelect={handleNoteSelect}
                  selectedNote={selectedNote}
                  isCollapsed={isCollapsed}
                />
              </div>
            </div>

            <SettingsDialog isOpen={isOpen} setIsOpened={setIsOpened} />
            <TrashPopover
              isTrashOpen={isTrashOpen}
              setIsTrashOpen={setIsTrashOpen}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="h-full flex flex-col">
            {selectedNote ? (
              <>
                <div className="flex items-center justify-between p-4 border-b">
                  <h1 className="text-xl font-semibold truncate">
                    {selectedNote.title}
                  </h1>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <Editor
                    form={form}
                    content={selectedNote.content}
                    handleChangeContent={() => {}}
                    readOnly
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <File className="w-12 h-12 mb-4" />
                <p>Selecione uma nota ou crie uma nova</p>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

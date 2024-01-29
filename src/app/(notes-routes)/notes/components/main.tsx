"use client";
import * as React from "react";
import { useState } from "react";
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
import { MailProps } from "@/lib/types";

export default function Main({
  defaultLayout = [680, 680],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps | any) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isOpen, setIsOpened] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const getUserNotes = async () => {
    const notes = await fetch("/api/notes");
    const data = await notes.json();
    return data;
  };

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getUserNotes,
  });

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
          defaultSize={defaultLayout[1]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={isMobile ? 40 : 20}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
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
                onClick: () => router.push("/createnote"),
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
          <SettingsDialog isOpen={isOpen} setIsOpened={setIsOpened} />
          <TrashPopover
            isTrashOpen={isTrashOpen}
            setIsTrashOpen={setIsTrashOpen}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={defaultLayout[2]}
          minSize={isMobile ? 10 : 20}
        >
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2 h-[52px]">
              <h1 className="text-xl font-bold">Notas</h1>
            </div>
            <Separator />

            {/* O PESQUISAR SERÁ ADICIONADO POSTERIORMENTE  */}

            {/* <div className="w-fit bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <Input
                  icon={
                    <Search className="h-4 w-4 text-sans text-muted-foreground" />
                  }
                  side="left"
                  placeholder="Pesquisar..."
                  className="pl-8"
                />
              </form>
            </div> */}

            <TabsContent value="all" className="m-0">
              <NotesList notes={notes} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

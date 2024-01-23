"use client"
import * as React from "react"
import { useState } from "react"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  LogOut,
  MessagesSquare,
  PenBox,
  Plus,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Trash2,
  User,
  UserCircle,
  Users2,
} from "lucide-react"

import { MailDisplay } from "@/app/(notes-routes)/mail/components/mail-display"
import { NotesList } from "@/app/(notes-routes)/mail/components/notes-list"
import { Nav } from "@/app/(notes-routes)/mail/components/nav"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import DropdownAvatar from "@/components/dropdown-avatar"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"
import { useMediaQuery } from "usehooks-ts"

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  defaultLayout?: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function Mail({
  accounts,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps | any) {

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const getUserNotes = async () => {
    const notes = await fetch("/api/notes");
    const data = await notes.json();
    return data;
  };

  const { data } = useQuery({ queryKey: ["notes"], queryFn: getUserNotes });
  const notes = data;

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
          maxSize={20}
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
          <Nav
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
                title: "Notas",
                label: "9",
                icon: File,
                variant: "ghost",
              },
              {
                title: "Configurações",
                label: "",
                icon: Settings,
                variant: "ghost",
              },
              {
                title: "Lixeira",
                label: "",
                icon: Trash2,
                variant: "ghost",
              },
              {
                title: "Arquivadas",
                label: "",
                icon: Archive,
                variant: "ghost",
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
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={defaultLayout[1]} minSize={20}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2 h-[52px]">
              <h1 className="text-xl font-bold">Notas</h1>
            </div>
            <Separator />
            <div className="w-fit bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            </div>

            <TabsContent value="all" className="m-0">
              <NotesList notes={notes} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>

        {/* <ResizableHandle withHandle />

        <ResizablePanel defaultSize={defaultLayout[2]}>

          <MailDisplay
            notes={notes}
            selectedNote={selectedNote}
          />
        </ResizablePanel> */}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

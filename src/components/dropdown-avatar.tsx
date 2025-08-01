"use client";

import {
  ChevronsLeftRight,
  Github,
  Laptop,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { TooltipComponent } from "./ui/tooltip";
import { IoIosArrowDown } from "react-icons/io";

export default function DropdownAvatar({ isCollapsed }: any) {
  const { setTheme } = useTheme();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isCollapsed ? (
          <div>
            <TooltipComponent text={user?.name} side="right" delayDuration={0}>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Icons.user className="h-5 w-5" />
                <span className="sr-only">{user?.name}</span>
              </Button>
            </TooltipComponent>
          </div>
        ) : (
          <div className="flex flex-row items-center w-full">
            <Button
              className="w-full gap-x-3 flex justify-between"
              variant="ghost"
            >
              <div className="flex items-center justify-start gap-2">
                <Avatar className="h-5 w-5 cursor-pointer">
                  <Icons.user className="h-5 w-5" />
                </Avatar>

                <p className="text-sm">{user?.name}</p>
              </div>
              <IoIosArrowDown className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sun className="mr-2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute mr-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span>Tema</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTheme("light")}
              >
                <Sun className="mr-2 h-4 w-4" />
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTheme("dark")}
              >
                <Moon className="mr-2 h-4 w-4" />
                Escuro
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTheme("system")}
              >
                <Laptop className="mr-2 h-4 w-4" />
                Sistema
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="https://github.com/JoaoGabriellBR/UpWrite">
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

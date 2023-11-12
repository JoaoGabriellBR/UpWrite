"use client"

import { Github, Laptop, LogOut, Moon, Sun } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
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
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { signOut, useSession } from "next-auth/react";

export default function DropdownAvatar() {

    const { setTheme } = useTheme();
    const { data: session } = useSession();
    const user = session?.user;
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer">
                    <Icons.user className="h-8 w-8 text-primary" />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
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
                            <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('light')}>
                                <Sun className="mr-2 h-4 w-4" />
                                Claro
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('dark')}>
                                <Moon className="mr-2 h-4 w-4" />
                                Escuro
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('system')}>
                                <Laptop className="mr-2 h-4 w-4" />
                                Sistema
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" asChild>
                    <a href="/" target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        <span>GitHub</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
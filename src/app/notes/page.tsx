'use client';

import { useMemo } from 'react';
import { Github, Laptop, LogOut, Moon, Sun } from 'lucide-react';
// import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';

export default function Notes() {

    const { setTheme } = useTheme();

    const testeCards = [
        {
            title: "Title 1",
            description: "Description of your note",
            updated_at: "Criado em 25/04/2022"
        },
        {
            title: "Title 1",
            description: "Description of your note",
            updated_at: "Criado em 25/04/2022"
        },
        {
            title: "Title 1",
            description: "Description of your note",
            updated_at: "Criado em 25/04/2022"
        }, 
    ];

    return (
        <>
            <header className=" w-full py-7">
                <div className="max-w-5xl mx-auto px-4 flex flex-row justify-between items-center">

                    <div className="flex flex-row justify-between items-center gap-1">
                        <Icons.logo className='w-6 h-6 text-primary' />
                        <h1 className="font-heading text-xl font-extrabold">React Notes</h1>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-10 w-10 cursor-pointer">
                                <Icons.user className="h-8 w-8 text-primary" />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">João Gabriel</p>
                                    <p className="text-xs leading-none text-muted-foreground">joaoname9@gmail.com</p>
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
                            <DropdownMenuItem className="cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sair</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

                   <hr className='w-full'/>
            <section className="max-w-5xl mx-auto px-4 py-8 md:py-10 flex flex-row items-center justify-between">

                <div className="space-y-2">
                    <h1 className="font-heading text-3xl md:text-4xl">Notas</h1>
                    <p className="text-lg text-muted-foreground">Criar e gerenciar notas</p>
                </div>

                <Button>
                    <Icons.plus className="w-5 h-5 mr-1"/>
                    Nova nota
                </Button>

            </section>

            <section className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-start gap-5">
                {testeCards?.map((card) => (
                    <>
                        <Card className="w-full flex flex-row justify-between items-center">
                            <CardHeader>
                                <Link href="#">
                                    <CardTitle>{card.title}</CardTitle>
                                </Link>
                                <CardDescription>{card.description}</CardDescription>
                            </CardHeader>
                            <CardHeader>
                                <CardDescription>{card.updated_at}</CardDescription>
                            </CardHeader>
                        </Card>
                    </>
                ))} 
               
            </section>

        </>
    )
}
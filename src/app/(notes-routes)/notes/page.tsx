"use client"
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import DropdownAvatar from '@/components/dropdown-avatar';
import moment from "moment";
import 'moment/locale/pt-br';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const getUserNotes = async () => {
    const notes = await fetch("/api/notes")
    const data = await notes.json()
    return data;
};

export default function Notes() {

    const { data } = useQuery({ queryKey: ['notes'], queryFn: getUserNotes })

    const getNoteTimestamp = (note: any) => {
        const createdAt = moment(note.created_at);
        const updatedAt = moment(note.updated_at);
    
        if (updatedAt.isValid() && updatedAt.isAfter(createdAt)) {
            return `Atualizado ${updatedAt.fromNow()}`;
        } else {
            return `Criado ${createdAt.fromNow()}`;
        }
    }

    return (
        <>
            <header className=" w-full py-7">
                <div className="max-w-4xl mx-auto px-4 flex flex-row justify-between items-center">
                    <Link as="/" href="/">
                        <div className="flex flex-row justify-between items-center gap-1 cursor-pointer">
                            <Icons.logo className='w-6 h-6 text-primary' />
                            <h1 className="font-heading text-xl font-extrabold">UpWrite</h1>
                        </div>
                    </Link>

                    <DropdownAvatar />
                </div>
            </header>

            <hr className='w-full' />
            <section className="max-w-4xl mx-auto px-4 py-8 md:py-10 flex flex-row items-center justify-between">
                <div className="space-y-2">
                    <h1 className="font-heading text-3xl md:text-4xl">Notas</h1>
                    <p className="text-lg text-muted-foreground">Criar e gerenciar notas</p>
                </div>

                <Link href="/createnote">
                    <Button>
                        <Icons.plus className="w-5 h-5 mr-1" />
                        Nova nota
                    </Button>
                </Link>
            </section>

            <section className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-start gap-5">
                {data?.map((note: any, index: any) => (
                    <Card key={index} className='w-full'>
                        <CardHeader className="w-full flex flex-row justify-between items-center">
                            <Link href={`/editnote/${note.id}`}>
                                <CardTitle className='hover:underline text-md font-normal'>{note.title.toLowerCase()}</CardTitle>
                            </Link>
                            <CardDescription>
                                {getNoteTimestamp(note)}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </section>
        </>
    )
}
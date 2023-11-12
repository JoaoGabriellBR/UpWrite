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
import { getServerSession } from "next-auth";
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/authOptions';
import moment from "moment";
import { Session } from '@/lib/types';

const getUserNotes = async () => {

    const session: Session | null = await getServerSession(authOptions);

    if (!session) return null;

    const notes = await prisma.notes.findMany({
        where: {
            id_author: session.user?.id
        },
        orderBy: {
            updated_at: 'desc'
        }
    });

    return notes;
};

export default async function Notes() {

    const notes = await getUserNotes();

    return (
        <>
            <header className=" w-full py-7">
                <div className="max-w-5xl mx-auto px-4 flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-between items-center gap-1">
                        <Icons.logo className='w-6 h-6 text-primary' />
                        <h1 className="font-heading text-xl font-extrabold">Note up</h1>
                    </div>
                    <DropdownAvatar />
                </div>
            </header>

            <hr className='w-full' />
            <section className="max-w-5xl mx-auto px-4 py-8 md:py-10 flex flex-row items-center justify-between">

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

            <section className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-start gap-5">
                {notes?.map((notes, index) => (
                    <Card key={index} className='w-full'>
                        <CardHeader className="w-full flex flex-row justify-between items-center">
                            <Link href="#">
                                <CardTitle>{notes.title.toLowerCase()}</CardTitle>
                            </Link>
                            <CardDescription>{moment(notes?.updated_at, "DDMMYYYY").fromNow()}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </section>

        </>
    )
}
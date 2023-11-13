import { EditorComponent } from "@/components/editor-component";
import HeaderNotes from "@/components/header-notes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Session } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Params {
    params: { noteId: string };
}

const getNoteById = async (noteId: string) => {

    const session: Session | null = await getServerSession(authOptions);

    if (!session) return null;

    const note = await prisma.notes.findFirst({
        where: {
            id: parseInt(noteId),
            id_author: session.user?.id
        },
    });

    return note;
};

export default async function EditNote({ params }: Params) {

    const note = await getNoteById(params.noteId)

    if (!note) {
        return notFound();
    }

    return (
        <>
            <HeaderNotes />
            <section className="w-full flex items-center">
                <div className="flex flex-col items-start w-full max-w-8xl mx-auto px-4">
                    <h1>{note?.title}</h1>
                    <EditorComponent
                    // defaultValue={text}
                    // onChange={(e: any) => setText(e.target.value)}
                    />
                </div>
            </section>
        </>
    )
}
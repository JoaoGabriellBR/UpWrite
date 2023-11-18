"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeaderNotes from "@/components/header-notes";
import Editor from "@/components/editor";
import { Params, NoteProps } from "@/lib/types";

const getNoteById = async (noteId: any, setNote: any) => {
    const response = await fetch(`/api/notes/noteId?id=${noteId}`)
    setNote(response.json())
}

export default function EditNote({ params }: Params) {

    const [note, setNote] = useState<NoteProps>();

    const noteId = params.noteId;

    const { data, isLoading } = useQuery({
        queryKey: ['note', noteId],
        queryFn: () => getNoteById(noteId, setNote),
    });

    if(isLoading){
        return <h1>Carregando</h1>
    }

    return (
        <>
            <HeaderNotes />
            <section className="w-full flex items-center">
                <div className="flex flex-col items-start w-full max-w-8xl mx-auto px-4">
                    <h1>{note?.title}</h1>
                    <Editor
                    // defaultValue={text}
                    // onChange={(e: any) => setText(e.target.value)}
                    />
                </div>
            </section>
        </>
    )
}
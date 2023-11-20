"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeaderNotes from "@/components/header-notes";
import Editor from "@/components/editor";
import { Params, NoteProps } from "@/lib/types";

const getNoteById = async (noteId: any, setNote: any) => {
    const response = await fetch(`/api/notes/noteId?id=${noteId}`)
    const data = await response.json()
    setNote(data)
}

export default function EditNote({ params }: Params) {

    const [note, setNote] = useState<NoteProps>();

    const noteId = params.noteId;

    const { } = useQuery({
        queryKey: ['note', noteId],
        queryFn: () => getNoteById(noteId, setNote),
    });

    const handleChangeTitle = (e: any) => {
        if (note) {
            const updatedNote = { ...note, content: e.target.value };
            setNote(updatedNote);
        }
    };

    const handleChangeContent = ({ editor }: any) => {
        if (note) {
            const updatedNote = { ...note, content: editor.getHTML() };
            setNote(updatedNote);
        }
    };

    return (
        <>
            <HeaderNotes />
            <section className="w-full flex items-center">
                <div className="flex flex-col items-start w-full max-w-8xl mx-auto px-4">
                    <Editor
                        note={note}
                        title={note?.title}
                        content={note?.content}
                        handleChangeTitle={handleChangeTitle}
                        handleChangeContent={handleChangeContent}
                    />
                </div>
            </section>
        </>
    )
}
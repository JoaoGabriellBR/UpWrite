"use client"

import { useCallback, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import HeaderNotes from "@/components/header-notes";
import Editor from "@/components/editor";
import { Params, NoteProps } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function EditNote({ params }: Params) {

    const noteId = params.noteId;
    const queryClient = useQueryClient();

    const [note, setNote] = useState<NoteProps>();
    const [loading, setLoading] = useState(false);

    const getNoteById = async () => {
        const response = await fetch(`/api/notes/noteId?id=${noteId}`)
        const data = await response.json()
        setNote(data)
    }

    const { isLoading } = useQuery({
        queryKey: ['note', noteId],
        queryFn: getNoteById,
    });

    const updateNote = async () => {
        setLoading(true);
        await fetch(`/api/notes/noteId?id=${noteId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: note?.title,
                content: note?.content
            })
        });
        setLoading(false);
    };

    const onSuccess = useCallback(() => {
        toast({
            title: 'Sucesso.',
            description: 'Sua nota foi atualizada com sucesso.',
            variant: 'default',
            duration: 3000,
        });
    }, []);

    const onError = useCallback(() => {
        toast({
            title: 'Algo deu errado.',
            description: 'Não foi possível atualizar a sua nota. Tente novamente.',
            variant: 'destructive',
            duration: 3000,
        });
    }, []);

    const { mutate } = useMutation({
        mutationFn: updateNote,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const handleClickEditNote = useCallback(() => {
        mutate();
    }, [mutate]);

    const handleChangeTitle = (e: any) => {
        if (note) {
            const updatedNote = { ...note, title: e.target.value };
            setNote(updatedNote);
        }
    };

    const handleChangeContent = ({ editor }: any) => {
        if (note) {
            const updatedNote = { ...note, content: editor.getJSON() };
            setNote(updatedNote);
        }
    };

    if (isLoading) {
        return null;
    }

    return (
        <>
            <HeaderNotes note={note} noteFunction={handleClickEditNote} loading={loading} />
            <Editor
                title={note?.title}
                content={note?.content}
                handleChangeTitle={handleChangeTitle}
                handleChangeContent={handleChangeContent}
            />
        </>
    )
}
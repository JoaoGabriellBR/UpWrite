"use client"

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Editor from "@/components/editor";
import HeaderNotes from "@/components/header-notes";
import { toast } from "@/components/ui/use-toast";

export default function CreateNote() {

    const router = useRouter();
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const createNote = async () => {
        setLoading(true);
        await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            })
        });
        setLoading(false);
    };

    const onSuccess = useCallback(() => {
        router.refresh();
        router.push('/notes');
    }, [router]);

    const onError = useCallback(() => {
        toast({
            title: 'Algo deu errado.',
            description: 'Não foi possível criar a sua nota. Tente novamente.',
            variant: 'destructive',
            duration: 3000,
        });
    }, []);

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const handleClickCreateNote = useCallback(() => {
        mutate();
    }, [mutate]);

    const handleChangeTitle = (e: any) => {
        setTitle(e.target.value)
    }

    const handleChangeContent = ({ editor }: any) => {
        setContent(editor.getJSON())
    }

    return (
        <>
            <HeaderNotes noteFunction={handleClickCreateNote} loading={loading} />
            <div className="flex flex-col items-start max-w-3xl mx-auto px-4 py-10">
                <Editor
                    title={title}
                    content={content}
                    handleChangeTitle={handleChangeTitle}
                    handleChangeContent={handleChangeContent}
                />
            </div>
        </>
    )
}
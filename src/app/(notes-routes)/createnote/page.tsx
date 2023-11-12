"use client"

import { useState } from "react";
import Editor from "@/components/editor";
import HeaderNotes from "@/components/header-notes";
import { redirect } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function CreateNote() {

    const toaster = useToast();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const createNewNote = async () => {

        setLoading(true);

        try {

            const response = await fetch('/api/notes', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    content
                })
            });

            toaster.toast({
                variant: 'default',
                title: "Sucesso",
                description: "A sua nota foi criada com sucesso.",
            })
            redirect('/notes')

        } catch (error) {
            console.log(error)
            toaster.toast({
                variant: 'destructive',
                title: "Erro",
                description: "Não foi possível criar a sua nota.",
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <HeaderNotes createNewNote={createNewNote} loading={loading}/>
            <section className="w-full">
                <div className="flex flex-col items-start w-[100%] max-w-8xl mx-auto px-4">
                    <Editor
                        title={title}
                        setTitle={setTitle}
                        content={content}
                        setContent={setContent}
                    />
                </div>
            </section>
        </>
    )
}
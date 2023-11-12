"use client"

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

export default function HeaderNotes({ createNewNote, loading }: any) {

    const router = useRouter();

    return (
        <>
            <header className=" w-full py-3">
                <div className="max-w-8xl mx-auto px-4 flex flex-row justify-between items-center">
                    <Button variant="ghost" onClick={() => router.back()} >
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </Button>
                    <div className="flex flex-row items-center gap-3">

                        <Button
                            disabled={loading}
                            onClick={createNewNote}
                            variant="outline"
                            type="submit"
                            className="h-9 border-none"
                        >
                            <Icons.check className="mr-2 h-5 w-5" />
                            {loading ? "Salvando" : "Salvar"}
                        </Button>
                    </div>
                </div>
            </header>
        </>
    )
}
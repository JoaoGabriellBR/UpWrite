"use client"

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import DropdownAvatar from "@/components/dropdown-avatar";
import InputEditor from "@/components/Input-editor";
import Editor from "@/components/editor";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function CreateNote() {

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

                        <Button variant="outline" type="submit" className="h-9 border-none">
                            <Icons.check className="mr-2 h-5 w-5" />
                            Salvar
                        </Button>

                        <Button type="button" size="icon" variant="ghost">
                            <Icons.close className="h-5 w-5" />
                        </Button>
                    </div>

                </div>
            </header>

            <section className="w-full">
                <div className="flex flex-col items-start w-[100%] max-w-8xl mx-auto px-4">
                    <Editor />
                </div>

                <div className="flex flex-col items-start w-[100%] max-w-8xl mx-auto px-4">
                    <InputEditor />
                </div>
            </section>
        </>
    )
}
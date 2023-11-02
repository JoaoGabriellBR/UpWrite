"use client"

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import DropdownAvatar from "@/components/dropdown-avatar";
import Editor from "@/components/editor";

export default function CreateNote() {

    const router = useRouter();

    return (
        <>
            <header className=" w-full py-7">
                <div className="max-w-7xl mx-auto px-4 flex flex-row justify-between items-center">
                    <Button variant="ghost" onClick={() => router.back()} >
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </Button>
                    <DropdownAvatar />
                </div>

                <section className="max-w-7xl mx-auto px-4 py-8 md:py-10 flex flex-row items-center justify-between">
                    <Editor/>
                </section>
            </header>
        </>
    )
}
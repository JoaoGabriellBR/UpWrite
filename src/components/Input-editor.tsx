"use client"

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CustomInput } from "@/components/custom-input";

export default function InputEditor() {

    const [text, setText] = useState('');


    return (
        <>
            <Input outline placeholder="Título" className="border-none py-7 placeholder:opacity-70 scroll-m-20 text-2xl tracking-tight lg:text-3xl" />
            {/* <Textarea
                placeholder="Comece a escrever suas ideias..."
                className="min-h-[100px] md:min-h-[20rem] lg:min-h-[20rem] placeholder:opacity-70"
            /> */}
            <CustomInput
                defaultValue={text}
                onChange={(e) => setText(e.target.value)}
            />
        </>
    )
}
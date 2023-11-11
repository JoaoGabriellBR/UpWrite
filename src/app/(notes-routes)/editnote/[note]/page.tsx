"use client"

import { useState } from "react";
import Editor from "@/components/editor";
import HeaderNotes from "@/components/header-notes";

export default function EditNote() {

    const [text, setText] = useState('');

    return (
        <>
            <HeaderNotes />
            <section className="w-full flex items-center">
                <div className="flex flex-col items-start w-full max-w-8xl mx-auto px-4">
                    <Editor
                        defaultValue={text}
                        onChange={(e: any) => setText(e.target.value)}
                    />
                </div>
            </section>
        </>
    )
}
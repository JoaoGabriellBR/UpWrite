"use client" 

import { useState } from "react";
import InputEditor from "@/components/Input-editor";
import Editor from "@/components/editor";
import HeaderNotes from "@/components/header-notes";
import { CustomInput } from "@/components/custom-input";

export default function CreateNote() {

    const [text, setText] = useState('');

    return (
        <>
            <HeaderNotes />
            <section className="w-full">
                {/* <div className="flex flex-col items-start w-[100%] max-w-8xl mx-auto px-4">
                    <Editor />
                </div> */}

                {/* <div className="flex flex-col items-start w-[100%] max-w-8xl mx-auto px-4">
                    <InputEditor />
                </div> */}

                <CustomInput
                    defaultValue={text}
                    onChange={(e) => setText(e.target.value)}
                />


            </section>
        </>
    )
}
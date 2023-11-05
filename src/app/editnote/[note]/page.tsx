import InputEditor from "@/components/Input-editor";
import Editor from "@/components/editor";
import HeaderNotes from "@/components/header-notes";

export default function EditNote() {

    return (
        <>
            <HeaderNotes />
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
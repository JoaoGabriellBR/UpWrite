import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function InputEditor() {
    return (
        <>
            <div className="w-[85%] py-7 flex flex-col items-start justify-start">
                <Card className="bg-transparent m-0 p-0 border-none">
                    <CardTitle className="text-3xl">Título</CardTitle>
                    <CardDescription>
                        Descrição do trabalho.
                    </CardDescription>
                </Card>
                <Textarea
                    placeholder="Write a tagline for an ice cream shop"
                    className="py-7 min-h-[100px] md:min-h-[20rem] lg:min-h-[20rem] border-none focus:outline-none focus:ring-0"
                />
            </div>
        </>
    )
}
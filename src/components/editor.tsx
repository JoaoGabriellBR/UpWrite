import { Metadata } from "next";
import Image from "next/image";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Editor() {
    return (
        <>
            <Card className="w-full min-h-[500px]">
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                        Make changes to your account here. Click save when you are done.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 h-full">
                    <Textarea
                        placeholder="Write a tagline for an ice cream shop"
                        className="min-h-[100px] md:min-h-[20rem] lg:min-h-[20rem] border-none"
                    />
                </CardContent>

                <CardFooter>
                    <Button>Save changes</Button>
                </CardFooter>
            </Card>


        </>
    )
}
"use client"

import { signIn } from "next-auth/react";
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { inputFields } from "@/lib/inputFields";

interface FormDataType {
    name: string;
    email: string;
    password: string;
}

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof FormDataType) => {
        setFormData({ ...formData, [field]: e.target.value })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormData({ name: "", email: "", password: "" });

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);
            if (!res.ok) {
                setError((await res.json()).message);
                return;
            }

            signIn(undefined, { callbackUrl: "/login" });
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
            console.log(error)
        }
    };

    return (
        <>
            <header className=" w-full py-7">
                <div className="max-w-7xl mx-auto px-4">
                    <Button variant="ghost" onClick={() => router.back()} >
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </Button>
                </div>
            </header>

            <section className="py-8 md:py-20 w-full flex flex-col justify-center items-center">
                <Card>
                    <CardHeader className="space-y-1 flex items-center">
                        <Icons.logo className="h-6 w-6 text-primary" />
                        <CardTitle className="text-2xl">Criar uma conta</CardTitle>
                        <CardDescription>
                            Coloque o seu email abaixo para criar sua conta.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                            </div>
                        </div>

                        {error && (
                            <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
                        )}

                        {inputFields?.map((input) => (
                            <div key={input.id} className="grid gap-2">
                                <Label htmlFor={input.htmlFor}>{input.label}</Label>
                                <Input
                                    id={input.id}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={formData[input.id as keyof FormDataType]}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                                    onChange={(e) => handleChange(e, input.id as keyof FormDataType)}
                                />
                            </div>
                        ))}

                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                            className="w-full">
                            {loading ? "Criando conta..." : "Criar Conta"}
                        </Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}
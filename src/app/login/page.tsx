"use client"

import { useState, ChangeEvent } from 'react';
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
import { useRouter } from 'next/navigation';
import { inputFields } from '@/lib/inputFields';
import { signIn } from "next-auth/react";
import { getToken } from 'next-auth/jwt';

interface FormDataType {
    email: string;
    password: string;
}

export default function Login() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof FormDataType) => {
        setFormData({ ...formData, [field]: e.target.value })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFormData({ email: "", password: "" });

            const res = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (!res?.error) {
                router.replace("/notes");
            } else {
                setError("Email ou senha inválida.");
            }
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = async (req: any) => {
        const token = await getToken({ req });
        if (!token) {
            return router.push("/")
        }
    }

    return (
        <>
            <header className=" w-full py-7">
                <div className="max-w-7xl mx-auto px-4">
                    <Button variant="ghost" onClick={handleBack}>
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </Button>
                </div>
            </header>

            <section className="overflow-hidden py-8 md:py-20 w-full flex flex-col justify-center items-center">
                <Card>
                    <CardHeader className="space-y-1 flex items-center">
                        <Icons.logo className="h-6 w-6 text-primary" />
                        <CardTitle className="text-2xl">Bem vindo de volta</CardTitle>
                        <CardDescription>
                            Insira o seu email abaixo para logar em sua conta.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4" >
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
                        {inputFields?.slice(1).map((input) => (
                            <div key={input.id} className="grid gap-2">
                                <Label htmlFor={input.htmlFor}>{input.label}</Label>
                                <Input
                                    senha
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
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}
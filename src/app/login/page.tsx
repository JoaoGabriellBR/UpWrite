"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { inputFields } from '@/lib/inputFields';
import { signIn } from "next-auth/react";
import { getToken } from 'next-auth/jwt';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
    email: z.string().min(1, {
        message: "O campo de e-mail não pode estar vazio.",
    }).email({
        message: "Por favor, insira um endereço de e-mail válido.",
    }),
    password: z.string().min(1, {
        message: "O campo de senha não pode estar vazio.",
    }).min(8, {
        message: "A senha deve ter pelo menos 8 caracteres.",
    }),
});


export default function Login() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = async () => {

        setLoading(true);
        const email = form.getValues("email")
        const password = form.getValues("password");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (!res?.error) {
            setLoading(false);
            router.replace("/notes");
        } else {
            setLoading(false);
            if (res.error === 'Email incorreto') {
                form.setError('email', {
                    type: 'manual',
                    message: 'O e-mail inserido está incorreto.',
                });
            } else if (res.error === 'Senha incorreta') {
                form.setError('password', {
                    type: 'manual',
                    message: 'A senha inserida está incorreta.',
                });
            }
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

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
                                {inputFields?.slice(1).map((input) => (
                                    <FormField
                                        key={input.id}
                                        control={form.control}
                                        name={input.id}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{input.label}</FormLabel>
                                                <FormControl>
                                                    <Input senha={true} placeholder={input.placeholder} {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full"
                                >
                                    {loading ? (
                                        <>
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            Entrando
                                        </>
                                    ) : <> Entrar </>}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { inputFields } from "@/lib/inputFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "O nome de usuário não pode estar vazio.",
    })
    .min(2, {
      message: "O nome de usuário deve ter pelo menos 2 caracteres.",
    }),
  email: z
    .string()
    .min(1, {
      message: "O campo de e-mail não pode estar vazio.",
    })
    .email({
      message: "Por favor, insira um endereço de e-mail válido.",
    }),
  password: z
    .string()
    .min(1, {
      message: "O campo de senha não pode estar vazio.",
    })
    .min(8, {
      message: "A senha deve ter pelo menos 8 caracteres.",
    }),
});

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form.getValues()),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setLoading(false);
      signIn(undefined, { callbackUrl: "/login" });
    } else {
      setLoading(false);
      toast({
        title: "Erro.",
        description: "Não foi possível criar a sua conta.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <header className=" w-full pt-7">
        <div className="max-w-7xl mx-auto px-4">
          <Button variant="ghost" onClick={() => router.back()}>
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
              <div className="relative flex justify-center text-xs uppercase"></div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                {inputFields?.map((input) => (
                  <FormField
                    key={input.id}
                    control={form.control}
                    name={input.id as "name" | "email" | "password"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{input.label}</FormLabel>
                        <FormControl>
                          <Input
                            type={input.id}
                            placeholder={input.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta
                    </>
                  ) : (
                    <> Criar Conta </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

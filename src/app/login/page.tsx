"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { inputFields } from "@/lib/arrays";
import { signIn } from "next-auth/react";
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
import { formSchemaLogin } from "@/lib/schemas";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    const email = form.getValues("email");
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
      if (res.error === "Email incorreto") {
        form.setError("email", {
          type: "manual",
          message: "O e-mail inserido está incorreto.",
        });
      } else if (res.error === "Senha incorreta") {
        form.setError("password", {
          type: "manual",
          message: "A senha inserida está incorreta.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      <header className="absolute top-0 left-0 w-full p-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="hover:bg-background/20"
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </header>

      <div className="flex min-h-screen">
        <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md auth-card">
            <CardHeader className="space-y-1 flex items-center text-center">
              <Image
                src="/logo.png"
                alt="Logotipo João Gabriel Silva"
                height={30}
                width={30}
              />
              <CardTitle className="text-2xl">Bem vindo de volta</CardTitle>
              <CardDescription>
                Insira o seu email abaixo para logar em sua conta.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
                  {inputFields?.slice(1).map((input) => (
                    <FormField
                      key={input.id}
                      control={form.control}
                      name={input.id as "email" | "password"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{input.label}</FormLabel>
                          <FormControl>
                            <Input
                              type={input.id}
                              placeholder={input.placeholder}
                              className="auth-input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className="flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full auth-button"
                  >
                    {loading ? (
                      <>
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        Entrando
                      </>
                    ) : (
                      <>Entrar</>
                    )}
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    Não possui uma conta?{" "}
                    <Link
                      href="/register"
                      className="text-primary hover:underline"
                    >
                      Criar conta
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="hidden lg:flex lg:w-1/2 relative auth-gradient">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
            <h1 className="text-4xl font-bold mb-4">
              Desbloqueie sua criatividade com UpWrite.
            </h1>
            <p className="text-lg text-center max-w-lg">
              Sua plataforma inteligente para notas e ideias, potencializada por
              IA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
import { inputFields } from "@/lib/arrays";
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
import { formSchemaRegister } from "@/lib/schemas";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchemaRegister>>({
    resolver: zodResolver(formSchemaRegister),
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
              <Icons.logo className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-2xl">Criar uma conta</CardTitle>
              <CardDescription>
                Coloque o seu email abaixo para criar sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
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
                              className="auth-input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full auth-button"
                  >
                    {loading ? (
                      <>
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        Criando conta
                      </>
                    ) : (
                      <>Criar Conta</>
                    )}
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    Já possui uma conta?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:underline"
                    >
                      Fazer login
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

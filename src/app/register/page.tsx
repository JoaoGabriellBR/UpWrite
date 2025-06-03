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
import Image from "next/image";

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
          className="hover:bg-background"
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </header>

      <div className="flex min-h-screen">
        <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md border-none bg-transparent">
            <CardHeader className="space-y-1 flex items-start text-start">
              <CardTitle className="text-4xl font-heading">
                Criar uma conta
              </CardTitle>
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
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 space-y-10">
            <Image
              src="/signin.png"
              alt="Logotipo João Gabriel Silva"
              priority
              quality={100}
              loading="eager"
              unoptimized
              draggable={false}
              height={1000}
              width={1000}
            />
            <h1 className="max-w-3xl text-center font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Desbloqueie sua criatividade com UpWrite.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

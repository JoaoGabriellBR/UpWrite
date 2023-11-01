"use client"
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

export default function Register() {

    const router = useRouter();

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

            <section className="overflow-hidden py-8 md:py-20 w-full flex flex-col justify-center items-center">
                <Card>
                    <CardHeader className="space-y-1">
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
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" type="text" placeholder="João Gabriel" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="user@example.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" placeholder="********" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Criar conta</Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}
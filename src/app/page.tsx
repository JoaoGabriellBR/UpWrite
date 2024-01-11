import Header from "@/components/header";
import PerguntasRespostas from "@/components/perguntas-e-respostas";
import Garanta from "@/components/garanta";
import Organizaçao from "@/components/organizaçao";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Preserve from "@/components/preserve";
import DeUmUp from "@/components/de-um-up";
import Footer from "@/components/footer";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Header />
      <section className="py-8 md:py-20 w-full flex flex-col justify-center items-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href="https://github.com/JoaoGabriellBR/UpWrite"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Confira o projeto no Github
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Simplifique sua vida e aumente sua produtividade.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Crie notas e páginas com recursos avançados de edição de texto,
            melhorando sua produtividade e simplificando sua rotina.
          </p>
          <div className="space-x-4">
            <Button asChild size="default">
              <Link
                href="/register"
                className="flex flex-row items-center gap-2"
              >
                Registrar
                <Icons.arrowRight size={15} />
              </Link>
            </Button>
            <Button asChild size="default" variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      <Garanta />
      <Organizaçao />
      <Preserve />
      <PerguntasRespostas />
      <DeUmUp />
      <Footer/>
    </>
  );
}

import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <section className="py-8 md:py-20 w-full flex flex-col justify-center items-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href=""
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Confira no Github
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Simplifique sua vida e aumente sua produtividade.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Crie notas e páginas com recursos avançados de edição de texto,
            melhorando sua produtividade e simplificando sua rotina.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/register">Registrar</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

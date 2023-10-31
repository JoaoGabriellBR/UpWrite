import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href=""
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Github
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
              <Link href="/login">Registrar</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="" target="_blank" rel="noreferrer">
                Login
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

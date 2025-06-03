import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "../icons";

export default function DeUmUp() {
  return (
    <>
      <section className="py-8 md:py-20 w-full min-h-[50vh] flex items-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
            Dê um <span className="text-gradient">Up</span> na sua vida{" "}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Organize sua vida, liberte sua mente: UpWrite, o site que faz suas
            ideias brilharem!
          </p>
          <div className="space-x-4">
            <Button asChild size="default">
              <Link
                href="/register"
                className="flex flex-row items-center gap-2 bg-gradient"
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
    </>
  );
}

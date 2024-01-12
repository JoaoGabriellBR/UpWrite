import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptyNotes() {
  return (
    <div className="max-w-4xl mx-auto min-h-[20rem] px-4 flex flex-col items-center justify-center gap-2 border border-dashed">
      <div className="bg-secondary flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icons.bookOpen className={cn("h-8 w-8")} />
      </div>

      <h2 className={cn("text-xl font-semibold")}>Sem notas criadas</h2>
      <p
        className={cn(
          "text-center text-sm font-normal leading-6 text-muted-foreground"
        )}
      >
        Você ainda não tem nenhuma nota. Comece criando uma.
      </p>
      <Link href="/createnote">
        <Button variant="outline">
          <Icons.plus className="w-5 h-5 mr-1" />
          Nova nota
        </Button>
      </Link>
    </div>
  );
}

import Link from "next/link";
import { ModeToggle } from "@/contexts/mode-toggle";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";

export default function Header() {
  return (
    <header className=" w-full py-7">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 flex flex-row justify-between items-center">
        <Link as="/" href="/">
          <div className="flex flex-row items-center gap-1">
            {/* <Icons.logo className="w-6 h-6 text-primary font-bold" /> */}
            <Image
              src={"/logo.png"}
              alt="Logotipo João Gabriel Silva"
              height={22}
              width={22}
            />
            <h1 className="font-heading text-2xl font-black">upwrite</h1>
          </div>
        </Link>

        <div className="flex flex-row items-center space-x-1">
          <ModeToggle />
          <Button asChild variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

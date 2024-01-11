import Link from "next/link";
import { ModeToggle } from "@/contexts/mode-toggle";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import bannerFooter from "../../public/footer-banner.png";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    {
      name: "Home",
      href: "",
    },
    {
      name: "Características",
      href: "",
    },
    {
      name: "FAQ",
      href: "",
    },
    {
      name: "Por que Up Write?",
      href: "",
    },
    {
      name: "Política de privacidade",
      href: "",
    },
    {
      name: "Termos e condições",
      href: "",
    },
  ];

  return (
    // <footer className=" w-full py-7">

    //   <div className="max-w-7xl mx-auto px-4 flex flex-row justify-between items-center">
    //     <Link as="/" href="/">
    //       <div className="flex flex-row justify-between items-center gap-1">
    //         <Icons.logo className="w-6 h-6 text-primary font-bold" />
    //         <h1 className="font-heading text-xl font-extrabold">UpWrite</h1>
    //       </div>
    //     </Link>

    //     <div className="flex flex-row items-center space-x-1">
    //       <ModeToggle />
    //       <Button asChild variant="secondary">
    //         <Link href="/login">Login</Link>
    //       </Button>
    //     </div>

    //   </div>

    // </footer>

    <footer className="py-10 sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-8 gap-y-16 gap-x-12">
          
          <div className="col-span-2 md:col-span-3 lg:col-span-4 lg:pr-8 space-y-4">
           
            <Link as="/" href="/">
              <div className="flex flex-row gap-1">
                <Icons.logo className="w-6 h-6 text-primary font-bold" />
                <h1 className="font-heading text-xl font-extrabold">UpWrite</h1>
              </div>
            </Link>

            <p className="leading-normal text-muted-foreground text-md">
              Crie notas e páginas com recursos avançados de edição de texto,
              melhorando sua produtividade e simplificando sua rotina.
            </p>

            <ul className="flex items-center space-x-3">
              <li>
                <Icons.github className="leading-normal text-muted-foreground cursor-pointer h-5 w-5 transition-all duration-200 hover:text-primary focus:text-primary" />
              </li>
              <li>
                <Icons.linkedin className="leading-normal text-muted-foreground cursor-pointer h-5 w-5 transition-all duration-200 hover:text-primary focus:text-primary" />
              </li> 
            </ul>

          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <h1 className="font-heading text-xl">Company</h1>

            <ul className="mt-6 space-y-4">
              {links.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="leading-normal text-muted-foreground text-md flex transition-all duration-200 hover:text-primary focus:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <h1 className="font-heading text-xl">Company</h1>

            <ul className="mt-6 space-y-4">
              {links.slice(4).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="leading-normal text-muted-foreground text-md flex transition-all duration-200 hover:text-primary focus:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <hr className="mt-16 mb-10" />

        <p className="leading-normal text-muted-foreground text-center text-xs">
          © Copyright {year}, Todos os direitos reservados por UpWrite
        </p>
      </div>
    </footer>
  );
}

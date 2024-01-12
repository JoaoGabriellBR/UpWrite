import Link from "next/link";
import { Icons } from "@/components/icons";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "Por que UpWrite?",
      href: "#porqueupwrite",
    },
    {
      name: "Características",
      href: "#caracteristicas",
    },
    {
      name: "Novidades",
      href: "#novidades",
    },
    {
      name: "FAQ",
      href: "#faq",
    },
    {
      name: "Política de privacidade",
      href: "/politica-de-privacidade",
    },
    {
      name: "Termos e condições",
      href: "/termos-e-condicoes",
    },
  ];

  return (
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

            <p className="w-full md:w-[60%] lg:w-[60%] leading-normal text-muted-foreground text-md">
              Seus pensamentos, suas notas, um local para organizar suas ideias
              e inspirações.
            </p>

            <ul className="flex items-center space-x-3">
              <li>
                <Link href="https://github.com/JoaoGabriellBR" target="blank">
                  <Icons.github className="leading-normal text-muted-foreground cursor-pointer h-5 w-5 transition-all duration-200 hover:text-primary focus:text-primary" />
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/in/joaogabriel-silva" target="blank">
                  <Icons.linkedin className="leading-normal text-muted-foreground cursor-pointer h-5 w-5 transition-all duration-200 hover:text-primary focus:text-primary" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <h1 className="font-heading text-xl">Links</h1>

            <ul className="mt-6 space-y-4">
              {links.slice(0, 5).map((link) => (
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
            <h1 className="font-heading text-xl">Sobre</h1>

            <ul className="mt-6 space-y-4">
              {links.slice(5).map((link) => (
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

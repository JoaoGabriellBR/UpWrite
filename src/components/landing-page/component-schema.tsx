import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Icons } from "../icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SmartphoneMockup } from "../smartphone-mockup";

const ComponentSchema = ({
  id,
  title,
  description,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imagePosition,
  button,
  textButton,
}: any) => {
  return (
    <section id={id} className="py-6 sm:py-8 md:py-12 w-full">
      <div
        className={cn(
          "max-w-7xl px-4 mx-auto flex flex-col justify-between items-center gap-8 md:gap-12 lg:gap-20",
          imagePosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
        )}
      >
        <div className="relative w-full lg:w-1/2 min-h-[40vh] lg:min-h-[60vh] flex items-center">
          {/* Background Gradient */}
          <div className="absolute inset-0 dark:inset-[60px] bg-gradient-to-br from-purple-900/80 via-blue-800/50 to-transparent rounded-sm dark:rounded-[10rem] blur-[7rem] dark:blur-[6rem]" />

          <div className="relative w-full h-full flex items-center justify-center">
            {id === "caracteristicas" ? (
              <SmartphoneMockup />
            ) : (
              <div className="relative w-full aspect-[16/9] flex items-center justify-center">
                <Image
                  src={imageSrc}
                  alt={imageAlt || "Imagem ilustrativa"}
                  width={imageWidth}
                  height={imageHeight}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-contain"
                  priority={id === "porqueupwrite"}
                />
              </div>
            )}
          </div>
        </div>

        <Card className="w-full lg:w-1/2 border-none shadow-none">
          <CardHeader>
            <CardTitle className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl break-words">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="leading-relaxed text-muted-foreground text-base sm:text-lg md:text-xl">
              {description}
            </p>
          </CardContent>

          {button && textButton && (
            <CardFooter>
              <Link
                href="/register"
                className="flex flex-row justify-start items-center gap-2 text-primary underline-offset-4 hover:underline transition-colors duration-200"
              >
                {textButton}
                <Icons.arrowRight size={15} />
              </Link>
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
};

export default ComponentSchema;

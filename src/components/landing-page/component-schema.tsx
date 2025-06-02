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
    <section id={id} className="py-8 md:py-20 w-full">
      <div
        className={cn(
          "max-w-7xl px-4 mx-auto container flex flex-col justify-between items-center gap-4",
          imagePosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
        )}
      >
        {/* <div className="w-full lg:w-1/2">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            layout="responsive"
            objectFit="contain"
          />
        </div> */}

        <div className="flex flex-row justify-center items-center relative w-full lg:w-1/2 min-h-[80vh] max-h-[80vh] aspect-[16/9]">
          {/* Background Gradient */}
          {/* {id === "novidades" && ( */}
          <div className="absolute dark:inset-[60px] bg-gradient-to-br from-purple-900/80 via-blue-800/50 to-transparent rounded-sm dark:rounded-[10rem] blur-[7rem] dark:blur-[6rem]" />
          {/* )} */}

          {/* Image */}
          {id === "caracteristicas" ? (
            <SmartphoneMockup />
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              layout="responsive"
              objectFit="contain"
            />
          )}
        </div>

        <Card className="w-full lg:w-1/2 border-none p-0 m-0">
          <CardHeader>
            <CardTitle className="font-heading text-6xl">{title}</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-8">
              {description}
            </p>
          </CardContent>

          {button && textButton && (
            <CardFooter>
              <Link
                href="/register"
                className="flex flex-row justify-start items-center gap-2 text-primary underline-offset-4 hover:underline"
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

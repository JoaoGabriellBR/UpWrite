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
          "max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 container flex flex-col justify-between items-center gap-4",
          imagePosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
        )}
      >
        <div className="w-full lg:w-1/2">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            layout="responsive"
            objectFit="contain"
          />
        </div>

        <Card className="w-full lg:w-1/2 border-none p-0 m-0">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">{title}</CardTitle>
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

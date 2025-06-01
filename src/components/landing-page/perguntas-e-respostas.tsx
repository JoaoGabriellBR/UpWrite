"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PerguntasRespostas = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | undefined>();

  const solutions = [
    {
      value: "individuals",
      title: "Individuals",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laudantium in iusto iure aliquam commodi possimus eaque sit recusandae incidunt?",
      image: "/public/mockup.png",
    },
    {
      value: "Inteligência Artificial?",
      title: "Inteligência Artificial?",
      description:
        "Tailored solutions for growing businesses. Scale your operations with our enterprise-grade tools and support.",
      image: "/public/novidades.png",
    },
    {
      value: "enterprise",
      title: "Enterprise",
      description:
        "Custom solutions for large organizations. Get dedicated support and advanced features for your team.",
      image: "/public/novidades.png",
    },
  ];

  return (
    <section className="py-8 md:py-20 w-full">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="font-heading text-4xl sm:text-4xl md:text-5xl lg:text-6xl pb-10">
          Perguntas e Respostas
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4"
              value={activeAccordion}
              onValueChange={setActiveAccordion}
            >
              {solutions.map((solution) => (
                <AccordionItem
                  key={solution.value}
                  value={solution.value}
                  className={cn(
                    "border-2 rounded-[1rem] px-6 py-2 transition-all duration-200"
                  )}
                  // style={{
                  //   borderImage:
                  //     activeAccordion === solution.value
                  //       ? "linear-gradient(to right, #a855f7, #9333ea) 1"
                  //       : "none",
                  // }}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4">
                      <h3
                        className={cn(
                          "text-xl",
                          activeAccordion === solution.value &&
                            "bg-gradient-to-r from-purple-500 to-purple-700 text-transparent bg-clip-text"
                        )}
                      >
                        {solution.title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 pb-2">
                      <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-8 mb-6">
                        {solution.description}
                      </p>
                      <Button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:opacity-90 transition-opacity w-full group">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center">
            {activeAccordion ? (
              <div className="relative w-full aspect-square max-w-xl">
                <Image
                  // src={
                  //   solutions.find((s) => s.value === activeAccordion)?.image ||
                  //   ""
                  // }
                  src={"/mockup.png"}
                  alt={`${activeAccordion} question illustration`}
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-full aspect-square max-w-xl opacity-50">
                <Image
                  src={solutions[0].image}
                  alt="Default solution illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerguntasRespostas;

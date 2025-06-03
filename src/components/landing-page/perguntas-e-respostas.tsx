"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const PerguntasRespostas = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | undefined>();

  const solutions = [
    {
      value: "Quantas notas posso criar?",
      title: "Quantas notas posso criar?",
      description: "Você pode criar quantas notas desejar. (:",
      image: "/public/mockup.png",
    },
    {
      value: "Inteligência Artificial?",
      title: "Inteligência Artificial?",
      description:
        "Muito em breve estaremos introduzindo diferentes serviços de chatbots.",
      image: "/public/novidades.png",
    },
    {
      value: "Consigo recuperar notas excluídas?",
      title: "Consigo recuperar notas excluídas?",
      description:
        "Sim. Você consegue recuperar notas que foram excluídas ou apagá-las permanentemente.",
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

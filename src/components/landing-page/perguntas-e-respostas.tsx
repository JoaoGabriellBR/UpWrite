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

  const questions = [
    {
      value: "Quantas notas posso criar?",
      title: "Quantas notas posso criar?",
      description: "Você pode criar quantas notas desejar. (:",
    },
    {
      value: "Inteligência Artificial?",
      title: "Inteligência Artificial?",
      description:
        "Muito em breve estaremos introduzindo diferentes serviços de chatbots.",
    },
    {
      value: "Consigo recuperar notas excluídas?",
      title: "Consigo recuperar notas excluídas?",
      description:
        "Sim. Você consegue recuperar notas que foram excluídas ou apagá-las permanentemente.",
    },
  ];

  return (
    <section className="py-8 md:py-20 w-full min-h-[80vh] flex items-center">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="font-heading text-4xl sm:text-4xl md:text-5xl lg:text-6xl pb-10 text-center">
          Perguntas e Respostas
        </h1>

        <div className="w-full flex flex-col justify-center items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-3/4">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4"
              value={activeAccordion}
              onValueChange={setActiveAccordion}
            >
              {questions.map((question) => (
                <AccordionItem
                  key={question.value}
                  value={question.value}
                  className={cn(
                    "border-2 rounded-[1rem] px-6 py-2 transition-all duration-200"
                  )}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4">
                      <h3
                        className={cn(
                          "text-xl",
                          activeAccordion === question.value &&
                            "bg-gradient-to-r from-purple-500 to-purple-700 text-transparent bg-clip-text"
                        )}
                      >
                        {question.title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 pb-2">
                      <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-8 mb-6">
                        {question.description}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerguntasRespostas;

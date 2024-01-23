import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";

interface AccordionProps {
  value: string;
  question: string;
  answer: string;
}

const PerguntasRespostas = () => {
  const accordions = [
    {
      value: "item-1",
      question: "Quantas notas posso criar?",
      answer: "Você pode criar quantas notas desejar. (:",
    },
    {
      value: "item-2",
      question: "Posso editar minha nota após a publicação?",
      answer: "Sim, é possível editar uma nota enquanto você trabalha nela.",
    },
    {
      value: "item-3",
      question: "Consigo recuperar notas excluídas?",
      answer:
        "Por enquanto não. Após excluída, a sua nota será automaticamente retirada de nosso banco de dados.",
    },
  ];
  return (
    <section
      id="faq"
      className="py-8 md:py-20 w-full flex flex-col justify-center items-center"
    >
      <div className="container flex max-w-6xl flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
          Perguntas e Respostas
        </h1>

        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-10">
          Aqui estão algumas respostas às suas perguntas mais frequentes.
        </p>

        <Accordion type="single" collapsible className="w-full text-start">
          {accordions.map((accordion: AccordionProps) => (
            <AccordionItem key={accordion.value} value={accordion.value}>
              <AccordionTrigger>
                <div className="flex flex-row justify-start items-center gap-2">
                  <CheckCircle className="text-primary w-4 h-4" />
                  <span className="text-sm sm:text-sm md:text-base lg:text-base">
                    {accordion.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>{accordion.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default PerguntasRespostas;

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PerguntasRespostas = () => {
  return (
    <section className="py-8 md:py-20 w-full flex flex-col justify-center items-center">
      <div className="container flex max-w-6xl flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          Perguntas e Respostas
        </h1>

        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-10">
          Aqui estão algumas respostas às suas perguntas mais frequentes.
        </p>

        <Accordion type="single" collapsible className="w-full text-start">
          <AccordionItem value="item-1">
            <AccordionTrigger>Quantas notas posso criar?</AccordionTrigger>
            <AccordionContent>
              Você pode criar quantas notas desejar. (:
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              Posso editar minha nota após a publicação?
            </AccordionTrigger>
            <AccordionContent>
              Sim, é possível editar uma nota enquanto você trabalha nela.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Consigo recuperar notas excluídas?
            </AccordionTrigger>
            <AccordionContent>
              Não. Após excluída, a sua nota será automaticamente retirada de
              nosso banco de dados.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default PerguntasRespostas;

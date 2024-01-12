import React from "react";
import mockup from "../../public/mockup.png";
import ComponentSchema from "./component-schema";

const Garanta = () => {
  return (
    <>
      <ComponentSchema
        id="porqueupwrite"
        title="Garanta a conclusão de todos os prazos. "
        description="Utilize recursos avançados de edição de texto para criar notas e páginas, otimizando sua eficiência e simplificando suas tarefas diárias."
        imageSrc={mockup}
        imageWidth={1080}
        imageHeight={617}
        imagePosition="left"
        button={true}
        textButton="Registrar"
      />
    </>
  );
};

export default Garanta;

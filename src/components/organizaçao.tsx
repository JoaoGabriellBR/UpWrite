import React from "react";
import man from "../../public/man.png";
import ComponentSchema from "./component-schema";

const Organizaçao = () => {
  return (
    <>
      <ComponentSchema
        id="caracteristicas"
        title="Organização flexível"
        description="O UpWrite oferece liberdade total na organização. Você pode criar um sistema de cadernos ou simplesmente dispensar a organização. Todas as suas notas estão a apenas uma pesquisa de distância, sem a necessidade de uma estrutura prévia."
        imageSrc={man}
        imageWidth={767}
        imageHeight={754}
        imagePosition="right"
      />
    </>
  );
};

export default Organizaçao;

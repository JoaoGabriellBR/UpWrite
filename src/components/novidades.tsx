import React from "react";
import novidades from "../../public/novidades.png"
import ComponentSchema from "./component-schema";

const Novidades = () => {
  return (
    <>
      <ComponentSchema
        id="novidades"
        title="Sempre atualizado"
        description="O UpWrite está em constante evolução, para que a sua experiência seja cada vez melhor."
        imageSrc={novidades}
        imageWidth={767}
        imageHeight={754}
        imagePosition="right"
      />
    </>
  );
};

export default Novidades;

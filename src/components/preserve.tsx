import React from "react";
import woman from "../../public/woman.png";
import ComponentSchema from "./component-schema";

const Preserve = () => {
  return (
    <>
      <ComponentSchema
        title="Preserve dados importantes"
        description="Mantenha seus dados essenciais seguros. Reserve um momento para relaxar, sabendo que todas as informações necessárias para sua conveniência estão centralizadas em um único local."
        imageSrc={woman}
        imageWidth={767}
        imageHeight={754}
        imagePosition="left"
      />
    </>
  );
};

export default Preserve;

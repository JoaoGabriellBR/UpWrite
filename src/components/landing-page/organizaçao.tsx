"use client"
import React from "react";
import organizacaoLightMode from "../../../public/organizacao-lightmode.png";
import organizacaoDarkMode from "../../../public/organizacao-darkmode.png";
import ComponentSchema from "./component-schema";
import { useTheme } from "next-themes";

const Organizaçao = () => {
  const { resolvedTheme } = useTheme();
  const images = resolvedTheme === "dark" ? organizacaoDarkMode : organizacaoLightMode;
  return (
    <>
      <ComponentSchema
        id="caracteristicas"
        title="Organização flexível"
        description="O UpWrite oferece liberdade total na organização. Você pode criar um sistema de cadernos ou simplesmente dispensar a organização. Todas as suas notas estão a apenas uma pesquisa de distância, sem a necessidade de uma estrutura prévia."
        imageSrc={images}
        imageWidth={1102}
        imageHeight={810}
        imagePosition="right"
      />
    </>
  );
};

export default Organizaçao;

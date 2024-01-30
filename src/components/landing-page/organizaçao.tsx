"use client";
import React, { useEffect, useState } from "react";
import organizacaoLightMode from "../../../public/organizacao-lightmode.png";
import organizacaoDarkMode from "../../../public/organizacao-darkmode.png";
import ComponentSchema from "./component-schema";
import { useTheme } from "next-themes";

const Organizacao = () => {
  const { resolvedTheme } = useTheme();
  const [imageSrc, setImageSrc] = useState({});

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setImageSrc(organizacaoDarkMode);
    } else {
      setImageSrc(organizacaoLightMode);
    }
  }, [resolvedTheme]);

  return (
    <>
      <ComponentSchema
        id="caracteristicas"
        title="Conteúdo visual de forma direta"
        description="Em vez de precisar lidar diretamente com código ou linguagens de marcação, o UpWrite permite que os usuários formem textos, criem listas e realizem outras tarefas de formatação de maneira intuitiva, sem exigir um conhecimento profundo em HTML, CSS ou outras linguagens de marcação."
        imageSrc={imageSrc}
        imageWidth={1102}
        imageHeight={810}
        imagePosition="right"
      />
    </>
  );
};

export default Organizacao;

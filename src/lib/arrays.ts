import { Laptop, Moon, Sun } from "lucide-react";

export const inputFields = [
  {
    id: "name",
    label: "Nome",
    type: "text",
    placeholder: "João Gabriel",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "user@example.com",
  },
  {
    id: "password",
    label: "Senha",
    type: "password",
    placeholder: "********",
  },
];

export const modeToggleItems = [
  {
    text: "Claro",
    theme: "light",
    icon: Sun,
  },
  {
    text: "Escuro",
    theme: "dark",
    icon: Moon,
  },
  {
    text: "Sistema",
    theme: "system",
    icon: Laptop,
  },
];

export const linksLandingPage = [
  { name: "Home", id: "/#home" },
  { name: "Por que UpWrite?", id: "/#porqueupwrite" },
  { name: "Características", id: "/#caracteristicas" },
  { name: "Novidades", id: "/#novidades" },
  { name: "FAQ", id: "/#faq" },
  { name: "Política de privacidade", id: "/politica-de-privacidade" },
  { name: "Termos e condições", id: "/termos-e-condicoes" },
];

export const accordionsPerguntasRespostas = [
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

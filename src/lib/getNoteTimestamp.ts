import { formatDistanceToNow, isAfter, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export const getNoteTimestamp = (note: any) => {
  const createdAt = parseISO(note?.created_at);
  const updatedAt = parseISO(note?.updated_at);

  if (isAfter(updatedAt, createdAt)) {
    return `Atualizado ${formatDistanceToNow(updatedAt, {
      addSuffix: true,
      locale: ptBR,
    })}`;
  } else {
    return `Criado ${formatDistanceToNow(createdAt, {
      addSuffix: true,
      locale: ptBR,
    })}`;
  }
};

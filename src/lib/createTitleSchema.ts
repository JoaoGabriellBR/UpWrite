import * as z from "zod";

export const createTitleSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Este campo é obrigatório." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." }),
});

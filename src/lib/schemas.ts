import * as z from "zod";

export const createTitleSchema = z.object({
  title: z
    .string()
    .max(100, { message: "O título deve ter no máximo 100 caracteres." })
    .optional(),
});

export const formSchemaRegister = z.object({
  name: z
    .string()
    .min(1, {
      message: "O nome de usuário não pode estar vazio.",
    })
    .min(2, {
      message: "O nome de usuário deve ter pelo menos 2 caracteres.",
    }),
  email: z
    .string()
    .min(1, {
      message: "O campo de e-mail não pode estar vazio.",
    })
    .email({
      message: "Por favor, insira um endereço de e-mail válido.",
    }),
  password: z
    .string()
    .min(1, {
      message: "O campo de senha não pode estar vazio.",
    })
    .min(8, {
      message: "A senha deve ter pelo menos 8 caracteres.",
    }),
});

export const formSchemaLogin = z.object({
  email: z
    .string()
    .min(1, {
      message: "O campo de e-mail não pode estar vazio.",
    })
    .email({
      message: "Por favor, insira um endereço de e-mail válido.",
    }),
  password: z
    .string()
    .min(1, {
      message: "O campo de senha não pode estar vazio.",
    })
    .min(8, {
      message: "A senha deve ter pelo menos 8 caracteres.",
    }),
});

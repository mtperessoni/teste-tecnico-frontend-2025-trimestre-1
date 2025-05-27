export const zodMessages = {
  required: "Este campo é obrigatório",
  invalid_type: {
    string: "Deve ser um texto",
    number: "Deve ser um número",
    boolean: "Deve ser verdadeiro ou falso",
    date: "Deve ser uma data válida",
    array: "Deve ser uma lista",
    object: "Deve ser um objeto",
  },
  string: {
    min: ({ minimum }: { minimum: number }) =>
      `Deve ter no mínimo ${minimum} caracteres`,
    max: ({ maximum }: { maximum: number }) =>
      `Deve ter no máximo ${maximum} caracteres`,
    email: "E-mail inválido",
    url: "URL inválida",
    regex: "Formato inválido",
  },
  number: {
    min: ({ minimum }: { minimum: number }) =>
      `Deve ser maior ou igual a ${minimum}`,
    max: ({ maximum }: { maximum: number }) =>
      `Deve ser menor ou igual a ${maximum}`,
    int: "Deve ser um número inteiro",
  },
  array: {
    min: ({ minimum }: { minimum: number }) =>
      `Deve ter no mínimo ${minimum} itens`,
    max: ({ maximum }: { maximum: number }) =>
      `Deve ter no máximo ${maximum} itens`,
  },
};

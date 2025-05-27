export const formatCep = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 5) return numbers;
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
};

export const unformatCep = (value: string) => {
  return value.replace(/\D/g, "");
};

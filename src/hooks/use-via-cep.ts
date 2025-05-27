import { ApiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const viacep = new ApiClient("https://viacep.com.br/ws");

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export async function getAddressByCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, "");
  if (cleanCep.length !== 8) {
    throw new Error("CEP inválido");
  }

  const data = await viacep.get<ViaCepResponse>(`/${cleanCep}/json/`);

  if (data.erro) {
    throw new Error("CEP não encontrado");
  }

  return {
    cep: data.cep,
    street: data.logradouro,
    neighborhood: data.bairro,
    city: data.localidade,
    state: data.uf,
    complement: data.complemento,
  };
}

export function useViaCep(cep: string, enabled = true) {
  return useQuery({
    queryKey: ["viaCep", cep],
    queryFn: () => getAddressByCep(cep),
    enabled: !!cep && cep.replace(/\D/g, "").length === 8 && enabled,
    staleTime: 1000 * 60 * 60,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

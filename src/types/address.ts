export interface Address {
  id: string;
  displayName: string;
  username: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

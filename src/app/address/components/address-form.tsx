"use client";

import React, { useEffect } from "react";
import { z } from "zod";
import { CForm } from "@/components/forms/form";
import { useFormContext } from "react-hook-form";
import { CInput } from "@/components/forms/form-input";
import { useViaCep } from "@/hooks/use-via-cep";
import { Button } from "@/components/ui/button";
import {
  formatCep,
  unformatCep,
} from "@/components/forms/normalizers/cep-normalizer";
import { zodMessages } from "@/lib/zod-messages";
import { Address } from "@/types/address";
import { toast } from "sonner";

const addressFormSchema = z.object({
  username: z
    .string({ message: zodMessages.required })
    .min(1, { message: zodMessages.required }),
  displayName: z
    .string({ message: zodMessages.required })
    .min(1, { message: zodMessages.required }),
  cep: z
    .string({ message: zodMessages.required })
    .regex(/^\d{5}-?\d{3}$/, "Este CEP é inválido"),
  street: z.string().nonempty({ message: zodMessages.required }),
  neighborhood: z.string().nonempty({ message: zodMessages.required }),
  city: z.string().nonempty({ message: zodMessages.required }),
  state: z.string().nonempty({ message: zodMessages.required }),
});

type AddressFormData = z.infer<typeof addressFormSchema>;

type AddressFormProps = {
  closeModal: () => void;
  handleSubmit: (address: Address) => void;
  initialAddress?: Address;
  isEditing?: boolean;
};

export function AddressForm({
  closeModal,
  handleSubmit,
  initialAddress,
  isEditing = false,
}: AddressFormProps) {
  const onSubmit = async (data: AddressFormData) => {
    handleSubmit(data as Address);
    closeModal();
  };

  return (
    <CForm
      onSubmit={onSubmit}
      schema={addressFormSchema}
      defaultValues={initialAddress}
    >
      <AddressFormFields />
      <div className="mt-4">
        <Button type="submit" className="w-full">
          {isEditing ? "Atualizar" : "Salvar"}
        </Button>
      </div>
    </CForm>
  );
}

function AddressFormFields() {
  const { watch, setValue, trigger } = useFormContext<AddressFormData>();
  const cep = watch("cep");
  const [isAddressLocked, setIsAddressLocked] = React.useState(false);

  const {
    data: addressData,
    isLoading,
    error,
  } = useViaCep(cep ? unformatCep(cep) : "", !!cep);

  useEffect(() => {
    if (addressData) {
      setValue("street", addressData.street);
      setValue("neighborhood", addressData.neighborhood);
      setValue("city", addressData.city);
      setValue("state", addressData.state);
      setIsAddressLocked(true);
      toast.success("Endereço encontrado com sucesso!");
      trigger(["street", "neighborhood", "city", "state"]);
    }
  }, [addressData, setValue, trigger]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Erro ao buscar endereço");
      setIsAddressLocked(false);
    }
  }, [error]);

  useEffect(() => {
    if (!cep) {
      setValue("street", "");
      setValue("neighborhood", "");
      setValue("city", "");
      setValue("state", "");
      setIsAddressLocked(false);
    }
  }, [cep, setValue]);

  return (
    <>
      <CInput
        name="username"
        label="Nome do Usuário"
        placeholder="Digite o nome do usuário"
      />

      <CInput
        name="displayName"
        label="Nome de exibição do endereço"
        placeholder="Digite o nome de exibição do endereço"
      />

      <CInput
        name="cep"
        label="CEP"
        placeholder="00000-000"
        disabled={isLoading}
        maxLength={9}
        error={error?.message || ""}
        normalizer={{
          input: formatCep,
        }}
      />

      <CInput
        name="street"
        label="Rua"
        placeholder="Rua/Avenida"
        type="text"
        className={isAddressLocked ? "bg-gray-100 cursor-not-allowed" : ""}
        disabled={isAddressLocked}
      />

      <CInput
        name="neighborhood"
        label="Bairro"
        placeholder="Bairro"
        type="text"
        className={isAddressLocked ? "bg-gray-100 cursor-not-allowed" : ""}
        disabled={isAddressLocked}
      />

      <CInput
        name="city"
        label="Cidade"
        placeholder="Cidade"
        type="text"
        className={isAddressLocked ? "bg-gray-100 cursor-not-allowed" : ""}
        disabled={isAddressLocked}
      />

      <CInput
        name="state"
        label="Estado (UF)"
        placeholder="UF"
        type="text"
        className={isAddressLocked ? "bg-gray-100 cursor-not-allowed" : ""}
        disabled={isAddressLocked}
      />
    </>
  );
}

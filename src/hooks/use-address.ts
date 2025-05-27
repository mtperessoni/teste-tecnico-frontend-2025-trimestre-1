import { Address } from "@/types/address";
import { useState, useEffect } from "react";

export type CreateAddress = Omit<Address, "id">;
export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (address: CreateAddress) => {
    setAddresses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...address,
      },
    ]);
  };

  const updateAddress = (updatedAddress: Address) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === updatedAddress.id ? updatedAddress : addr
      )
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
  };
}

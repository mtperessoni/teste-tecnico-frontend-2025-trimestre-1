"use client";

import { useState } from "react";
import { useAddresses } from "@/hooks/use-address";
import { useAddressFilters } from "@/hooks/use-address-filter";
import { Address } from "@/types/address";
import { AddressHeader } from "./components/address-header";
import { AddressManager } from "./components/address-manager";

export default function AddressPage() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | undefined>();

  const { addresses, addAddress, updateAddress, deleteAddress } =
    useAddresses();
  const { setFilters, filteredAddresses, cities, states } =
    useAddressFilters(addresses);

  const handleEdit = (address: Address) => {
    setAddressToEdit(address);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setAddressToEdit(undefined);
  };

  const handleSubmit = (address: Address) => {
    if (addressToEdit) {
      updateAddress({ ...address, id: addressToEdit.id });
    } else {
      addAddress(address);
    }
    handleCloseDialog();
  };

  const hasAddresses = addresses.length > 0;

  return (
    <>
      <AddressHeader
        isDialogOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        addressToEdit={addressToEdit}
        onSubmit={handleSubmit}
      />
      <AddressManager
        addresses={filteredAddresses}
        cities={cities}
        states={states}
        onFilterChange={setFilters}
        onEdit={handleEdit}
        onDelete={deleteAddress}
        onAddNew={() => setIsDialogOpen(true)}
        hasAddresses={hasAddresses}
      />
    </>
  );
}

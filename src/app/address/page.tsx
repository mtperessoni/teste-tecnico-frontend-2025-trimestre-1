"use client";

import { useState } from "react";
import { AddressFilters } from "./components/address-filters";
import { AddressList } from "./components/address-list";
import { useAddressFilters } from "@/hooks/use-address-filter";
import { useAddresses } from "@/hooks/use-address";
import { Address } from "@/types/address";
import { AddressDelete } from "./components/address-delete";
import { AddressModal } from "./components/address-modal";
import { NotFound } from "./components/not-found";

export default function AddressPage() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | undefined>();
  const [addressToDelete, setAddressToDelete] = useState<Address | undefined>();
  const { addresses, addAddress, updateAddress, deleteAddress } =
    useAddresses();
  const { setFilters, filteredAddresses, cities, states } =
    useAddressFilters(addresses);

  const handleEdit = (address: Address) => {
    setAddressToEdit(address);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const address = addresses.find((addr) => addr.id === id);
    if (address) {
      setAddressToDelete(address);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (addressToDelete) {
      deleteAddress(addressToDelete.id);
      setIsDeleteDialogOpen(false);
      setAddressToDelete(undefined);
    }
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

  const hasAddresses = filteredAddresses.length > 0;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Agenda de Endereços</h1>
        <AddressModal
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          addressToEdit={addressToEdit}
          onSubmit={handleSubmit}
        />
      </div>

      {hasAddresses ? (
        <>
          <div className="mb-8">
            <AddressFilters
              onFilterChange={setFilters}
              cities={cities}
              states={states}
            />
          </div>

          <AddressList
            addresses={filteredAddresses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <NotFound onAddNew={() => setIsDialogOpen(true)} />
      )}

      <AddressDelete
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        address={addressToDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

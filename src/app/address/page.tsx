"use client";

import { useState } from "react";
import { AddressForm } from "./components/address-form";
import { AddressFilters } from "./components/address-filters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddressList } from "./components/address-list";
import { useAddressFilters } from "@/hooks/use-address-filter";
import { useAddresses } from "@/hooks/use-address";
import { Address } from "@/types/address";
import { AddressDelete } from "./components/address-delete";

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

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Agenda de Endereços</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Endereço
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {addressToEdit ? "Editar Endereço" : "Novo Endereço"}
              </DialogTitle>
            </DialogHeader>
            <AddressForm
              closeModal={handleCloseDialog}
              handleSubmit={handleSubmit}
              initialAddress={addressToEdit}
              isEditing={!!addressToEdit}
            />
          </DialogContent>
        </Dialog>
      </div>

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

      <AddressDelete
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        address={addressToDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

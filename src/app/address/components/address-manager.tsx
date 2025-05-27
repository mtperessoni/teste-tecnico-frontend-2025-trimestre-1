import { useState } from "react";
import { Address } from "@/types/address";
import { AddressFilters } from "./address-filters";
import { AddressList } from "./address-list";
import { AddressDelete } from "./address-delete";
import { NotFound } from "./not-found";

interface Filters {
  username: string;
  city: string;
  state: string;
  displayName: string;
}

interface AddressManagerProps {
  addresses: Address[];
  cities: string[];
  states: string[];
  onFilterChange: (filters: Filters) => void;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  hasAddresses: boolean;
}

export function AddressManager({
  addresses,
  cities,
  states,
  onFilterChange,
  onEdit,
  onDelete,
  onAddNew,
  hasAddresses,
}: AddressManagerProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | undefined>();

  const handleDelete = (id: string) => {
    const address = addresses.find((addr) => addr.id === id);
    if (address) {
      setAddressToDelete(address);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (addressToDelete) {
      onDelete(addressToDelete.id);
      setIsDeleteDialogOpen(false);
      setAddressToDelete(undefined);
    }
  };

  return (
    <>
      <div className="mb-8">
        <AddressFilters
          onFilterChange={onFilterChange}
          cities={cities}
          states={states}
        />
      </div>

      {addresses.length > 0 ? (
        <AddressList
          addresses={addresses}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ) : (
        <NotFound onAddNew={onAddNew} hasValues={hasAddresses} />
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

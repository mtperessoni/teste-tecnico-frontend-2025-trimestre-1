import { AddressModal } from "./address-modal";
import { Address } from "@/types/address";

interface AddressHeaderProps {
  isDialogOpen: boolean;
  onOpenChange: (open: boolean) => void;
  addressToEdit?: Address;
  onSubmit: (address: Address) => void;
}

export function AddressHeader({
  isDialogOpen,
  onOpenChange,
  addressToEdit,
  onSubmit,
}: AddressHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Agenda de Endereços</h1>
      <AddressModal
        isOpen={isDialogOpen}
        onOpenChange={onOpenChange}
        addressToEdit={addressToEdit}
        onSubmit={onSubmit}
      />
    </div>
  );
}

import { Address } from "@/types/address";
import { AddressForm } from "./address-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddressModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  addressToEdit?: Address;
  onSubmit: (address: Address) => void;
}

export function AddressModal({
  isOpen,
  onOpenChange,
  addressToEdit,
  onSubmit,
}: AddressModalProps) {
  const handleCloseDialog = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          handleSubmit={onSubmit}
          initialAddress={addressToEdit}
          isEditing={!!addressToEdit}
        />
      </DialogContent>
    </Dialog>
  );
}

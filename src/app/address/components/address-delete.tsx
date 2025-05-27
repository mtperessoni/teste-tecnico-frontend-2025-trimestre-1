"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Address } from "@/types/address";
import { MapPin, User, Home } from "lucide-react";

interface AddressDeleteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  address: Address | undefined;
  onConfirm: () => void;
}

export function AddressDelete({
  isOpen,
  onOpenChange,
  address,
  onConfirm,
}: AddressDeleteProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>
              Usuário:{" "}
              <strong className="text-foreground">{address?.username}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Home className="h-4 w-4" />
            <span>
              Endereço:{" "}
              <strong className="text-foreground">
                {address?.displayName} - {address?.street}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {address?.neighborhood}
              {", "}
              {address?.city}
              {" - "}
              {address?.state}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              CEP: <strong className="text-foreground">{address?.cep}</strong>
            </span>
          </div>

          <div className="mt-4 p-4 bg-destructive/10 rounded-lg">
            <p className="text-sm text-destructive">
              <strong>Atenção:</strong> Esta ação não pode ser desfeita. O
              endereço será permanentemente removido.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

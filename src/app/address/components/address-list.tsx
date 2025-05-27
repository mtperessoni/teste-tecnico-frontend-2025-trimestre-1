"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Address } from "@/types/address";

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
}

export function AddressList({ addresses, onEdit, onDelete }: AddressListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Nome do endereço</TableHead>
            <TableHead>CEP</TableHead>
            <TableHead>Rua</TableHead>
            <TableHead>Bairro</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>{address.username}</TableCell>
              <TableCell>{address.displayName}</TableCell>
              <TableCell>{address.cep}</TableCell>
              <TableCell>{address.street}</TableCell>
              <TableCell>{address.neighborhood}</TableCell>
              <TableCell>{address.city}</TableCell>
              <TableCell>{address.state}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(address)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(address.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

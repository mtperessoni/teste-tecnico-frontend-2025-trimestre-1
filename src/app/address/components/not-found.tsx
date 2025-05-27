import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface NotFoundProps {
  onAddNew: () => void;
  hasValues: boolean;
}

export function NotFound({ onAddNew, hasValues }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Nenhum endereço encontrado
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        {hasValues
          ? "Nenhum endereço corresponde aos filtros aplicados. Tente ajustar os filtros ou adicionar um novo endereço."
          : "Parece que você ainda não cadastrou nenhum endereço. Clique no botão abaixo para começar a adicionar seus endereços."}
      </p>
      <Button onClick={onAddNew}>
        <Plus className="mr-2 h-4 w-4" />
        {hasValues ? "Adicionar Novo Endereço" : "Adicionar Primeiro Endereço"}
      </Button>
    </div>
  );
}

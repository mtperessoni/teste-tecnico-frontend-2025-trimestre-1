"use client";

import { Input } from "@/components/ui/input";
import { MapPin, User, Building2 } from "lucide-react";
import { Select } from "@/components/forms/uncontrolled/select";

interface AddressFiltersProps {
  onFilterChange: (filters: {
    username: string;
    city: string;
    state: string;
    displayName: string;
  }) => void;
  cities: string[];
  states: string[];
}

export function AddressFilters({
  onFilterChange,
  cities,
  states,
}: AddressFiltersProps) {
  const handleChange = (field: string, value: string) => {
    onFilterChange({
      username: field === "username" ? value : "",
      city: field === "city" ? value : "",
      state: field === "state" ? value : "",
      displayName: field === "displayName" ? value : "",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <User size={16} />
        </div>
        <Input
          id="username-filter"
          placeholder="Buscar por usuário"
          className="pl-9"
          onChange={(e) => handleChange("username", e.target.value)}
        />
      </div>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Building2 size={16} />
        </div>
        <Input
          id="displayName-filter"
          placeholder="Buscar por nome do endereço"
          className="pl-9"
          onChange={(e) => handleChange("displayName", e.target.value)}
        />
      </div>

      <Select
        id="city-filter"
        placeholder="Selecione uma cidade"
        icon={MapPin}
        options={cities}
        onValueChange={(value) => handleChange("city", value)}
        allOptionLabel="Todas as cidades"
      />

      <Select
        id="state-filter"
        placeholder="Selecione um estado"
        icon={MapPin}
        options={states}
        onValueChange={(value) => handleChange("state", value)}
        allOptionLabel="Todos os estados"
      />
    </div>
  );
}

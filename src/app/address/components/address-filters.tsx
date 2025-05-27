"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, User, Building2 } from "lucide-react";

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
        onValueChange={(value) =>
          handleChange("city", value === "all" ? "" : value)
        }
      >
        <SelectTrigger id="city-filter" className="w-full">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <SelectValue placeholder="Selecione uma cidade" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as cidades</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) =>
          handleChange("state", value === "all" ? "" : value)
        }
      >
        <SelectTrigger id="state-filter" className="w-full">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <SelectValue placeholder="Selecione um estado" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os estados</SelectItem>
          {states.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

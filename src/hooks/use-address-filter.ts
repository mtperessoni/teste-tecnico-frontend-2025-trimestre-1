import { useState, useMemo } from "react";
import { Address } from "@/types/address";

interface Filters {
  username: string;
  city: string;
  state: string;
  displayName: string;
}

export function useAddressFilters(addresses: Address[]) {
  const [filters, setFilters] = useState<Filters>({
    username: "",
    city: "",
    state: "",
    displayName: "",
  });

  const filteredAddresses = useMemo(() => {
    return addresses.filter((address) => {
      const hasNoFilters =
        !filters.username &&
        !filters.city &&
        !filters.state &&
        !filters.displayName;
      if (hasNoFilters) return true;

      const matchesUsername =
        !!filters.username &&
        address.username.toLowerCase().includes(filters.username.toLowerCase());

      const matchesDisplayName =
        !!filters.displayName &&
        (address.displayName
          ?.toLowerCase()
          .includes(filters.displayName.toLowerCase()) ??
          false);

      const matchesCity = !!filters.city && address.city === filters.city;
      const matchesState = !!filters.state && address.state === filters.state;

      return (
        matchesUsername || matchesDisplayName || matchesCity || matchesState
      );
    });
  }, [addresses, filters]);

  const cities = useMemo(
    () => Array.from(new Set(addresses.map((addr) => addr.city))).sort(),
    [addresses]
  );

  const states = useMemo(
    () => Array.from(new Set(addresses.map((addr) => addr.state))).sort(),
    [addresses]
  );

  return {
    filters,
    setFilters,
    filteredAddresses,
    cities,
    states,
  };
}

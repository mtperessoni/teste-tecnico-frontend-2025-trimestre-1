import { LucideIcon } from "lucide-react";
import {
  Select as BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  id: string;
  placeholder: string;
  icon: LucideIcon;
  options: string[];
  onValueChange: (value: string) => void;
  showAllOption?: boolean;
  allOptionLabel?: string;
}

export function Select({
  id,
  placeholder,
  icon: Icon,
  options,
  onValueChange,
  showAllOption = true,
  allOptionLabel = "Todos",
}: SelectProps) {
  return (
    <BaseSelect
      onValueChange={(value) => onValueChange(value === "all" ? "" : value)}
    >
      <SelectTrigger id={id} className="w-full">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-muted-foreground" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {showAllOption && <SelectItem value="all">{allOptionLabel}</SelectItem>}
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect>
  );
}

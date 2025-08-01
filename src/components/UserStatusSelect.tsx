// components/UserStatusSelect.tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getStatusColorClass } from "@/utils/userUtils";

interface Props {
  value: string;
  options: string[];
}

export function UserStatusSelect({ value, options }: Props) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger
        className={`cursor-pointer w-[120px] h-8 text-sm ${getStatusColorClass(value)}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-[120px]">
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

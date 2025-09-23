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
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function UserStatusSelect({ value, options, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
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
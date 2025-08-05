import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
     <div className="relative w-full">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
        <Search size={18} />
      </span>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="pl-10 w-full"
      />
    </div>
  );
}

export default SearchBar;

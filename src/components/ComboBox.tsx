import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ControllerRenderProps } from "react-hook-form";

type ComboBoxItem = {
  value: string;
  label: string;
  code?: string;
};

// how to make this optional
type RHFFieldProps = Pick<
  ControllerRenderProps,
  "value" | "onChange" | "onBlur" | "name" | "ref"
>;

type ComboBoxProps = {
  items: ComboBoxItem[];
  term: "province" | "municipality" | "baranggay" | string;
  selectItem?: (val: string) => void;
  enableSearch?: boolean;
} & Partial<RHFFieldProps>;

function ComboBox({
  items = [],
  term,
  selectItem,
  enableSearch = true,
  value,
  onChange,
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : `Select ${term}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)]  p-0"
      >
        <Command>
          {enableSearch && (
            <CommandInput placeholder={`Search ${term}...`} className="h-9" />
          )}

          <CommandList>
            <CommandEmpty>{`No ${term} found.`}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    if (onChange)
                      onChange(currentValue === value ? "" : currentValue);
                    if (selectItem) selectItem(item.code || item.value);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export type { ComboBoxItem };
export default ComboBox;

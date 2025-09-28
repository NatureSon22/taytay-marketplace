import ComboBox from "@/components/ComboBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { apparels, categories } from "@/data/filterproduct";
import { SlidersHorizontal } from "lucide-react";
import type {
  FilterField,
  ProductFilterSettings,
  SortField,
  SortOrder,
} from "@/types";

type FilterBarProps = {
  filterOptions: ProductFilterSettings;
  handleFilterOptions: (field: FilterField, value: string) => void;
  handleSortToggle: (
    field: SortField,
    order: SortOrder,
    disableSort?: boolean 
  ) => void;
  openFilterBar: boolean;
  handleOpenFilterBar: () => void;
};

// ComboBox filter UI config
const comboBoxFilters = [
  {
    label: "Categories",
    field: "category" as const,
    items: categories,
  },
  {
    label: "Apparels",
    field: "apparel" as const,
    items: apparels,
  },
];

// Sort sections config
const sortSections = [
  {
    label: "Price",
    field: "price" as const,
    options: [
      { value: "low-high", label: "Low to high" },
      { value: "high-low", label: "High to low" },
    ],
  },
  {
    label: "Popularity",
    field: "popularity" as const,
    options: [
      { value: "most-liked", label: "Most liked" },
      { value: "most-viewed", label: "Most viewed" },
    ],
  },
  {
    label: "Alphabetical",
    field: "alphabetical" as const,
    options: [
      { value: "a-z", label: "A-Z" },
      { value: "z-a", label: "Z-A" },
    ],
  },
];

function FilterBar({
  filterOptions,
  handleFilterOptions,
  handleSortToggle,
  openFilterBar,
  handleOpenFilterBar,
}: FilterBarProps) {
  return (
    <div className="z-10 md:block bg-white grid gap-5 h-min py-8 px-6 rounded-l-xl sticky top-0 w-[100%] sm:max-w-[100%] lg:max-w-[300px] shadow-none md:shadow-2xl">

      <div className="md:hidden mb-4">
              <Button
                onClick={handleOpenFilterBar}
                variant="outline"
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {openFilterBar ? "Close Filters" : "Open Filters"}
              </Button>
            </div>
    <div className={`${openFilterBar ? "block" : "hidden"} md:block grid gap-5 h-min py-8 px-6`}>
      
      
      <div className="pb-3 flex justify-between border-b-[1px] border-slate-200">
        <p className="font-bold text-[1.1rem]">Filter</p>
        <SlidersHorizontal className="h-5 text-slate-400" />
      </div>

      {/* ComboBox filters (category, apparel) */}
      {comboBoxFilters.map(({ label, field, items }) => (
        <div key={field} className={`space-y-3`}>
          <p className="font-bold text-[0.95rem]">{label}</p>
          <ComboBox
            term={field}
            items={items}
            value={filterOptions[field]}
            onChange={(value) => handleFilterOptions(field, value)}
          />
        </div>
      ))}

      {/* Sort Sections */}
      {sortSections.map(({ label, field, options }) => (
        <div key={field} className="space-y-4 mt-3">
          <div className="flex items-start gap-3">
            <Checkbox
              className="border-slate-400 mt-1"
              checked={filterOptions.sort.some((s) => s.field === field)}
              onClick={() => {
                const active = filterOptions.sort.find(
                  (s) => s.field === field
                );
                if (active) {
                  handleSortToggle(field, active.order, true); // toggle off
                } else {
                  handleSortToggle(field, options[0].value as SortOrder); // toggle on with default
                }
              }}
            />
            <p className="font-bold text-[0.95rem]">{label}</p>
          </div>

          <RadioGroup
            value={
              filterOptions.sort.find((s) => s.field === field)?.order ??
              options[0].value
            }
            className="ml-2" 
            onValueChange={(value) =>
              handleSortToggle(field, value as SortOrder)
            }
            disabled={!filterOptions.sort.some((rule) => rule.field === field)}
          >
            {options.map(({ value, label }, i) => (
              <div key={value} className="flex items-center gap-3">
                <RadioGroupItem value={value} id={`${field}-${i}`} />
                <Label htmlFor={`${field}-${i}`}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}

      <Button className="w-full mt-5 bg-200 text-[0.8rem] py-6 rounded-full">
        Apply Filter
      </Button>
    </div>
    </div>
  );
}

export default FilterBar;

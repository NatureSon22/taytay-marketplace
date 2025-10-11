import ComboBox from "@/components/ComboBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SlidersHorizontal } from "lucide-react";
import type {
  FilterField,
  ProductFilterSettings,
  SortField,
  SortOrder,
} from "@/types";
import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getAllCategories } from "@/api/categories";
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import { getAllProductTypes } from "@/api/productTypes";

type FilterBarProps = {
  filterOptions: ProductFilterSettings;
  handleFilterOptions: (field: FilterField, value: string) => void;
  handleSortToggle: (
    field: SortField,
    order: SortOrder,
    disableSort?: boolean
  ) => void;
  resetFilter: () => void;
  openFilterBar: boolean;
  handleOpenFilterBar: () => void;
};

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
  resetFilter,
  handleOpenFilterBar,
  openFilterBar,
}: FilterBarProps) {
  const [comboBoxFilters, setComboBoxFilters] = useState([
    {
      label: "Categories",
      field: "category" as const,
      items: [] as { value: string; label: string }[],
    },
    {
      label: "Apparels",
      field: "apparel" as const,
      items: [] as { value: string; label: string }[],
    },
  ]);

  const [{ data: productCategories = [] }, { data: productTypes = [] }] =
    useQueries({
      queries: [
        {
          queryKey: ["product-categories"],
          queryFn: () => getAllCategories(),
          select: (data) =>
            formatComboBoxItem(
              data as Record<string, unknown>[],
              "_id",
              "label"
            ),
        },
        {
          queryKey: ["product-types"],
          queryFn: () => getAllProductTypes(),
          select: (data) =>
            formatComboBoxItem(
              data as Record<string, unknown>[],
              "_id",
              "label"
            ),
        },
      ],
    });

  useEffect(() => {
    setComboBoxFilters((prev) =>
      prev.map((filter) =>
        filter.field === "category"
          ? { ...filter, items: productCategories }
          : filter.field === "apparel"
          ? { ...filter, items: productTypes }
          : filter
      )
    );
  }, [productCategories, productTypes]);

  return (
    <div className="z-10 h-min md:block bg-white grid gap-5 rounded-xl border border-slate-200 sticky md:top-0 w-full sm:max-w-full md:max-w-[240px] lg:max-w-[300px] shadow-none md:shadow-xl max-h-screen">
      {/* Mobile toggle */}
      <div className="md:hidden mb-4 px-4 pt-4">
        <Button
          onClick={handleOpenFilterBar}
          variant="outline"
          className="flex items-center gap-2 w-full"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {openFilterBar ? "Close Filters" : "Open Filters"}
        </Button>
      </div>

      {/* Content wrapper with scroll */}
      <div
        className={`${openFilterBar ? "flex" : "hidden"} md:flex flex-col 
                    overflow-y-auto px-6 py-6 gap-6`}
      >
        {/* Header */}
        <div className="pb-3 flex justify-between border-b border-slate-200">
          <p className="font-bold text-[1.1rem]">Filter</p>
          <SlidersHorizontal className="h-5 text-slate-400" />
        </div>

        {/* ComboBox filters */}
        <div className="space-y-5">
          {comboBoxFilters.map(({ label, field, items }) => (
            <div key={field} className="space-y-2">
              <p className="font-bold text-[0.95rem]">{label}</p>
              <ComboBox
                term={field}
                items={items}
                value={filterOptions[field]}
                onChange={(value) => handleFilterOptions(field, value)}
                enableSearch={false}
              />
            </div>
          ))}
        </div>

        {/* Sort Sections */}
        <div className="space-y-6">
          {sortSections.map(({ label, field, options }) => (
            <div key={field} className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox
                  className="border-slate-400 mt-1"
                  checked={filterOptions.sort.some((s) => s.field === field)}
                  onClick={() => {
                    const active = filterOptions.sort.find(
                      (s) => s.field === field
                    );
                    if (active) {
                      handleSortToggle(field, active.order, true);
                    } else {
                      handleSortToggle(field, options[0].value as SortOrder);
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
                disabled={
                  !filterOptions.sort.some((rule) => rule.field === field)
                }
              >
                {options.map(({ value, label }, i) => {
                  const isActive = filterOptions.sort.some(
                    (rule) => rule.field === field
                  );
                  return (
                    <div key={value} className="flex items-center gap-3">
                      <RadioGroupItem value={value} id={`${field}-${i}`} />
                      <Label
                        htmlFor={`${field}-${i}`}
                        className={isActive ? "text-gray-900" : "text-gray-400"}
                      >
                        {label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          ))}
        </div>

        {/* Sticky Reset button */}
        <div className="sticky bottom-0 bg-white pt-4 pb-6">
          <Button
            className="w-full bg-200 text-[0.8rem] py-6 rounded-full"
            onClick={resetFilter}
          >
            Reset Filter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;

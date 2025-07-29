import ComboBox from "@/components/ComboBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { apparels, categories } from "@/data/filterproduct";
import { SlidersHorizontal } from "lucide-react";

type FilterBarProps = {
  openFilterBar: boolean;
  handleOpenFilterBar: () => void;
};

function FilterBar({ openFilterBar }: FilterBarProps) {
  return (
    <>
      <div className="bg-white w-[65%] grid gap-5 h-min py-8 px-6 rounded-l-xl sticky top-0 ml-auto shadow-2xl sm:max-w-[270px] lg:max-w-[300px]">
        <div className="pb-3 flex justify-between border-b-[1px] border-slate-200">
          <p className="font-bold text-[1.1rem]">Filter</p>
          <SlidersHorizontal className="h-5 text-slate-400" />
        </div>

        <div className="space-y-3">
          <p className="font-bold text-[0.95rem]">Categories</p>
          <ComboBox term="category" items={categories} />
        </div>

        <div className="space-y-3">
          <p className="font-bold text-[0.95rem]">Apparels</p>
          <ComboBox term="apparel" items={apparels} />
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox className="border-slate-400 mt-1" />
            <p className="font-bold text-[0.95rem]">Price</p>
          </div>

          <RadioGroup defaultValue="price-lowest" className="ml-2">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="price-lowest" id="r1" />
              <Label htmlFor="r1">Low to high</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="price-highest" id="r2" />
              <Label htmlFor="r2">High to low</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox className="border-slate-400 mt-1" />
            <p className="font-bold text-[0.95rem]">Popularity</p>
          </div>

          <RadioGroup defaultValue="most-liked" className="ml-2">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="most-liked" id="r1" />
              <Label htmlFor="r1">Most liked</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="most-viewed" id="r2" />
              <Label htmlFor="r2">Most viewed</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox className="border-slate-400 mt-1" />
            <p className="font-bold text-[0.95rem]">Alphabetical</p>
          </div>

          <RadioGroup defaultValue="a-z" className="ml-2">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="a-z" id="r1" />
              <Label htmlFor="r1">A-Z</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="z-a" id="r2" />
              <Label htmlFor="r2">Z-A</Label>
            </div>
          </RadioGroup>
        </div>

        <Button className="w-full mt-5 bg-200 text-[0.8rem] py-6 rounded-full">
          Apply Filter
        </Button>
      </div>
    </>
  );
}

export default FilterBar;

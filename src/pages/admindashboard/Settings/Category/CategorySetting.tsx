import { useState } from "react";
import CategorySettingForm from "./CategorySettingForm";
import CategoryTable from "./CategoryTable";
import { categoryData } from "@/data/categoryData";
import type { Category } from "@/data/categoryData";

function CategorySetting() {
  const [categories, setCategories] = useState<Category[]>(categoryData);

  const handleArchive = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 pr-6">
      <CategorySettingForm />
      <CategoryTable categories={categories} onArchive={handleArchive} />
    </div>
  );
}

export default CategorySetting;

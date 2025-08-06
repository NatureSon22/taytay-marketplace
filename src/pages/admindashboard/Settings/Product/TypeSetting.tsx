import { useState } from "react";
import TypeSettingForm from "./TypeSettingForm";
import TypeTable from "./TypeTable";
import { productTypeData } from "@/data/typeData";
import type { ProductType } from "@/data/typeData";

function TypeSetting() {
  const [types, setType] = useState<ProductType[]>(productTypeData);

  const handleArchive = (id: string) => {
    setType((prev) => prev.filter((type) => type.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 pr-6">
      <TypeSettingForm />
      <TypeTable types={types} onArchive={handleArchive} />
    </div>
  );
}

export default TypeSetting;
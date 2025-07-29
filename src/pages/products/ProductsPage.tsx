import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import ProductList from "./ProductList";
import sampleProducts from "@/data/sampleproducts";
import PageLayout from "@/layouts/PageLayout";
import FilterBar from "./FilterBar";
import { useState } from "react";

function ProductsPage() {
  const [openFilterBar, setOpenFilterBar] = useState(true);

  const handleOpenFilterBar = () => {
    setOpenFilterBar((prev) => !prev);
  };

  return (
    <PageLayout paddingTopVariant="none">
      <PadLayout>
        <CenterLayout>
          <div className="w-[90%] flex gap-10">
            <FilterBar
              openFilterBar={openFilterBar}
              handleOpenFilterBar={handleOpenFilterBar}
            />

            <ProductList items={sampleProducts} />
          </div>
        </CenterLayout>
      </PadLayout>
    </PageLayout>
  );
}

export default ProductsPage;

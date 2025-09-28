import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import PageLayout from "@/layouts/PageLayout";
import FilterBar from "./FilterBar";
import { useState } from "react";
import type {
  FilterField,
  ProductFilterSettings,
  SortField,
  SortOrder,
} from "@/types";
import ProductList from "@/components/ProductList";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { useNavigate } from "react-router";

function ProductsPage() {
  const navigate = useNavigate();
  const [filterOptions, setFilterOptions] = useState<ProductFilterSettings>({
    category: "",
    apparel: "",
    sort: [],
  });
  const [openFilterBar, setOpenFilterBar] = useState(true);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const handleFilterOptions = (field: FilterField, value: string) => {
    setFilterOptions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSortToggle = (
    field: SortField,
    order: SortOrder,
    disableSort = false
  ) => {
    setFilterOptions((prev) => {
      const { sort } = prev;
      const existingRule = sort.find((rule) => rule.field === field);

      let updatedSort;

      if (disableSort) {
        updatedSort = sort.filter((rule) => rule.field !== field);
      } else if (existingRule) {
        updatedSort = sort.map((rule) =>
          rule.field === field ? { field, order } : rule
        );
      } else {
        updatedSort = [...sort, { field, order }];
      }

      return {
        ...prev,
        sort: updatedSort,
      };
    });
  };

  const handleOpenFilterBar = () => {
    setOpenFilterBar((prev) => !prev);
  };

  const onProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <PageLayout paddingTopVariant="none">
      <PadLayout>
        <CenterLayout>
          <div className="w-[87%] flex flex-col md:flex-row gap-10">
              <FilterBar
                filterOptions={filterOptions}
                handleFilterOptions={handleFilterOptions}
                handleSortToggle={handleSortToggle}
                openFilterBar={openFilterBar}
                handleOpenFilterBar={handleOpenFilterBar}
            
              />
            <ProductList
              products={products}
              isLoading={isLoading}
              onProductClick={onProductClick}
            />
            
          </div>
        </CenterLayout>
      </PadLayout>
    </PageLayout>
  );
}

export default ProductsPage;

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
import { useLocation, useNavigate } from "react-router";
import PaginationControls from "@/components/PaginationControls";

function ProductsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filterOptions, setFilterOptions] = useState<ProductFilterSettings>({
    category: location.state?.categoryId || "",
    apparel: "",
    sort: [],
  });
  const [openFilterBar, setOpenFilterBar] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [
      "products",
      page,
      filterOptions.category,
      filterOptions.apparel,
      filterOptions.sort,
    ],
    queryFn: () =>
      getProducts(
        page,
        filterOptions.category!,
        filterOptions.apparel!,
        filterOptions.sort
      ),
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
    console.log(filterOptions);

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

  const resetFilter = () => {
    setFilterOptions({
      category: "",
      apparel: "",
      sort: [],
    });
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
              resetFilter={resetFilter}
            />

            <div className="grid flex-1">
              {(filterOptions.category || filterOptions.apparel) &&
              !isLoading &&
              data?.products.length === 0 ? (
                <div className="m-auto">
                  <p className="text-gray-500 text-xl">
                    No products match your filters. Try adjusting your search.
                  </p>
                </div>
              ) : (
                <ProductList
                  products={data?.products || []}
                  isLoading={isLoading}
                  onProductClick={onProductClick}
                />
              )}

              {!isLoading && data?.products.length > 0 && (
                <div className="ml-auto mt-auto">
                  <PaginationControls
                    totalPages={data?.pagination.totalPages}
                    page={data?.pagination.page}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </div>
          </div>
        </CenterLayout>
      </PadLayout>
    </PageLayout>
  );
}

export default ProductsPage;

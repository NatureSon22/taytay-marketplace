import ComboBox from "@/components/ComboBox";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useQueries, useQuery } from "@tanstack/react-query";
import useStoreState from "@/stores/useStoreState";
import { getStoreProducts } from "@/api/store";
import { getAllCategoriesForStore } from "@/api/categories";
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import { getAllProductTypesForStore } from "@/api/productTypes";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import PaginationControls from "@/components/PaginationControls";

const Products = () => {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const { store } = useStoreState();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["store-products", filterCategory, filterType, page],
    queryFn: () => {
      if (!store) throw new Error("Store is empty");

      return getStoreProducts(store._id, filterCategory, filterType, page);
    },
  });

  const [{ data: productCategories = [] }, { data: productTypes = [] }] =
    useQueries({
      queries: [
        {
          queryKey: ["product-categories", store?._id],
          queryFn: () => getAllCategoriesForStore(store!._id),
          select: (data) =>
            formatComboBoxItem(
              data as Record<string, unknown>[],
              "_id",
              "label"
            ),
          enabled: !!store,
        },
        {
          queryKey: ["product-types", store?._id],
          queryFn: () => getAllProductTypesForStore(store!._id),
          select: (data) =>
            formatComboBoxItem(
              data as Record<string, unknown>[],
              "_id",
              "label"
            ),
          enabled: !!store,
        },
      ],
    });

  const resetFilter = () => {
    setFilterCategory("");
    setFilterType("");
  };

  const goToCreateProductPage = () => {
    navigate("/account/store/product/new");
  };

  return (
    <div className="space-y-8 @container">
      <div className="flex gap-5 flex-col justify-between @md:flex-row">
        <p className="uppercase font-bold text-xl text-slate-600">
          my products
        </p>

        <div className="flex flex-col gap-3 md:flex-row">
          <div className="w-full @md:w-[200px] @lg:w-[220px] @xl:w-[240px]">
            <ComboBox
              items={productCategories}
              term="category"
              enableSearch={false}
              value={filterCategory}
              onChange={setFilterCategory}
            />
          </div>

          <div className="w-full  @md:w-[200px] @lg:w-[220px] @xl:w-[240px]">
            <ComboBox
              items={productTypes}
              term="type"
              enableSearch={false}
              value={filterType}
              onChange={setFilterType}
            />
          </div>

          <div className="flex gap-1">
            <Button className="h-full" onClick={resetFilter}>
              <RotateCcw className="mx-1" />
            </Button>

            <Button
              className="bg-100 px-5 py-[22px] cursor-pointer"
              onClick={goToCreateProductPage}
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-10">
        {(filterCategory || filterType) &&
        !isLoading &&
        data?.products.length === 0 ? (
          <div className="h-32 grid place-items-center">
            <p className="text-gray-500">
              No products match your filters. Try adjusting your search.
            </p>
          </div>
        ) : (
          <ProductList
            products={data?.products || []}
            columns={4}
            isLoading={isLoading}
            onProductClick={() => {}}
          />
        )}

        <div className="ml-auto">
          <PaginationControls
            totalPages={data?.pagination.totalPages}
            page={data?.pagination.page}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;

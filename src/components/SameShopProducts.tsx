import type { Product } from "@/types";
import ComboBox from "./ComboBox";
import ProductList from "./ProductList";
import { getAllProductTypesForStore } from "@/api/productTypes";
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import { useQueries } from "@tanstack/react-query";
import { getAllCategoriesForStore } from "@/api/categories";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";

type SameShopProducts = {
  products?: Product[];
  isLoading: boolean;
  storeId?: string;
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  filterType: string;
  setFilterType: (val: string) => void;
  resetFilter: () => void;
};

const SameShopProducts = ({
  products = [],
  isLoading,
  storeId,
  filterCategory,
  setFilterCategory,
  filterType,
  setFilterType,
  resetFilter,
}: SameShopProducts) => {
  const navigate = useNavigate();

  const [{ data: productCategories = [] }, { data: productTypes = [] }] =
    useQueries({
      queries: [
        {
          queryKey: ["product-categories", storeId],
          queryFn: () => getAllCategoriesForStore(storeId!),
          select: (data) =>
            formatComboBoxItem(
              data as Record<string, unknown>[],
              "_id",
              "label"
            ),
          enabled: !!storeId,
        },
        {
          queryKey: ["product-types", storeId],
          queryFn: () => getAllProductTypesForStore(storeId!),
          select: (data) =>
            formatComboBoxItem(
              data as Record<string, unknown>[],
              "_id",
              "label"
            ),
          enabled: !!storeId,
        },
      ],
    });

  const onProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="space-y-8 @container">
      <div className="flex gap-5 flex-col justify-between @md:flex-row">
        <p className="uppercase font-bold text-xl text-slate-600">
          from the same shop
        </p>

        {/* w-[220px] */}
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
              term="apparel"
              enableSearch={false}
              value={filterType}
              onChange={setFilterType}
            />
          </div>

          <Button className="h-full" onClick={resetFilter}>
            <RotateCcw className="mx-1" />
          </Button>
        </div>
      </div>

      <div className="">
        {!isLoading &&
        products.length === 0 &&
        !filterCategory &&
        !filterType ? (
          <div className="text-[1.2rem] text-center">
            <p className="text-slate-500 font-semibold">
              This store hasn’t added any products yet...
            </p>
          </div>
        ) : (
          <ProductList
            products={products}
            columns={4}
            isLoading={isLoading}
            onProductClick={onProductClick}
          />
        )}
      </div>
    </div>
  );
};

export default SameShopProducts;

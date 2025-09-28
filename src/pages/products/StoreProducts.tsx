import CenterLayout from "@/layouts/CenterLayout";
import ContentGrid from "@/layouts/ContentGrid";
import PadLayout from "@/layouts/PadLayout";
import storeImg from "@/assets/storeImg.png";
import { RotateCcw, Store } from "lucide-react";
import ComboBox from "@/components/ComboBox";
import ProductList from "@/components/ProductList";
import { getStore, getStoreProducts } from "@/api/store";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import PaginationControls from "@/components/PaginationControls";
import { getAllCategoriesForStore } from "@/api/categories";
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import { getAllProductTypesForStore } from "@/api/productTypes";
import { Button } from "@/components/ui/button";

type StoreProductProps = {
  storeId: string;
};

function StoreProducts({ storeId }: StoreProductProps) {
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const navigate = useNavigate();

  const { data: store, isLoading: storeLoading } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => getStore(storeId),
    enabled: !!storeId,
  });

  const { data, isLoading: productsLoading } = useQuery({
    queryKey: ["store-products", storeId, filterCategory, filterType, page],
    queryFn: () => getStoreProducts(storeId, filterCategory, filterType, page),
    enabled: !!storeId,
  });

  const [{ data: productCategories = [] }, { data: productTypes = [] }] =
    useQueries({
      queries: [
        {
          queryKey: ["product-categories", storeId],
          queryFn: () => getAllCategoriesForStore(storeId),
          select: (data) =>
            formatComboBoxItem(
              data as Record<string, unknown>[],
              "_id",
              "label"
            ),
        },
        {
          queryKey: ["product-types", storeId],
          queryFn: () => getAllProductTypesForStore(storeId),
          select: (data) =>
            formatComboBoxItem(
              data as Record<string, unknown>[],
              "_id",
              "label"
            ),
        },
      ],
    });

  const onProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const resetFilter = () => {
    setFilterCategory("");
    setFilterType("");
  };

  return (
    <PadLayout>
      <CenterLayout>
        <ContentGrid>
          <div>
            {/* store header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {storeLoading ? (
                  <Skeleton className="size-12 rounded-full bg-slate-300" />
                ) : (
                  <div className="size-12 rounded-full border overflow-hidden">
                    <img
                      className="h-full w-full object-cover rounded-full"
                      src={store?.profilePicture || storeImg}
                      alt=""
                    />
                  </div>
                )}

                {storeLoading ? (
                  <Skeleton className="h-8 w-24 rounded-sm bg-slate-300" />
                ) : (
                  <p className="text-[1.05rem] font-bold uppercase">
                    {store?.storeName}
                  </p>
                )}
              </div>

              {storeLoading ? (
                <Skeleton className="h-6 w-28 rounded-sm bg-slate-300" />
              ) : (
                <Link
                  className="flex items-center gap-3"
                  to={`/stores/${storeId}`}
                >
                  <Store className="size-4" />
                  <p>View Shop</p>
                </Link>
              )}
            </div>

            <div className="border my-7"></div>

            {/* filters */}
            <div className="space-y-8">
              <div className="flex justify-between flex-col lg:flex-row">
                <p className="uppercase font-bold text-xl text-slate-600">
                  from the same shop
                </p>

                <div className="flex flex-col gap-3 mt-3 lg:flex-row">
                  {storeLoading ? (
                    <>
                      <Skeleton className="h-10 w-[220px] rounded-md bg-slate-300" />
                      <Skeleton className="h-10 w-[220px] rounded-md bg-slate-300" />
                    </>
                  ) : (
                    <>
                      <div className="w-[220px]">
                        <ComboBox
                          items={productCategories}
                          term="category"
                          enableSearch={false}
                          value={filterCategory}
                          onChange={setFilterCategory}
                        />
                      </div>
                      <div className="w-[220px]">
                        <ComboBox
                          items={productTypes}
                          term="type"
                          enableSearch={false}
                          value={filterType}
                          onChange={setFilterType}
                        />
                      </div>

                      <Button className="h-full" onClick={resetFilter}>
                        <RotateCcw className="mx-1" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* product grid */}
              <div className="grid gap-12">
                {!productsLoading && data?.products.length === 0 && (
                  <div className="h-32 grid place-items-center">
                    <p className="text-gray-500">
                      No products match your filters. Try adjusting your search.
                    </p>
                  </div>
                )}

                <ProductList
                  products={data?.products || []}
                  columns={4}
                  isLoading={productsLoading}
                  onProductClick={onProductClick}
                />

                {!productsLoading && data?.products.length > 0 && (
                  <div className="ml-auto">
                    <PaginationControls
                      totalPages={data?.pagination.totalPages}
                      page={data?.pagination.page}
                      onPageChange={setPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </ContentGrid>
      </CenterLayout>
    </PadLayout>
  );
}

export default StoreProducts;

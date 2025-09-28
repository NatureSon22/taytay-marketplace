import CenterLayout from "@/layouts/CenterLayout";
import ContentGrid from "@/layouts/ContentGrid";
import PadLayout from "@/layouts/PadLayout";
import PageLayout from "@/layouts/PageLayout";
import StoreProfile from "@/components/StoreProfile";
import SameShopProducts from "@/components/SameShopProducts";
import { useParams } from "react-router";
import { getStore, getStoreProducts } from "@/api/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PaginationControls from "@/components/PaginationControls";

function StoreDetails() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");

  const { data: store, isLoading: storeLoading } = useQuery({
    queryKey: ["store", id],
    queryFn: () => getStore(id!),
  });

  const { data, isLoading: productsLoading } = useQuery({
    queryKey: ["store-products", id, page, filterCategory, filterType],
    queryFn: () => getStoreProducts(id!, filterCategory, filterType, page),
  });

  const resetFilter = () => {
    setFilterCategory("");
    setFilterType("");
  };

  return (
    <PageLayout>
      <PadLayout>
        <CenterLayout>
          <ContentGrid>
            <StoreProfile store={store} isLoading={storeLoading} />
          </ContentGrid>
        </CenterLayout>
      </PadLayout>

      <PadLayout>
        <CenterLayout>
          <ContentGrid>
            <div className="grid gap-12">
              <div>
                <div className="border my-7"></div>
                <SameShopProducts
                  products={data?.products || []}
                  isLoading={productsLoading}
                  storeId={store?._id}
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  filterType={filterType}
                  setFilterType={setFilterType}
                  resetFilter={resetFilter}
                />
              </div>

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
          </ContentGrid>
        </CenterLayout>
      </PadLayout>
    </PageLayout>
  );
}

export default StoreDetails;

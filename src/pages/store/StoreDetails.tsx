import CenterLayout from "@/layouts/CenterLayout";
import ContentGrid from "@/layouts/ContentGrid";
import PadLayout from "@/layouts/PadLayout";
import PageLayout from "@/layouts/PageLayout";
import StoreProfile from "@/components/StoreProfile";
import SameShopProducts from "@/components/SameShopProducts";
import { useParams } from "react-router";
import { getStore, getStoreProducts } from "@/api/store";
import { useQuery } from "@tanstack/react-query";

function StoreDetails() {
  const { id } = useParams();

  const { data: store, isLoading: storeLoading } = useQuery({
    queryKey: ["store", id],
    queryFn: () => getStore(id!),
  });

  const { data, isLoading: productsLoading } = useQuery({
    queryKey: ["store-products", id],
    queryFn: () => getStoreProducts(id!),
  });

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
            <SameShopProducts
              products={data?.products || []}
              isLoading={productsLoading}
              storeId={store?._id}
            />
          </ContentGrid>
        </CenterLayout>
      </PadLayout>
    </PageLayout>
  );
}

export default StoreDetails;

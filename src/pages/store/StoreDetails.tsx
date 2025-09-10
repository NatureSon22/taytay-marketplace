import CenterLayout from "@/layouts/CenterLayout";
import ContentGrid from "@/layouts/ContentGrid";
import PadLayout from "@/layouts/PadLayout";
import PageLayout from "@/layouts/PageLayout";
import StoreProfile from "@/components/StoreProfile";
import SameShopProducts from "@/components/SameShopProducts";

function StoreDetails() {
  return (
    <PageLayout>
      <PadLayout>
        <CenterLayout>
          <ContentGrid>
            <StoreProfile />
          </ContentGrid>
        </CenterLayout>
      </PadLayout>

      <PadLayout>
        <CenterLayout>
          <ContentGrid>
            <SameShopProducts />
          </ContentGrid>
        </CenterLayout>
      </PadLayout>
    </PageLayout>
  );
}

export default StoreDetails;

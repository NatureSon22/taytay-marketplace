import CenterLayout from "@/layouts/CenterLayout";
import ContentGrid from "@/layouts/ContentGrid";
import PadLayout from "@/layouts/PadLayout";
import PageLayout from "@/layouts/PageLayout";

import shopee from "@/assets/Shopee-Logo.png";
import lazada from "@/assets/Lazada-Logo.png";
import ProductImages from "./ProductImages";
import StoreProducts from "./StoreProducts";

function ProductDetailsPage() {
  return (
    <PageLayout>
      <PadLayout>
        <CenterLayout>
          <ContentGrid>
            <div className="flex flex-col justify-center items-center gap-8 lg:flex-row lg:items-start xl:gap-14">
              <ProductImages />

              <div className="">
                <div className="space-y-4">
                  <p className="uppercase font-kenzoestic text-5xl leading-tight tracking-tight">
                    one life graphic tshirt
                  </p>

                  <p className="font-medium text-2xl">&#x20B1;399</p>
                  <p className="text-[0.95rem] text-justify">
                    This graphic t-shirt which is perfect for any occasion.
                    Crafted from a soft and breathable fabric, it offers
                    superior comfort and style.
                  </p>
                </div>

                <div className="border my-7"></div>

                <div className="flex flex-col gap-5">
                  {/* categories */}
                  <div className="space-y-3">
                    <p className="text-200/60">Category</p>
                    <div>
                      <p className="text-[0.85rem] text-200/70 bg-slate-300/60 w-max px-7 py-3 rounded-full">
                        Men's Fashion
                      </p>
                    </div>
                  </div>
                  {/* type */}
                  <div className="space-y-3">
                    <p className="text-200/60">Type</p>
                    <p className="text-[0.85rem] text-200/70 bg-slate-300/60 w-max px-7 py-3 rounded-full">
                      Shirt
                    </p>
                  </div>
                  {/* availability */}
                  <div className="mt-5 space-y-3">
                    <p className="text-200/60">Available on</p>
                    <div className="flex items-center gap-7">
                      <div className="w-[80px] h-[50px]">
                        <img src={shopee} alt="" />
                      </div>
                      <div className="w-[80px] h-[50px]">
                        <img src={lazada} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ContentGrid>
        </CenterLayout>
      </PadLayout>

      <StoreProducts />
    </PageLayout>
  );
}

export default ProductDetailsPage;

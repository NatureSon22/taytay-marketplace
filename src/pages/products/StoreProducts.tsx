import CenterLayout from "@/layouts/CenterLayout";
import ContentGrid from "@/layouts/ContentGrid";
import PadLayout from "@/layouts/PadLayout";
import storeImg from "@/assets/storeImg.png";
import { Store } from "lucide-react";
import ComboBox from "@/components/ComboBox";
import sampleProducts from "@/data/sampleproducts";
import ProductList from "@/components/ProductList";

function StoreProducts() {
  return (
    <PadLayout>
      <CenterLayout>
        <ContentGrid>
          <div className="">
            {/* store header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full">
                  <img
                    className="h-full w-full object-cover"
                    src={storeImg}
                    alt=""
                  />
                </div>

                <p className="text-[1.05rem] font-bold">STYL E. BOSS</p>
              </div>

              <div className="flex items-center gap-3">
                <Store />
                <p>View Shop</p>
              </div>
            </div>

            <div className="border my-7"></div>

            {/* filters */}
            <div className="space-y-8">
              <div className="flex justify-between">
                <p className="uppercase font-bold text-xl text-slate-600">
                  from the same shop
                </p>

                <div className="flex gap-3">
                  <div className="w-[220px]">
                    <ComboBox items={[]} term="category" />
                  </div>

                  <div className="w-[220px]">
                    <ComboBox items={[]} term="apparel" />
                  </div>
                </div>
              </div>

              <div>
                <ProductList products={sampleProducts} columns={5} />
              </div>
            </div>
          </div>
        </ContentGrid>
      </CenterLayout>
    </PadLayout>
  );
}

export default StoreProducts;

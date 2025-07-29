import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import StoreCard from "./StoreCard";
import ComboBox from "@/components/ComboBox";
import storeFilters from "@/data/filter";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import PageLayout from "@/layouts/PageLayout";

type StoreCard = {
  storeName: string;
  profilePicture?: string;
};

const stores: StoreCard[] = [
  { storeName: "Jio's Store" },
  { storeName: "The Trendy Cart" },
  { storeName: "Urban Finds" },
  { storeName: "Bargain Haven" },
  { storeName: "Style Central" },
  { storeName: "Market Vibe" },
  { storeName: "The Daily Deal" },
  { storeName: "Chic Picks" },
  { storeName: "ValueMart" },
  { storeName: "The Closet Rack" },
  { storeName: "Tiangge Treasures" },
  { storeName: "Bazaar Bliss" },
  { storeName: "Shop & Save" },
  { storeName: "Pinoy Picks" },
  { storeName: "Budget Box" },
  { storeName: "The Local Shelf" },
];

function StorePage() {
  const [filter, setFilter] = useState("");

  return (
    <PageLayout paddingTopVariant="none">
      <PadLayout>
        <CenterLayout>
          <div className="flex flex-col w-[80%] gap-5 justify-between items-center sm:flex-row">
            <Input
              className="flex-1 py-5 px-5 sm:max-w-80"
              placeholder="Seach store..."
            />

            <div className="flex items-center gap-5 ml-auto">
              <p className="hidden">Filter:</p>
              <div className="w-52">
                <ComboBox
                  items={storeFilters}
                  term="filter"
                  enableSearch={false}
                  value={filter}
                  onChange={setFilter}
                />
              </div>
            </div>
          </div>
        </CenterLayout>

        <CenterLayout>
          <div className="w-[80%] mt-12 grid gap-x-10 gap-y-10 place-items-center sm:grid-cols-3 md:gap-y-14 lg:gap-y-20 lg:grid-cols-4 xl:grid-cols-5 ">
            {stores.map((store) => (
              <StoreCard key={store.storeName} storeName={store.storeName} />
            ))}
          </div>
        </CenterLayout>
      </PadLayout>
    </PageLayout>
  );
}

export default StorePage;

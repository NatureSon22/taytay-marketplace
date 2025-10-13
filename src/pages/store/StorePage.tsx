import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import StoreCard from "./StoreCard";
import ComboBox from "@/components/ComboBox";
import storeFilters from "@/data/filter";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import PageLayout from "@/layouts/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { getStores } from "@/api/store";
import type { Store } from "@/types";
import { useNavigate } from "react-router";
import PaginationControls from "@/components/PaginationControls";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

function StorePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Debounced search term
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["stores", debouncedSearch, sort, page],
    queryFn: () => getStores(debouncedSearch, page, sort),
  });

  const viewStore = (storeId: string) => {
    navigate(`/stores/${storeId}`);
  };

  const resetFilter = () => {
    setSort("");
  };

  return (
    <PageLayout paddingTopVariant="none">
      <PadLayout>
        <CenterLayout>
          <div className="flex flex-col w-[80%] gap-5 sm:flex-row">
            <Input
              className="max-w-[400px] flex-1 border py-4 px-5"
              placeholder="Search store..."
              aria-label="Search stores"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset to first page on new search
              }}
            />

            <div className="flex items-center gap-5">
              <p className="hidden sm:block">Filter:</p>

              <div className="flex items-center gap-1">
                <div className="w-52">
                  <ComboBox
                    items={storeFilters}
                    term="filter"
                    enableSearch={false}
                    value={sort}
                    onChange={(val) => {
                      setSort(val);
                      setPage(1); // reset to first page when filter changes
                    }}
                  />
                </div>
                <Button className="py-5" onClick={resetFilter}>
                  <RotateCcw className="mx-1" />  
                </Button>
              </div>
            </div>
          </div>
        </CenterLayout>

        <CenterLayout>
          <div className="w-[80%] grid ">
            <div className="mt-12 grid gap-x-10 gap-y-10 place-items-center sm:grid-cols-3 md:gap-y-14 lg:gap-y-20 lg:grid-cols-4 xl:grid-cols-5">
              {isLoading ? (
                Array.from({ length: 10 }, (_, idx) => (
                  <StoreCard
                    key={idx}
                    storeName=""
                    profilePicture=""
                    isLoading={true}
                  />
                ))
              ) : data?.stores.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">
                  {debouncedSearch
                    ? "No stores found..."
                    : "No stores available yet."}
                </p>
              ) : (
                data?.stores.map((store: Store) => (
                  <StoreCard
                    key={store._id}
                    storeName={store.storeName}
                    profilePicture={store.profilePicture}
                    isLoading={false}
                    onClick={() => viewStore(store._id)}
                  />
                ))
              )}
            </div>

            {!isLoading && data?.stores.length > 0 && (
              <div className="ml-auto mt-10 flex justify-center">
                <PaginationControls
                  totalPages={data?.totalPages}
                  page={data?.page}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>
        </CenterLayout>
      </PadLayout>
    </PageLayout>
  );
}

export default StorePage;

import CenterLayout from "@/layouts/CenterLayout";
import ContentGrid from "@/layouts/ContentGrid";
import PadLayout from "@/layouts/PadLayout";
import PageLayout from "@/layouts/PageLayout";

import shopee from "@/assets/Shopee-Logo.png";
import lazada from "@/assets/Lazada-Logo.png";
import ProductImages from "./ProductImages";
import StoreProducts from "./StoreProducts";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/products";
import type { Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

function ProductDetailsPage() {
  const { id } = useParams();

  const { data = {} as Product, isLoading: productLoading } = useQuery<Product>(
    {
      queryKey: ["product-details", id],
      queryFn: () => getProduct(id!),
    }
  );

  return (
    <PageLayout>
      <PadLayout>
        <CenterLayout>
          <ContentGrid>
            <div className="flex flex-col justify-center items-center gap-8 lg:flex-row lg:items-start xl:gap-14">
              <ProductImages
                images={data.productPictures}
                isLoading={productLoading}
              />

              <div className="w-full">
                <div className="space-y-4">
                  {/* product name */}
                  {productLoading ? (
                    <Skeleton className="w-[80%] py-10 bg-slate-300 lg:w-[60%]" />
                  ) : (
                    <p className="uppercase font-kenzoestic text-5xl leading-tight tracking-tight">
                      {data.productName}
                    </p>
                  )}

                  {/* price */}
                  <div className="font-medium text-2xl">
                    {productLoading ? (
                      <Skeleton className="py-4 bg-slate-300 w-[30%] lg:w-[20%]" />
                    ) : (
                      <span>&#x20B1;{data.productPrice}</span>
                    )}
                  </div>

                  {/* description */}
                  <div className="text-[0.95rem] text-justify">
                    {productLoading ? (
                      <Skeleton className="py-8 bg-slate-300 w-full" />
                    ) : (
                      data.productDescription
                    )}
                  </div>
                </div>

                <div className="border my-7"></div>

                <div className="flex flex-col gap-5">
                  {/* categories */}
                  <div className="space-y-3">
                    <p className="text-200/60">Category</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {productLoading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton
                              key={i}
                              className="h-8 w-24 rounded-full bg-slate-300"
                            />
                          ))
                        : data.categories?.map((category) => (
                            <p
                              key={category}
                              className="text-[0.85rem] text-200/70 bg-slate-300/60 w-max px-7 py-3 rounded-full"
                            >
                              {category}
                            </p>
                          ))}
                    </div>
                  </div>

                  {/* types */}
                  <div className="space-y-3">
                    <p className="text-200/60">Type</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {productLoading
                        ? Array.from({ length: 2 }).map((_, i) => (
                            <Skeleton
                              key={i}
                              className="h-8 w-24 rounded-full bg-slate-300"
                            />
                          ))
                        : data.types?.map((type) => (
                            <p
                              key={type}
                              className="text-[0.85rem] text-200/70 bg-slate-300/60 w-max px-7 py-3 rounded-full"
                            >
                              {type}
                            </p>
                          ))}
                    </div>
                  </div>

                  {/* availability */}
                  <div className="mt-5 space-y-3">
                    <p className="text-200/60">Available on</p>
                    <div className="flex items-center gap-7">
                      {productLoading ? (
                        <>
                          <Skeleton className="w-[85px] h-[40px] rounded-md bg-slate-300" />
                          <Skeleton className="w-[85px] h-[40px] rounded-md bg-slate-300" />
                        </>
                      ) : (
                        <>
                          <div className="w-[80px] h-[50px]">
                            <img src={shopee} alt="Shopee" />
                          </div>
                          <div className="w-[80px] h-[50px]">
                            <img src={lazada} alt="Lazada" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ContentGrid>
        </CenterLayout>
      </PadLayout>

      <StoreProducts storeId={data.storeId} />
    </PageLayout>
  );
}

export default ProductDetailsPage;
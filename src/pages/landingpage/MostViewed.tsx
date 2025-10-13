import { getProducts } from "@/api/products";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import PadLayout from "@/layouts/PadLayout";
import { useQuery } from "@tanstack/react-query";
import ProductList from "@/components/ProductList";
import { useNavigate } from "react-router";

const FILTER = [
  {
    field: "popularity",
    order: "most-viewed",
  },
];

function MostViewed() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["products", "most-viewed"],
    queryFn: () => getProducts(1, "", "", FILTER),
  });

  const onProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <PadLayout>
      <div className="flex justify-center">
        <div className="w-[80%] grid gap-12 md:w-[85%]">
          <Header text="most viewed" />

          <ProductList
            products={data?.products || []}
            isLoading={isLoading}
            fill_rows={1}
            onProductClick={onProductClick}
            limit={4}
          />

          <Button
            className="mt-5 text-[1rem] mx-auto text-100 px-7 cursor-pointer py-5 rounded-full border-blue-900 hover:bg-100 hover:text-white"
            variant={"outline"}
            onClick={() => navigate("/products")}
          >
            View All
          </Button>
        </div>
      </div>
    </PadLayout>
  );
}

export default MostViewed;

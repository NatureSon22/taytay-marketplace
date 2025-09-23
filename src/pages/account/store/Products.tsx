import ComboBox from "@/components/ComboBox";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useStoreState from "@/stores/useStoreState";
import { getStoreProducts } from "@/api/store";

const Products = () => {
  const { store } = useStoreState();
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["store-products"],
    queryFn: () => {
      if (!store) throw new Error("Store is empty");

      return getStoreProducts(store._id);
    },
  });

  const goToCreateProductPage = () => {
    navigate("/account/store/product/new");
  };

  return (
    <div className="space-y-8 @container">
      <div className="flex gap-5 flex-col justify-between @md:flex-row">
        <p className="uppercase font-bold text-xl text-slate-600">
          my products
        </p>

        <div className="flex flex-col gap-3 md:flex-row">
          <div className="w-full @md:w-[200px] @lg:w-[220px] @xl:w-[240px]">
            <ComboBox items={[]} term="category" enableSearch={false} />
          </div>

          <div className="w-full  @md:w-[200px] @lg:w-[220px] @xl:w-[240px]">
            <ComboBox items={[]} term="type" enableSearch={false} />
          </div>

          <Button
            className="bg-100 px-5 py-[22px] cursor-pointer"
            onClick={goToCreateProductPage}
          >
            Add Product
          </Button>
        </div>
      </div>

      <div>
        <ProductList products={products} columns={4} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Products;

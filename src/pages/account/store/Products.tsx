import ComboBox from "@/components/ComboBox";
import ProductList from "@/components/ProductList";
import sampleProducts from "@/data/sampleproducts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Products = () => {
  const navigate = useNavigate();

  const goToCreateProductPage = () => {
    navigate("/account/store/product/new");
  };

  return (
    <div className="space-y-8 @container">
      <div className="flex gap-5 flex-col justify-between @md:flex-row">
        <p className="uppercase font-bold text-xl text-slate-600">
          my products
        </p>

        {/* w-[220px] */}
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="w-full @md:w-[200px] @lg:w-[220px] @xl:w-[240px]">
            <ComboBox items={[]} term="category" />
          </div>

          <div className="w-full  @md:w-[200px] @lg:w-[220px] @xl:w-[240px]">
            <ComboBox items={[]} term="apparel" />
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
        <ProductList products={sampleProducts} columns={4} />
      </div>
    </div>
  );
};

export default Products;

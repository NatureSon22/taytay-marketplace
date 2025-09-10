import ComboBox from "./ComboBox";
import ProductList from "./ProductList";
import sampleProducts from "@/data/sampleproducts";

const SameShopProducts = () => {
  return (
    <div className="space-y-8 @container">
      <div className="flex gap-5 flex-col justify-between @md:flex-row">
        <p className="uppercase font-bold text-xl text-slate-600">
          from the same shop
        </p>

        {/* w-[220px] */}
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="w-full @md:w-[200px] @lg:w-[220px] @xl:w-[240px]">
            <ComboBox items={[]} term="category" />
          </div>

          <div className="w-full  @md:w-[200px] @lg:w-[220px] @xl:w-[240px]">
            <ComboBox items={[]} term="apparel" />
          </div>
        </div>
      </div>

      <div>
        <ProductList products={sampleProducts} columns={5} />
      </div>
    </div>
  );
};

export default SameShopProducts;

import Header from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import sampleProducts from "@/data/sampleproducts";
import PadLayout from "@/layouts/PadLayout";

function NewArrivals() {
  return (
    <PadLayout>
      <div className="flex justify-center">
        <div className="w-[80%] grid gap-12 md:w-[85%]">
          <Header text="new arrivals" />

          <div className="grid gap-10 place-items-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
            {sampleProducts.map((product) => {
              return <ProductCard key={product.id} {...product} />;
            })}
          </div>

          <Button
            className="mt-5 text-[1rem] mx-auto text-100 px-7 cursor-pointer py-5 rounded-full border-blue-900 hover:bg-100 hover:text-white"
            variant={"outline"}
          >
            View All
          </Button>
        </div>
      </div>
    </PadLayout>
  );
}

export default NewArrivals;

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import categories from "@/data/categories";
import PadLayout from "@/layouts/PadLayout";

function Categories() {
  return (
    <PadLayout>
      <div className="flex justify-center">
        <div className="w-[80%] grid place-items-center gap-12">
          <Header text="categories" />

          <div className="grid place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-6">
            {categories.map((category) => {
              return (
                <div
                  key={category.label}
                  className="size-48 rounded-full grid gap-2 place-items-center shadow-xl border border-slate-200/50"
                >
                  <div className="grid place-items-center gap-4">
                    <div className="size-20 grid place-items-center rounded-full overflow-hidden">
                      <img
                        src={category.img}
                        alt={category.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[0.9rem] text-center font-medium">
                      {category.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            className="mt-8 text-[1rem] text-100 px-7 cursor-pointer py-5 rounded-full border-blue-900 hover:bg-100 hover:text-white"
            variant={"outline"}
          >
            Browse Products
          </Button>
        </div>
      </div>
    </PadLayout>
  );
}

export default Categories;

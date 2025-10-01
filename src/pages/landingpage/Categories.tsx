import { getAllCategories } from "@/api/categories";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import PadLayout from "@/layouts/PadLayout";
import type { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const gradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500",
];

function Categories() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const clickCategory = (categoryId: string) => {
    navigate("/products", { state: { categoryId } });
  };

  return (
    <PadLayout>
      <div className="flex justify-center">
        <div className="w-[80%] grid place-items-center gap-12">
          <Header text="categories" />

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-center lg:gap-8 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="size-36 md:size-32 lg:size-40 bg-slate-300 rounded-full"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-center lg:gap-8 gap-8">
              {data.slice(0, 6).map((category: Category, idx: number) => (
                <div
                  key={category.label}
                  className={`size-36 md:size-32 lg:size-40 rounded-full flex items-center justify-center text-center shadow-lg 
                    bg-gradient-to-br ${
                      gradients[idx % gradients.length]
                    } text-white
                    relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                  onClick={() => clickCategory(category._id || "")}
                >
                  <div className="absolute inset-0 rounded-full ring-0 group-hover:ring-4 ring-white/40 transition-all duration-300"></div>

                  <p className="text-sm md:text-base font-semibold drop-shadow-md">
                    {category.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PadLayout>
  );
}

export default Categories;

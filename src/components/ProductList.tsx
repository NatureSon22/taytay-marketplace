import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type ProductListProps = {
  products: Product[];
  columns?: number;
};

function ProductList({ products, columns = 4 }: ProductListProps) {
  return (
    <div
      className={cn(
        "w-full grid place-items-center gap-10 md:grid-cols-2 lg:grid-cols-3 xl:place-items-startr",
        columns == 4 ? "xl:grid-cols-4" : `xl:grid-cols-${columns}`
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          productName={product.productName}
          productPrice={product.productPrice}
          productPictures={product.productPictures}
        />
      ))}
    </div>
  );
}

export default ProductList;

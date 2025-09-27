import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type ProductListProps = {
  products: Product[];
  columns?: number;
  isLoading?: boolean;
  fill_rows?: number;
  onProductClick?: (productId: string) => void;
};

function ProductList({
  products,
  columns = 4,
  isLoading = false,
  fill_rows = 2,
  onProductClick = () => {},
}: ProductListProps) {
  return (
    <div
      className={cn(
        "w-full grid place-items-center gap-10 md:grid-cols-2 lg:grid-cols-3 xl:place-items-start",
        columns === 4
          ? "xl:grid-cols-4"
          : columns === 3
          ? "xl:grid-cols-3"
          : columns === 2
          ? "xl:grid-cols-2"
          : "xl:grid-cols-1"
      )}
    >
      {isLoading
        ? Array.from({ length: columns * fill_rows }).map((_, i) => (
            <ProductCard
              key={`skeleton-${i}`}
              productName=""
              productPrice=""
              productPictures={[]}
              isLoading={true}
            />
          ))
        : products.map((product) => (
            <ProductCard
              key={product.productName}
              productName={product.productName}
              productPrice={product.productPrice}
              productPictures={product.productPictures}
              isLoading={false}
              onClick={() => onProductClick(product._id)}
            />
          ))}
    </div>
  );
}

export default ProductList;

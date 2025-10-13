import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type ProductListProps = {
  products: Product[];
  columns?: number;
  isLoading?: boolean;
  fill_rows?: number;
  onProductClick?: (productId: string) => void;
  editable?: boolean;
  limit?: number;
};

function ProductList({
  products,
  columns = 4,
  isLoading = false,
  fill_rows = 2,
  onProductClick = () => {},
  editable = false,
  limit,
}: ProductListProps) {
  const visibleProducts = limit ? products.slice(0, limit) : products;

  return (
    <div
      className={cn(
        "z-2 w-full grid place-items-center gap-10 md:grid-cols-2 lg:grid-cols-3 xl:place-items-start",
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
        : visibleProducts.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              productName={product.productName}
              productPrice={product.productPrice}
              productPictures={product.productPictures}
              isLoading={false}
              onClick={() => onProductClick(product._id)}
              editable={editable}
            />
          ))}
    </div>
  );
}

export default ProductList;

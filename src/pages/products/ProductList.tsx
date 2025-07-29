import { ProductCard, type ProductCardProps } from "@/components/ProductCard";

type ProductListProps = { items: ProductCardProps[] | [] };

function ProductList({ items }: ProductListProps) {
  return (
    <div className="grid place-items-center gap-10 flex-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:place-items-start">
      {items.map((item) => (
        <ProductCard key={item.productName} {...item} />
      ))}
    </div>
  );
}

export default ProductList;

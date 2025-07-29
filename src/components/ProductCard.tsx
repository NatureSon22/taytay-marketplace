type ProductCardProps = {
  productName: string;
  productPrice: string;
  productPictures: string[];
};

function ProductCard({
  productName,
  productPrice,
  productPictures,
}: ProductCardProps) {
  return (
    <div className="group relative w-full max-w-[330px] cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:-translate-y-1 hover:border-gray-200">
      {/* Image Container */}
      <div className="relative h-[280px] w-full overflow-hidden bg-gray-50">
        <img
          src={productPictures[0]}
          alt={productName}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="px-4 py-5 space-y-3">
        <div className="space-y-1 pl-2">
          <p className="text-[0.95rem] font-medium line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
            {productName}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-[1.1rem] font-bold transition-colors duration-200">
              ₱{productPrice.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
    </div>
  );
}

export type { ProductCardProps };
export { ProductCard };

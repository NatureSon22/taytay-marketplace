import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type ProductImagesProps = {
  images: string[];
  isLoading: boolean;
};

function ProductImages({ images, isLoading }: ProductImagesProps) {
  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (images && images.length > 0) {
      setProductImages(images);
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleSelectImage = (newSelectedImage: string) => {
    setSelectedImage(newSelectedImage);
  };

  // (fill with skeletons if fewer images)
  const thumbnailSlots = Array.from({ length: 4 }).map(
    (_, idx) => productImages[idx] ?? ""
  );

  return (
    <div className="w-full space-y-3 md:space-y-0 md:flex md:flex-row-reverse md:gap-3 lg:w-max lg:flex-row-reverse">
      {/* main image */}
      <div className="h-[300px] w-full rounded-xl md:h-[400px] lg:h-[500px] lg:w-[400px] xl:w-[500px] overflow-hidden">
        {isLoading ? (
          <Skeleton className="w-full h-full bg-slate-300" />
        ) : (
          <img
            className="h-full w-full object-cover rounded-xl hover:scale-110 transition-transform duration-150"
            src={selectedImage}
            alt=""
          />
        )}
      </div>

      {/* thumbnails */}
      <div
        className={cn(
          "flex gap-3 md:flex-col h-[100px] md:h-[400px] lg:h-[500px]",
          "md:w-[120px] lg:w-[140px]"
        )}
      >
        {thumbnailSlots.map((productImage, idx) =>
          isLoading ? (
            <Skeleton
              key={idx}
              className="flex-1 w-full rounded-xl bg-slate-300"
            />
          ) : productImage.length > 0 ? (
            <div
              key={productImage}
              className={cn(
                "flex-1 cursor-pointer rounded-xl border-2 transition-colors overflow-hidden",
                selectedImage === productImage
                  ? "border-yellow-500"
                  : "border-transparent hover:border-yellow-500"
              )}
              onClick={() => handleSelectImage(productImage)}
            >
              <img
                className="h-full w-full object-cover rounded-xl"
                src={productImage}
                alt=""
              />
            </div>
          ) : (
            <Skeleton
              key={`skeleton-${idx}`}
              className="flex-1 w-full rounded-xl bg-slate-100"
            />
          )
        )}
      </div>
    </div>
  );
}

export default ProductImages;

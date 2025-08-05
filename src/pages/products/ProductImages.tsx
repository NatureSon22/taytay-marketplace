import productImage1 from "@/assets/running-shoes.webp";
import productImage2 from "@/assets/Frame 32 (2).png";
import productImage3 from "@/assets/Frame 32 (3).png";
import productImage4 from "@/assets/Frame 32 (4).png";
import { Fragment, useState } from "react";

type ProductImagesProps = {
  images: string[];
};

function ProductImages() {
  const [productImages, setProductImages] = useState([
    productImage1,
    productImage2,
    productImage3,
    productImage4,
  ]);
  const [selectedImage, setSelectedImage] = useState(productImage1);

  const handleSelectImage = (newSelectedImage: string) => {
    setProductImages((prev) => {
      const remainingImages = prev.filter(
        (img) => img !== newSelectedImage && img !== selectedImage
      );

      const updatedImages = [
        newSelectedImage,
        ...remainingImages,
        selectedImage,
      ];

      setSelectedImage(newSelectedImage);

      // return the new images
      return updatedImages;
    });
  };

  return (
    <div className="space-y-3 md:space-y-0 md:flex md:flex-row-reverse md:gap-3 lg:flex-row-reverse">
      {/* main image */}
      <div className="h-[300px] rounded-xl md:h-[400px] lg:h-[500px] lg:w-[400px] xl:w-[500px] overflow-hidden">
        <img
          className="h-full w-full object-cover rounded-xl hover:scale-110 transition-transform duration-150"
          src={selectedImage}
          alt=""
        />
      </div>

      <div className="flex gap-3 h-[100px] md:w-[150px] md:flex-col md:h-[125px] lg:w-[170px] lg:h-[158px]">
        {productImages.map((productImage) => {
          return selectedImage !== productImage ? (
            <div
              className="h-full cursor-pointer rounded-xl border-2 border-transparent hover:border-500 transition-colors"
              key={productImage}
              onClick={() => handleSelectImage(productImage)}
            >
              <img
                className="h-full w-full object-cover rounded-xl"
                src={productImage}
                alt=""
              />
            </div>
          ) : (
            <Fragment key={productImage}></Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default ProductImages;

import { Input } from "@/components/ui/input";
import type { FormSection } from "./ProductForm";
import ProductImagePreview from "./ProductImagePreview";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useRef, useState } from "react";
import { ImageUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ListItem } from "@/components/ListItem";

const MAX_IMAGES_COUNT = 4;

const ProductImages = ({ form, isPending }: FormSection) => {
  const [prevImageURL, setPrevImageURL] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isMaxImagesReached, setIsMaxImagesReached] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const initialized = useRef(false);
  const watchedPictures = form.watch("productPictures");

  useEffect(() => {
    if (initialized.current) return;
    if (!watchedPictures || watchedPictures.length === 0) return;

    const isValid = watchedPictures.every(
      (img) => img instanceof File || typeof img === "string"
    );
    if (!isValid) return;

    setImages(watchedPictures);
    initialized.current = true;
  }, [watchedPictures]);

  const selectImage = () => {
    if (isMaxImagesReached) return;

    const currentImages = inputRef.current?.files;
    if (currentImages && currentImages.length > 0) {
      const filesArray = Array.from(currentImages);

      setImages((prev) => {
        const updatedImages = [...prev, ...filesArray].slice(
          0,
          MAX_IMAGES_COUNT
        );

        form.setValue("productPictures", updatedImages);
        setIsMaxImagesReached(updatedImages.length >= MAX_IMAGES_COUNT);

        return updatedImages;
      });
    }
  };

  const previewImage = (image: File) => {
    if (isPending) return;

    setPrevImageURL(URL.createObjectURL(image));
    setIsPreviewOpen(true);
  };

  const removeImage = (fileName: string) => {
    const updated = images.filter((img) => img.name !== fileName);
    setImages(updated);
    form.setValue("productPictures", updated);
    setIsMaxImagesReached(updated.length >= MAX_IMAGES_COUNT);
  };

  const clickUploadImage = () => {
    if (inputRef.current && !isPending) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <ProductImagePreview
        prevImageURL={prevImageURL}
        isPreviewOpen={isPreviewOpen}
        setIsPreviewOpen={setIsPreviewOpen}
      />

      <Input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={selectImage}
        multiple={true}
        accept="image/jpeg, image/jpg, image/png"
      />
      <FormField
        control={form.control}
        name="productPictures"
        render={() => (
          <FormItem>
            <FormLabel>Product pictures</FormLabel>
            <FormControl>
              <div
                className="bg-slate-100 border-2 border-dashed rounded-[5px] h-[150px] grid place-items-center-safe cursor-pointer"
                onClick={isMaxImagesReached ? () => {} : clickUploadImage}
              >
                <div className="grid place-items-center gap-1">
                  <ImageUpIcon className="size-8 text-slate-500" />
                  <p
                    className={cn(
                      "text-[0.78rem]",
                      isMaxImagesReached
                        ? "font-semibold text-slate-500"
                        : "text-slate-400"
                    )}
                  >
                    {isMaxImagesReached
                      ? "Maximum images reached"
                      : "Upload image"}
                  </p>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div
        className={cn("flex flex-wrap gap-7", images.length > 0 ? "mt-3" : "")}
      >
        {images.map((image) => (
          <ListItem
            key={image.name}
            label={image.name}
            onPrimary={() => previewImage(image)}
            onRemove={() => removeImage(image.name)}
            disabled={isPending}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

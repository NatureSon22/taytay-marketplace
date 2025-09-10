import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ComboBox from "@/components/ComboBox";
import { useRef, useState } from "react";
import { ImageUpIcon, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListItem } from "@/components/ListItem";
import ProductImagePreview from "./ProductImagePreview";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/api/products";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

const formSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  productPrice: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(1, { message: "Product price is required" })
  ),
  productDescription: z
    .string()
    .min(1, { message: "Product description is required" }),
  productPictures: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one picture is required" }),
  categories: z.array(z.string()).optional(),
  types: z.array(z.string()).optional(),
  links: z
    .array(
      z.object({
        platform: z.string(),
        url: z.url("Invalid url"),
      })
    )
    .optional(),
});

type FormDataType = z.infer<typeof formSchema>;
const MAX_IMAGES_COUNT = 4;

function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [prevImageURL, setPrevImageURL] = useState("");
  const [isMaxImagesReached, setIsMaxImagesReached] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const form = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      productPrice: 0,
      categories: [],
      types: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: ({ message }) => {
      toast.success(message);
      navigate("/account/store");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const selectCategory = (category: string) => {
    // const formCategories = form.getValues("categories") ?? [];
    // form.setValue("categories", [...formCategories, category], {
    //   shouldValidate: true,
    // });
    setCategories((prev) => [...prev, category]);
  };

  const selectType = (type: string) => {
    // const formTypes = form.getValues("types") ?? [];
    // form.setValue("types", [...formTypes, category], {
    //   shouldValidate: true,
    // });
    setTypes((prev) => [...prev, type]);
  };

  const clickUploadImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

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
    setPrevImageURL(URL.createObjectURL(image));
    setIsPreviewOpen(true);
  };

  const removeImage = (fileName: string) => {
    setImages((prev) => prev.filter((img) => img.name !== fileName));
    setIsMaxImagesReached(images.length > MAX_IMAGES_COUNT);
  };

  const onSubmit = (data: FormDataType) => {
    const payload = new FormData();

    payload.append("productName", data.productName);
    payload.append("productPrice", String(data.productPrice));
    payload.append("productDescription", data.productDescription);

    images.map((image: File) => {
      payload.append("images[]", image);
    });

    // categories.map((category: string) => {
    //   form.append("categories[]", category);
    // });

    // types.map((type: string) => {
    //   form.append("types[]", type);
    // });
    mutate(payload);
  };

  return (
    <div className="flex-1 space-y-5">
      <Button variant={"secondary"}>
        <ChevronLeft />
        Back
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none h-[150px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem>
                <FormLabel>Product category</FormLabel>
                <FormControl>
                  <ComboBox
                    items={[]}
                    term="category"
                    selectItem={selectCategory}
                    enableSearch={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="types"
            render={() => (
              <FormItem>
                <FormLabel>Product type</FormLabel>
                <FormControl>
                  <ComboBox
                    items={[]}
                    term="type"
                    selectItem={selectType}
                    enableSearch={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

            <div className="mt-3 flex flex-wrap gap-7">
              {images.map((image) => (
                <ListItem
                  key={image.name}
                  label={image.name}
                  onPrimary={() => previewImage(image)}
                  onRemove={() => removeImage(image.name)}
                />
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <Button className="bg-100" type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Adding product
                  </>
                ) : (
                  <p>Add product</p>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateProduct;

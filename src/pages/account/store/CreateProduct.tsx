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
import ComboBox, { type SelectOption } from "@/components/ComboBox";
import { useRef, useState } from "react";
import { ImageUpIcon, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListItem } from "@/components/ListItem";
import ProductImagePreview from "./ProductImagePreview";
import { useMutation, useQueries } from "@tanstack/react-query";
import { createProduct } from "@/api/products";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { getCategories } from "@/api/categories";
import useStoreState from "@/stores/useStoreState";
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import { getProductTypes } from "@/api/productTypes";

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
  categories: z
    .array(z.string())
    .min(1, "At least one category is required")
    .max(5, "You can select up to 5 categories"),
  types: z
    .array(z.string())
    .min(1, "At least one type is required")
    .max(5, "You can select up to 5 types"),
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
  const { store } = useStoreState();
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
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
      productPictures: [],
    },
  });

  const [{ data: productCategories = [] }, { data: productTypes = [] }] =
    useQueries({
      queries: [
        {
          queryKey: ["product-categories", store?._id],
          queryFn: () => getCategories(store!._id),
          select: (data) =>
            formatComboBoxItem(
              data as Record<string, unknown>[],
              "_id",
              "label"
            ),
          enabled: !!store,
        },
        {
          queryKey: ["product-types", store?._id],
          queryFn: () => getProductTypes(store!._id),
          select: (data) =>
            formatComboBoxItem(
              data as Record<string, unknown>[],
              "_id",
              "label"
            ),
          enabled: !!store,
        },
      ],
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

  const clickBackButton = () => {
    navigate(-1);
  };

  const clickUploadImage = () => {
    if (inputRef.current && !isPending) {
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

  const addCategory = ({ id, label }: SelectOption) => {
    const existing = categories.some((category) => category === label);

    if (existing) return;

    form.setValue("categories", [...form.getValues("categories"), id]);
    form.trigger("categories");
    setCategories((prev) => [...prev, label]);
  };

  const removeCategory = (id: string, label: string) => {
    const updatedIds = form
      .getValues("categories")
      .filter((categoryId) => categoryId !== id);
    const updatedLabels = categories.filter(
      (categoryLabel) => categoryLabel !== label
    );

    form.setValue("categories", updatedIds);
    setCategories(updatedLabels);
  };

  const addType = ({ id, label }: SelectOption) => {
    const existing = types.some((type) => type === label);

    if (existing) return;

    form.setValue("types", [...form.getValues("types"), id]);
    form.trigger("types");
    setTypes((prev) => [...prev, label]);
  };

  const removeType = (id: string, label: string) => {
    const updatedIds = form
      .getValues("types")
      .filter((typeId) => typeId !== id);
    const updatedLabels = types.filter((typeLabel) => typeLabel !== label);

    form.setValue("types", updatedIds);
    setTypes(updatedLabels);
  };

  const previewImage = (image: File) => {
    if (isPending) return;

    setPrevImageURL(URL.createObjectURL(image));
    setIsPreviewOpen(true);
  };

  const removeImage = (fileName: string) => {
    setImages((prev) => prev.filter((img) => img.name !== fileName));
    setIsMaxImagesReached(images.length > MAX_IMAGES_COUNT);
  };

  const onSubmit = (data: FormDataType) => {
    if (!store) return;

    const payload = new FormData();

    payload.append("productName", data.productName);
    payload.append("productPrice", String(data.productPrice));
    payload.append("productDescription", data.productDescription);
    payload.append("storeId", store._id);

    images.map((image: File) => {
      payload.append("images[]", image);
    });

    data.categories.map((category: string) => {
      payload.append("categories[]", category);
    });

    data.types.map((type: string) => {
      payload.append("types[]", type);
    });

    mutate(payload);
  };

  return (
    <div className="flex-1 space-y-5">
      <Button variant={"secondary"} onClick={clickBackButton}>
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
                  <Input disabled={isPending} {...field} />
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
                  <Textarea
                    disabled={isPending}
                    {...field}
                    className="resize-none h-[150px]"
                  />
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
                  <Input disabled={isPending} type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product category</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <ComboBox
                      items={productCategories}
                      term="category"
                      selectItem={addCategory}
                      enableSearch={false}
                      selectionType="pair"
                      disabled={isPending}
                    />

                    <div className="flex items-center flex-wrap gap-3">
                      {categories.map((category) => {
                        return (
                          <ListItem
                            key={category}
                            label={category}
                            onRemove={() =>
                              removeCategory(field.value[0], category)
                            }
                            disabled={isPending}
                          />
                        );
                      })}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="types"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product type</FormLabel>
                <FormControl>
                  <div className="">
                    <ComboBox
                      items={productTypes}
                      term="type"
                      selectItem={addType}
                      enableSearch={false}
                      selectionType="pair"
                      disabled={isPending}
                    />

                    <div
                      className={cn(
                        "flex items-center flex-wrap gap-3",
                        types.length > 0 ? "mt-2" : ""
                      )}
                    >
                      {types.map((type) => {
                        return (
                          <ListItem
                            key={type}
                            label={type}
                            onRemove={() => removeType(field.value[0], type)}
                            disabled={isPending}
                          />
                        );
                      })}
                    </div>
                  </div>
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
                  disabled={isPending}
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

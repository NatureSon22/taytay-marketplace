import { useForm } from "react-hook-form";
import z from "zod";
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
import { getAllCategoriesForStore } from "@/api/categories";
import useStoreState from "@/stores/useStoreState";
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import { getAllProductTypesForStore } from "@/api/productTypes";

const link = z.object({
  _id: z.string().optional(),
  platform: z.string(),
  url: z.url("Invalid url"),
  isDeleted: z.boolean().catch(false),
  platformName: z.string(),
});

const formSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  productPrice: z.string().nonempty("Product price is required"),
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
  links: z.array(link).min(1, "At least one link is required"),
});

type FormDataType = z.infer<typeof formSchema>;
type LinkType = z.infer<typeof link>;
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
  const [selectedAccount, setSelectedAccount] = useState<SelectOption>(
    {} as SelectOption
  );
  const [productLink, setProductLink] = useState("");

  const form = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      productPrice: "0",
      categories: [],
      types: [],
      productPictures: [],
      links: [],
    },
  });

  const [{ data: productCategories = [] }, { data: productTypes = [] }] =
    useQueries({
      queries: [
        {
          queryKey: ["product-categories", store?._id],
          queryFn: () => getAllCategoriesForStore(store!._id),
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
          queryFn: () => getAllProductTypesForStore(store!._id),
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

  const addProductLink = () => {
    if (!productLink.trim()) return;

    const productLinks = [
      ...(form.getValues("links") || []),
      {
        platform: selectedAccount.id,
        url: productLink.trim(),
        isDeleted: false,
        platformName: selectedAccount.label,
      } as LinkType,
    ];

    form.setValue("links", productLinks);
    form.trigger("links");
    setProductLink("");
    setSelectedAccount({} as SelectOption);

    console.log(productLinks);
  };

  const editProductLink = (platform: string, value: string) => {
    const updatedProductLinks = form
      .getValues("links")
      ?.map((link: LinkType) => {
        return link.platform === platform ? { ...link, url: value } : link;
      });

    form.setValue("links", updatedProductLinks);
  };

  const removeProductLink = (platform: string) => {
    console.log(platform);
    const currentLinks = form.getValues("links") || [];

    const updatedProductLinks = currentLinks
      .map((link: LinkType) => {
        // If it's a persisted link (has _id), just mark it deleted
        if (link.platform === platform && link._id) {
          return { ...link, isDeleted: true };
        }
        return link;
      })
      // Filter out any *new* (client-side only) links that match the platform
      .filter((link: LinkType) => {
        if (!link._id && link.platform === platform) return false;
        return true;
      });

    form.setValue("links", updatedProductLinks);
  };

  const onSubmit = (data: FormDataType) => {
    console.log("send");

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

    data.links?.forEach((link, index) => {
      payload.append(`links[${index}][platform]`, link.platform);
      payload.append(`links[${index}][url]`, link.url);
      payload.append(`links[${index}][isDeleted]`, String(link.isDeleted));
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
                  <div className="">
                    <ComboBox
                      items={productCategories}
                      term="category"
                      selectItem={addCategory}
                      enableSearch={false}
                      selectionType="pair"
                      disabled={isPending}
                    />

                    <div
                      className={cn(
                        "flex items-center flex-wrap gap-3",
                        categories.length > 0 ? "mt-3" : ""
                      )}
                    >
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
                        types.length > 0 ? "mt-3" : ""
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

            <div
              className={cn(
                "flex flex-wrap gap-7",
                images.length > 0 ? "mt-3" : ""
              )}
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

          <FormField
            control={form.control}
            name="links"
            render={() => (
              <FormItem>
                <FormLabel>Product type</FormLabel>
                <FormControl>
                  <div className="grid gap-7">
                    <div className="flex flex-col gap-2 md:flex-row">
                      <div className="md:min-w-[200px]">
                        <ComboBox
                          items={formatComboBoxItem(
                            store?.linkedAccounts || [],
                            "platform",
                            "platformName"
                          )}
                          term="type"
                          selectItem={setSelectedAccount}
                          enableSearch={false}
                          selectionType="pair"
                          value={selectedAccount.id}
                          disabled={isPending}
                        />
                      </div>

                      <div className="flex items-center gap-2 md:items-stretch">
                        <Input
                          className="flex-1 py-[5.5px] md:h-full min-w-[300px]"
                          value={productLink}
                          onChange={(e) => setProductLink(e.target.value)}
                          placeholder="Product link"
                        />
                        <Button
                          className="h-full"
                          type="button"
                          onClick={addProductLink}
                          disabled={!productLink || !selectedAccount}
                        >
                          Add Link
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      {form
                        .watch("links")
                        ?.filter((link) => !link.isDeleted)
                        .map((link: LinkType) => (
                          <div
                            key={link.platform}
                            className="flex items-stretch gap-3"
                          >
                            <span className="text-slate-500 font-medium my-auto sm:min-w-[90px]">
                              {link.platformName}
                            </span>

                            <div className="h-full flex-1 md:max-w-[500px] flex">
                              <Input
                                value={link.url}
                                onChange={(e) =>
                                  editProductLink(link.platform, e.target.value)
                                }
                                className="h-full"
                              />
                            </div>

                            <Button
                              type="button"
                              className="mr-auto py-4"
                              variant={"destructive"}
                              onClick={() => removeProductLink(link.platform)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </form>
      </Form>
    </div>
  );
}

export default CreateProduct;

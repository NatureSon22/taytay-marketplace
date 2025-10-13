import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  getProductDetails,
  updateProduct,
} from "@/api/products";
import { toast } from "sonner";
import ProductForm from "./ProductForm";
import useStoreState from "@/stores/useStoreState";
import { useEffect } from "react";
import urlToFile from "@/utils/urlToFile";

const link = z.object({
  _id: z.string().optional(),
  platform: z.string().optional(),
  url: z
    .string()
    .trim()
    .refine(
      (val) =>
        !val ||
        /^https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(
          val
        ),
      "Invalid URL format"
    ),
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

export type FormDataType = z.infer<typeof formSchema>;
export type LinkType = z.infer<typeof link>;

function CreateProduct() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const navigate = useNavigate();
  const { store } = useStoreState();

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

  const { data } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProductDetails(id as string),
    enabled: isEdit, // <— clearer
  });

  useEffect(() => {
    if (!data) return;

    async function initializeForm() {
      const files = await Promise.all(
        (data?.productPictures || []).map((url: string) => urlToFile(url))
      );

      form.reset({
        productName: data?.productName || "",
        productDescription: data?.productDescription || "",
        productPrice: data?.productPrice || "0",
        categories: data?.categories ?? [],
        types: data?.types ?? [],
        productPictures: files ?? [],
        links: data?.links ?? [],
      });
    }

    initializeForm();
  }, [data, form]);

  const clickBackButton = () => navigate(-1);

  const { mutate: onCreateProduct, isPending: createProductLoading } =
    useMutation({
      mutationFn: createProduct,
      onSuccess: ({ message }) => {
        toast.success(message);
        navigate("/account/store");
      },
      onError: (error) => toast.error(error.message),
    });

  const { mutate: onEditProduct, isPending: editProductLoading } = useMutation({
    mutationFn: (data: FormData) => updateProduct(data, id!),
    onSuccess: ({ message }) => {
      toast.success(message);
      navigate("/account/store");
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = (data: FormDataType) => {
    if (!store) return;

    const payload = new FormData();
    payload.append("productName", data.productName);
    payload.append("productPrice", String(data.productPrice));
    payload.append("productDescription", data.productDescription);
    payload.append("storeId", store._id);

    data.productPictures.forEach((image) => payload.append("images[]", image));
    data.categories.forEach((c) => payload.append("categories[]", c));
    data.types.forEach((t) => payload.append("types[]", t));

    data.links.forEach((link, index) => {
      payload.append(`links[${index}][platform]`, link.platform!);
      payload.append(`links[${index}][url]`, link.url);
    });

    if (isEdit) onEditProduct(payload);
    else onCreateProduct(payload);
  };

  return (
    <div className="flex-1 space-y-5">
      <Button variant="secondary" onClick={clickBackButton}>
        <ChevronLeft />
        Back
      </Button>

      <ProductForm
        form={form}
        onSubmit={onSubmit}
        isPending={createProductLoading || editProductLoading}
        isEdit={isEdit}
      />
    </div>
  );
}

export default CreateProduct;

import type { UseFormReturn } from "react-hook-form";
import type { FormDataType } from "./CreateProduct";
import { Form } from "@/components/ui/form";
import ProductInfo from "./ProductInfo";
import SubmitButton from "./SubmitButton";
import ProductCategories from "./ProductCategories";
import ProductTypes from "./ProductTypes";
import ProductImages from "./ProductImages";
import ProductLinks from "./ProductLinks";

type ProductFormProps = {
  form: UseFormReturn<FormDataType>;
  onSubmit: (data: FormDataType) => void;
  isPending: boolean;
  isEdit: boolean;
};

export type FormSection = {
  form: UseFormReturn<FormDataType>;
  isPending: boolean;
};

function ProductForm({ form, onSubmit, isPending, isEdit }: ProductFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <ProductInfo form={form} isPending={isPending} />
        <ProductCategories form={form} isPending={isPending} />
        <ProductTypes form={form} isPending={isPending} />
        <ProductImages form={form} isPending={isPending} />
        <ProductLinks form={form} isPending={isPending} />

        <SubmitButton isPending={isPending} isEdit={isEdit} />
      </form>
    </Form>
  );
}

export default ProductForm;

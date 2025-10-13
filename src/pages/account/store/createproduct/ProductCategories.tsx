import { useQuery } from "@tanstack/react-query";
import type { FormSection } from "./ProductForm";
import useStoreState from "@/stores/useStoreState";
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import { getAllCategoriesForStore } from "@/api/categories";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ComboBox, { type SelectOption } from "@/components/ComboBox";
import { ListItem } from "@/components/ListItem";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function ProductCategories({ form, isPending }: FormSection) {
  const { store } = useStoreState();
  const [categories, setCategories] = useState<string[]>([]);

  const { data: productCategories = [] } = useQuery({
    queryKey: ["product-categories", store?._id],
    queryFn: () => getAllCategoriesForStore(store!._id),
    select: (data) =>
      formatComboBoxItem(data as Record<string, unknown>[], "_id", "label"),
    enabled: !!store,
  });

  const initialized = useRef(false);
  const watchedCategories = form.watch("categories");

  useEffect(() => {
    if (
      initialized.current ||
      !productCategories.length ||
      !watchedCategories?.length
    )
      return;

    const initialLabels = watchedCategories
      .map((id) => productCategories.find((item) => item.value === id)?.label)
      .filter((label): label is string => Boolean(label));

    setCategories(initialLabels);
    initialized.current = true;
  }, [watchedCategories, productCategories]);

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

  return (
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
                      onRemove={() => removeCategory(field.value[0], category)}
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
  );
}

export default ProductCategories;

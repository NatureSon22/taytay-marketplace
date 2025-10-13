import useStoreState from "@/stores/useStoreState";
import type { FormSection } from "./ProductForm";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProductTypesForStore } from "@/api/productTypes";
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ComboBox, { type SelectOption } from "@/components/ComboBox";
import { ListItem } from "@/components/ListItem";
import { cn } from "@/lib/utils";

function ProductTypes({ form, isPending }: FormSection) {
  const { store } = useStoreState();
  const [types, setTypes] = useState<string[]>([]);

  const { data: productTypes = [] } = useQuery({
    queryKey: ["product-types", store?._id],
    queryFn: () => getAllProductTypesForStore(store!._id),
    select: (data) =>
      formatComboBoxItem(data as Record<string, unknown>[], "_id", "label"),
    enabled: !!store,
  });

  const initialized = useRef(false);
  const watchedTypes = form.watch("types");

  useEffect(() => {
    if (initialized.current || !productTypes.length || !watchedTypes?.length)
      return;

    const initialLabels = watchedTypes
      .map((id) => productTypes.find((item) => item.value === id)?.label)
      .filter((label): label is string => Boolean(label));

    setTypes(initialLabels);
    initialized.current = true;
  }, [watchedTypes, productTypes]);

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

  return (
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
  );
}

export default ProductTypes;

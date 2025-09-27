import { zodResolver } from "@hookform/resolvers/zod";
import { useEditableState } from "@/hooks/useEditableState";
import InfoCard from "@/layouts/InfoCard";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ListItem } from "@/components/ListItem";
import useStoreState from "@/stores/useStoreState";
import { useForm } from "react-hook-form";
import { Form, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import type { Store } from "@/types";
import { updateStoreData } from "@/api/store";
import SaveButton from "@/components/SaveButton";
import type { Category } from "@/types/store";

const formSchema = z.object({
  categories: z
    .array(
      z.object({
        _id: z.string().optional(),
        label: z.string().min(1, { message: "Category cannot be empty" }),
      })
    )
    .min(1, { message: "Categories cannot be empty" }),
});

type FormData = z.infer<typeof formSchema>;

function Categories() {
  const { isEditing, enableEditing, disableEditing, toggleEditing } =
    useEditableState();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { store, setStore } = useStoreState();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
    },
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (payload: Partial<Store>) => {
      if (!store) throw new Error("Store is empty");
      return updateStoreData(payload, store._id);
    },
    onSuccess: (data) => {
      console.log(data.categories);
      setStore(data);
    },
    onSettled: () => {
      setCategory("");
      setCategories([]);
      toggleEditing();
      form.reset();
    },
  });

  useEffect(() => {
    if (!store) return;
    form.setValue("categories", store.categories);
  }, [form, store, store?.categories]);

  const addCategory = () => {
    const newCategory = { label: category.trim() };
    if (!newCategory.label) return;

    // form.setValue("categories", [
    //   ...(form.getValues("categories") || []),
    //   newCategory,
    // ]);

    setCategories((prev) => [...prev, newCategory]);
    setCategory("");
  };

  const onRemove = (label: string) => {
    const updatedCategories = categories.filter(
      (category) => category.label !== label
    );

    setCategories(updatedCategories);
  };

  const editCategory = (id: string, value: string) => {
    if (!id) return;

    const updatedCategories = form.getValues("categories").map((category) => {
      return category._id === id ? { ...category, label: value } : category;
    });

    form.setValue("categories", updatedCategories);
  };

  const disableActions = () => {
    setCategory("");
    setCategories([]);
    toggleEditing();
    form.reset();
  };

  const onSubmit = () => {
    const payload: Partial<Store> = {
      categories: categories,
    };

    mutate(payload);
  };

  return (
    <InfoCard
      header="Product Categories"
      isEditing={isEditing}
      enableEditing={enableEditing}
      disableEditing={disableEditing}
      disableActions={disableActions}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {isEditing ? (
            <>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    className="h-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    placeholder="Enter new category"
                  />
                  <Button
                    type="button"
                    onClick={addCategory}
                    disabled={!category.trim()}
                  >
                    Add Category
                  </Button>
                </div>

                <div className="flex gap-3">
                  {categories?.map((c, idx) => (
                    <ListItem
                      key={`${c.label}-${idx}`}
                      label={c.label}
                      onRemove={() => onRemove(c.label)}
                      disabled={false}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {form.watch("categories")?.map((category) => {
                  return (
                    <div className="flex gap-4" key={category.label}>
                      <Input
                        className="h-full"
                        value={category.label}
                        onChange={(e) =>
                          editCategory(category._id || "", e.target.value)
                        }
                      />

                      <div className="flex gap-2">
                        <Button>Edit</Button>
                        <Button variant={"destructive"}>Remove</Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <FormMessage />

              <SaveButton isEditing={isEditing} isSaving={isSaving} />
            </>
          ) : (
            <div className="flex w-min"></div>
          )}
        </form>
      </Form>
    </InfoCard>
  );
}

export default Categories;

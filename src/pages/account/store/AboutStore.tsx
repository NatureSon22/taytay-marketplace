import { useEditableState } from "@/hooks/useEditableState";
import InfoCard from "@/layouts/InfoCard";
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
import SaveButton from "@/components/SaveButton";
import RichTextEditor from "@/pages/admindashboard/Settings/General/RichTextEditor";
import parse from "html-react-parser";
import useStoreState from "@/stores/useStoreState";
import { useMutation } from "@tanstack/react-query";
import { updateStoreData } from "@/api/store";
import { toast } from "sonner";
import type { Store } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
});

type FormData = z.infer<typeof formSchema>;

function AboutStore() {
  const { isEditing, enableEditing, disableEditing, toggleEditing } =
    useEditableState();
  const { store, setStore } = useStoreState();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (store?.description) {
      form.setValue("description", store.description);
    }
  }, [store?.description, form.setValue]);

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (payload: Partial<Store>) => {
      if (!store) throw new Error("Store is empty");
      return updateStoreData(payload, store._id);
    },
    onSuccess: (data) => {
      setStore(data);
      toast.success("Store description updated successfully ");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toggleEditing();
      form.reset();
    },
  });

  const onSubmit = (data: FormData) => {
    mutate({ description: data.description });
  };

  return (
    <InfoCard
      header="About"
      isEditing={isEditing}
      enableEditing={enableEditing}
      disableEditing={disableEditing}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  {isEditing ? (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  ) : store?.description ? (
                    <div>{parse(store.description)}</div>
                  ) : (
                    <p className="text-slate-400">
                      It looks like you haven’t set the store description yet
                    </p>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SaveButton isEditing={isEditing} isSaving={isSaving} />
        </form>
      </Form>
    </InfoCard>
  );
}

export default AboutStore;

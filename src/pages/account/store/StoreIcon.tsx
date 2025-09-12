import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEditableState } from "@/hooks/useEditableState";
import InfoCard from "@/layouts/InfoCard";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useStoreState from "@/stores/useStoreState";
import { Input } from "@/components/ui/input";
import storeImgPlaceholder from "@/assets/storeplaceholder.png";
import { useState } from "react";
import SaveButton from "@/components/SaveButton";
import { useMutation } from "@tanstack/react-query";
import { updateStoreIcon } from "@/api/store";
import { toast } from "sonner";

const FILESIZE_LIMIT = 5 * 1024 * 1024;

const formSchema = z.object({
  profilePicture: z
    .instanceof(File, { message: "Profile image is required" })
    .refine((file) => file.size <= FILESIZE_LIMIT, {
      message: "Image size should not exceed 5MB",
    }),
});

type FormDataSchema = z.infer<typeof formSchema>;

function StoreIcon() {
  const { isEditing, enableEditing, disableEditing, toggleEditing } =
    useEditableState();
  const { store, setStore } = useStoreState();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (payload: FormData) => {
      if (!store) throw new Error("Store is empty");
      return updateStoreIcon(payload, store._id);
    },
    onSuccess: (data) => {
      setStore(data);
      toast.success("Store icon updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toggleEditing();
      setPreview(null);
    },
  });

  const uploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: unknown) => void }
  ) => {
    const file = e.target.files?.[0] || null;
    field.onChange(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue("profilePicture", file);
    }
  };

  const cancelImage = () => {
    setPreview(null);
    form.resetField("profilePicture");
  };

  const onSubmit = (data: FormDataSchema) => {
    if (!store) return;

    const formData = new FormData();
    formData.append("id", store._id);
    formData.append("profilePicture", data.profilePicture);

    mutate(formData);
  };

  return (
    <InfoCard
      header="Store Icon"
      isEditing={isEditing}
      enableEditing={enableEditing}
      disableEditing={disableEditing}
      disableActions={cancelImage}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <div>
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    {!isEditing ? (
                      <div className="size-40 rounded-full border border-slate-300">
                        <img
                          className="rounded-full object-cover w-full h-full"
                          src={store?.profilePicture || storeImgPlaceholder}
                        />
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <Input
                          type="file"
                          accept="image/jpeg, image/jpg, image/png"
                          onChange={(e) => uploadImage(e, field)}
                        />

                        {preview && (
                          <div className="gr_id w-min">
                            <p className="text-center text-slate-400 font-semibold">
                              Image preview
                            </p>
                            <div className="mt-2 size-40 rounded-full border border-slate-300 overflow-h_idden">
                              <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover border border-slate-300 rounded-[5px]"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SaveButton isEditing={isEditing} isSaving={isSaving} />
        </form>
      </Form>
    </InfoCard>
  );
}

export default StoreIcon;

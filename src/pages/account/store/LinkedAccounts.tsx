import { getLinkedAccounts } from "@/api/linkedAccounts";
import ComboBox from "@/components/ComboBox";
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
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SaveButton from "@/components/SaveButton";
import { Input } from "@/components/ui/input";
import useStoreState from "@/stores/useStoreState";
import type { Store } from "@/types";
import { updateStoreData } from "@/api/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  platform: z.string().min(1, { message: "Please select an account platform" }),
  url: z
    .url({ message: "Not a valid link" })
    .refine((val) => val.startsWith("https://"), {
      message: "Only HTTPS links are allowed",
    }),
});

type FormData = z.infer<typeof formSchema>;

function LinkedAccounts() {
  const { isEditing, enableEditing, disableEditing, toggleEditing } =
    useEditableState();
  const { store, setStore } = useStoreState();
  const [existing, setExisting] = useState(false);

  const { data: accountOptions = [] } = useQuery({
    queryKey: ["accounts"],
    queryFn: getLinkedAccounts,
    select: (data) => formatComboBoxItem(data, "_id", "label"),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "",
      url: "",
    },
  });
  const platform = form.watch("platform");

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (payload: Partial<Store>) => {
      if (!store) throw new Error("Store is empty");
      return updateStoreData(payload, store._id);
    },
    onSuccess: (data) => {
      setStore(data);
      toast.success("Linked accounts updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      form.reset();
      toggleEditing();
      setExisting(false);
    },
  });

  useEffect(() => {
    if (!platform) return;

    const existingUrl = store?.linkedAccounts?.find(
      (account) => account.platform === platform
    )?.url;

    form.setValue("url", existingUrl ?? "");
    setExisting(Boolean(existingUrl));
  }, [platform, form, store]);

  const removePlatform = () => {
    if (!platform || !store) return;

    const updatedAccounts =
      store.linkedAccounts?.map((acc) =>
        acc.platform === platform ? { ...acc, isDeleted: true } : acc
      ) || [];

    mutate({ linkedAccounts: updatedAccounts });
  };

  const disableActions = () => {
    form.reset();
    setExisting(false);
  };

  const onSubmit = (data: FormData) => {
    const payload: Partial<Store> = {
      linkedAccounts: [
        {
          platform: data.platform,
          url: data.url,
        },
      ],
    };

    mutate(payload);
  };

  return (
    <InfoCard
      header="Linked Accounts"
      isEditing={isEditing}
      enableEditing={enableEditing}
      disableEditing={disableEditing}
      disableActions={disableActions}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          {isEditing ? (
            <>
              <div className="flex gap-6 items-start">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem className="flex-1 max-w-[200px]">
                      <FormLabel>Platform</FormLabel>
                      <FormControl>
                        <ComboBox
                          items={accountOptions}
                          term="account"
                          enableSearch={false}
                          selectItem={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="flex-1 max-w-[200px]">
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            {...field}
                            className="py-[11px]"
                            disabled={!platform}
                          />
                          {existing && (
                            <Button
                              variant={"destructive"}
                              type="button"
                              className="h-full"
                              onClick={removePlatform}
                              disabled={isSaving}
                            >
                              <Trash2 />
                              {isSaving ? (
                                <span>Removing...</span>
                              ) : (
                                <span>Remove</span>
                              )}
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          ) : (
            <>
              {store?.linkedAccounts?.length ? (
                <>
                  {store.linkedAccounts.map((account) => (
                    <div
                      key={account.platform}
                      className="flex items-center gap-2"
                    >
                      <div className="flex-1 max-w-[180px]">
                        <p className="font-bold text-300">
                          {account.platformName}
                        </p>
                      </div>

                      <a
                        href={account.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {account.url}
                      </a>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-gray-400">No linked accounts yet</p>
              )}
            </>
          )}

          <SaveButton isEditing={isEditing} isSaving={isSaving} />
        </form>
      </Form>
    </InfoCard>
  );
}

export default LinkedAccounts;

import { useEditableState } from "@/hooks/useEditableState";
import InfoCard from "@/layouts/InfoCard";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useStoreState from "@/stores/useStoreState";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import SaveButton from "@/components/SaveButton";
import { useMutation } from "@tanstack/react-query";
import { updateStoreData } from "@/api/store";
import { toast } from "sonner";
import useAccountStore from "@/stores/useAccountState";

const phoneRe = /^(09|\+639)\d{9}$/;

const formSchema = z.object({
  stallNumbers: z
    .string()
    .array()
    .min(1, { message: "At least one stall number is required" }),
  storeName: z.string().min(1, { message: "Store name is required" }),
  contactNumber: z
    .string()
    .regex(phoneRe, { message: "Valid phone is required" }),
  email: z.email({ message: "Email must be valid" }),
});

type FormData = z.infer<typeof formSchema>;

function StoreDetails() {
  const { isEditing, enableEditing, disableEditing, toggleEditing } =
    useEditableState();
  const { store, setStore } = useStoreState();
  const { sellerAccount } = useAccountStore();
  const [stallNumber, setStallNumber] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: store?.storeName || "",
      stallNumbers: store?.stallNumbers || [],
    },
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (payload: FormData) => {
      if (!store) throw new Error("Store is empty");
      return updateStoreData(payload, store._id);
    },
    onSuccess: (data) => {
      setStore(data);
      toast.success("Store details updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toggleEditing();
      setStallNumber("");
    },
  });

  useEffect(() => {
    if (store) {
      form.reset({ ...store });
    }
  }, [store, form]);

  const addStallNumber =
    (onChange: ControllerRenderProps<FormData, "stallNumbers">["onChange"]) =>
    () => {
      onChange([...form.getValues("stallNumbers"), stallNumber.trim()]);
      setStallNumber("");
    };

  const deleteStallNumber = (
    onChange: ControllerRenderProps<FormData, "stallNumbers">["onChange"],
    toDelete: string
  ) => {
    const updated = form
      .getValues("stallNumbers")
      .filter((s) => s !== toDelete);
    onChange(updated);
  };

  const disableActions = () => {
    form.reset();
  };

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <InfoCard
      header="Store Details"
      isEditing={isEditing}
      enableEditing={enableEditing}
      isSaving={false}
      disableEditing={disableEditing}
      disableActions={disableActions}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("grid", isEditing ? "gap-7" : "gap-5")}
        >
          <div
            className={cn(
              "flex-1 flex flex-col justify-between space-y-5 md:flex-row md:items-start md:space-y-0",
              isEditing ? "max-w-[550px]" : "max-w-[700px]"
            )}
          >
            <FormField
              control={form.control}
              name="stallNumbers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem]">Stall No.</FormLabel>
                  <FormControl>
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            value={stallNumber}
                            onChange={(e) => setStallNumber(e.target.value)}
                            type="number"
                          />
                          <Button
                            type={"button"}
                            onClick={addStallNumber(field.onChange)}
                            disabled={!stallNumber}
                          >
                            Add Stall
                          </Button>
                        </div>

                        <div className="flex items-center flex-wrap gap-3">
                          {field.value.map((stallNumber) => {
                            return (
                              <div
                                key={stallNumber}
                                className="flex items-center gap-2"
                              >
                                <p className="text-slate-400 font-semibold text-[0.9rem]">
                                  {stallNumber}
                                </p>

                                <Button
                                  className="cursor-pointer p-1"
                                  variant={"secondary"}
                                  type="button"
                                  onClick={() =>
                                    deleteStallNumber(
                                      field.onChange,
                                      stallNumber
                                    )
                                  }
                                >
                                  <X />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <p>{store?.stallNumbers.join(", ")}</p>
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem]">Store Name</FormLabel>
                  <FormControl>
                    {isEditing ? (
                      <Input {...field} />
                    ) : (
                      <p>{store?.storeName}</p>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div
            className={cn(
              "flex-1 flex flex-col justify-between space-y-5 md:flex-row md:items-center md:space-y-0",
              isEditing ? "max-w-[550px]" : "max-w-[700px]"
            )}
          >
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem]">Contact No.</FormLabel>
                  <FormControl>
                    {isEditing ? (
                      <Input {...field} />
                    ) : (
                      <p>{store?.contactNumber}</p>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem]">Email</FormLabel>
                  <FormControl>
                    {isEditing ? <Input {...field} /> : <p>{store?.email}</p>}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {sellerAccount?.isVerified && !isEditing && (
            <FormItem>
              <FormLabel className="text-[1rem]">Business Permit</FormLabel>
              <p className="text-300 font-semibold">Verified</p>
            </FormItem>
          )}

          <SaveButton isEditing={isEditing} isSaving={isSaving} />
        </form>
      </Form>
    </InfoCard>
  );
}

export default StoreDetails;

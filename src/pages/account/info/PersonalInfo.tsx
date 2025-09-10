import { useEditableState } from "@/hooks/useEditableState";
import InfoCard from "@/layouts/InfoCard";
import useAccountStore from "@/stores/useAccountStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useCallback, useEffect } from "react";
import calculateAge from "@/utils/calculateAge";
import { useMutation } from "@tanstack/react-query";
import { updateAccount } from "@/api/account";
import type { FullUserAccount, UserProfile } from "@/types/account";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const phoneRe = /^(09|\+639)\d{9}$/;

const formSchema = z.object({
  firstName: z.string().min(1, { message: "FirstName is required" }),
  middleName: z.string().optional().or(z.literal("")),
  lastName: z.string().min(1, { message: "lastName is required" }),
  contactNumber: z
    .string()
    .regex(phoneRe, { message: "Valid phone is required" }),
  birthday: z.coerce.date({
    message: "Birthday is required",
  }),
  age: z.coerce
    .number()
    .min(1, { message: "Age is required" })
    .max(120, { message: "Age is too high" })
    .int({ message: "Age must be a whole contactNumber" })
    .positive({ message: "Age must be a positive contactNumber" }),
  address: z.string().min(1, { message: "Address is required" }),
});

type FormData = z.infer<typeof formSchema>;

function PersonalInfo() {
  const { account, setAccount } = useAccountStore((state) => state);
  const { isEditing, enableEditing, disableEditing, toggleEditing } =
    useEditableState();

  const toFormValues = useCallback(
    () => ({
      firstName: account?.firstName ?? "",
      middleName: account?.middleName ?? "",
      lastName: account?.lastName ?? "",
      contactNumber: account?.contactNumber ?? "",
      birthday: account?.birthday ? new Date(account.birthday) : new Date(),
      age: account?.age ? Number(account.age) : 0,
      address: account?.address ?? "",
    }),
    [account]
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: toFormValues(),
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: updateAccount,
    onSuccess: (data: FullUserAccount) => {
      setAccount(data);
      toast.success("Account updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toggleEditing();
    },
  });

  useEffect(() => {
    if (!isEditing && account) {
      form.reset(toFormValues());
    }
  }, [isEditing, account, form, toFormValues]);

  const updateAge = (date: Date | null) => {
    if (!date) return;

    form.setValue("age", calculateAge(date));
  };

  const onSubmit = (data: FormData) => {
    if (!account || !account._id) return;

    const payLoad: UserProfile & {
      id: string;
    } = {
      ...data,
      id: account._id,
      birthday: data.birthday.toISOString(),
      age: String(data.age),
    };

    mutate(payLoad);
  };

  return (
    <InfoCard
      header="Personal Information"
      isEditing={isEditing}
      enableEditing={enableEditing}
      disableEditing={disableEditing}
      isSaving={isSaving}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-10">
          <div className="flex gap-24">
            <div
              className={cn(
                "space-y-3 flex-1",
                isEditing ? "max-w-[300px]" : "max-w-[220px]"
              )}
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">Firstname</FormLabel>
                    <FormControl>
                      {!isEditing ? (
                        <p>{account?.firstName}</p>
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    {(isEditing || account?.middleName) && (
                      <FormLabel className="text-[1rem]">Middlename</FormLabel>
                    )}

                    <FormControl>
                      {!isEditing ? (
                        <p>{account?.middleName}</p>
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">Birthday</FormLabel>
                    <FormControl>
                      {!isEditing ? (
                        <p>
                          {account?.birthday
                            ? new Date(account?.birthday).toLocaleDateString()
                            : ""}
                        </p>
                      ) : (
                        <Input
                          type="date"
                          {...field}
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString().split("T")[0]
                              : field.value
                          }
                          onChange={(e) => {
                            updateAge(e.target.valueAsDate);
                            field.onChange(e);
                          }}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">Address</FormLabel>
                    <FormControl>
                      {!isEditing ? (
                        <p>{account?.address}</p>
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div
              className={cn(
                "space-y-3 flex-1",
                isEditing ? "max-w-[300px]" : "max-w-[220px]"
              )}
            >
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">Lastname</FormLabel>
                    <FormControl>
                      {!isEditing ? (
                        <p>{account?.lastName}</p>
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">
                      Contact Number
                    </FormLabel>
                    <FormControl>
                      {!isEditing ? (
                        <p>{account?.contactNumber}</p>
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">Age</FormLabel>
                    <FormControl>
                      {!isEditing ? (
                        <p>{account?.age}</p>
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {isEditing && (
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-100 ml-auto py-5 px-6"
            >
              {isSaving ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  <p>Saving...</p>
                </>
              ) : (
                <p>Save</p>
              )}
            </Button>
          )}
        </form>
      </Form>
    </InfoCard>
  );
}

export default PersonalInfo;

import { useEditableState } from "@/hooks/useEditableState";
import InfoCard from "@/layouts/InfoCard";
import useAccountStore from "@/stores/useAccountState";
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
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { updateAccount } from "@/api/account";
import type { FullUserAccount, UserCredentials } from "@/types/account";
import { toast } from "sonner";
import SaveButton from "@/components/SaveButton";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" }),
    email: z.email({ message: "Email must be valid" }),
    password: z.string().trim().optional(),
    confirmPassword: z.string().trim().optional(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    const pwd = password ?? "";
    const conf = confirmPassword ?? "";
    const wantsToChange = pwd.length > 0 || conf.length > 0;

    if (!wantsToChange) return;

    if (pwd.length < 8) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password must be at least 8 characters",
      });
    }

    if (conf.length < 8) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Password must be at least 8 characters",
      });
    }

    if (pwd !== conf) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

export type FormData = z.infer<typeof formSchema>;

function AccountInfo() {
  const { account, setAccount } = useAccountStore();
  const { isEditing, enableEditing, disableEditing, toggleEditing } =
    useEditableState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: account?.username ?? "",
      email: account?.email ?? "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
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
      form.reset({
        username: account.username,
        email: account.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [isEditing, account, form]);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = (data: FormData) => {
    if (!account || !account._id) return;

    const payload: UserCredentials & { id: string } = {
      id: account._id,
      username: data.username,
      email: data.email,
    };

    if (data.password && data.password.length > 0) {
      payload.password = data.password;
    }

    mutate(payload);
  };

  return (
    <InfoCard
      header="Account Information"
      isEditing={isEditing}
      enableEditing={enableEditing}
      isSaving={isSaving}
      disableEditing={disableEditing}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div
            className={cn(
              "flex-1 flex flex-col justify-between space-y-5 md:flex-row md:items-center md:space-y-0",
              isEditing ? "max-w-[550px]" : "max-w-[700px]"
            )}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem]">Username</FormLabel>
                  <FormControl>
                    {!isEditing ? (
                      <p>{account?.username}</p>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem]">Email</FormLabel>
                  <FormControl>
                    {!isEditing ? (
                      <p>{account?.email}</p>
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
              "flex-1 flex flex-col justify-between space-y-5 md:flex-row md:items-center md:space-y-0",
              isEditing ? "max-w-[600px]" : "max-w-[700px]"
            )}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem]">Password</FormLabel>
                  <FormControl>
                    {!isEditing ? (
                      <p className="select-none break-all">
                        {account?.password}
                      </p>
                    ) : (
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        {...field}
                        suffix={
                          showPassword ? (
                            <Eye
                              className="cursor-pointer text-slate-500"
                              onClick={toggleShowPassword}
                            />
                          ) : (
                            <EyeClosed
                              className="cursor-pointer text-slate-500"
                              onClick={toggleShowPassword}
                            />
                          )
                        }
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isEditing && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        {...field}
                        suffix={
                          showConfirmPassword ? (
                            <Eye
                              className="cursor-pointer text-slate-500"
                              onClick={toggleShowConfirmPassword}
                            />
                          ) : (
                            <EyeClosed
                              className="cursor-pointer text-slate-500"
                              onClick={toggleShowConfirmPassword}
                            />
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <SaveButton isEditing={isEditing} isSaving={isSaving} />
        </form>
      </Form>
    </InfoCard>
  );
}

export default AccountInfo;

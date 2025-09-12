import { Button } from "@/components/ui/button";
import CenterLayout from "@/layouts/CenterLayout";
import ContentGrid from "@/layouts/ContentGrid";
import PadLayout from "@/layouts/PadLayout";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { LoaderCircle } from "lucide-react";
import useAccountStore from "@/stores/useAccountState";
import useStoreState from "@/stores/useStoreState";

const formSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" }),
});

type FormData = z.infer<typeof formSchema>;

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAccount } = useAccountStore();
  const { setStore } = useStoreState();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: ({ publicUser, store }) => {
      setAccount(publicUser);
      setStore(store);
      navigate("/");
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <PadLayout>
      <CenterLayout>
        <ContentGrid>
          <div>
            <Link to="/">
              <Button
                variant={"ghost"}
                className="cursor-pointer flex items-center gap-2"
              >
                <ChevronLeft />
                <span>Return to Homepage</span>
              </Button>
            </Link>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 grid place-items-center">
              <div className="w-full max-w-[500px] shadow-200 py-12 px-5 sm:px-16 sm:py-20">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-6"
                    noValidate
                  >
                    <div
                      className={cn(
                        "text-center space-y-[1px]",
                        isError ? "" : "mb-3 sm:mb-4"
                      )}
                    >
                      <p className="font-extrabold text-[1.7rem] text-100 sm:text-[2rem]">
                        Welcome
                      </p>
                      <p className="text-[0.8rem] sm:text-[0.85rem]">
                        Log in to discover exclusive products
                      </p>
                    </div>

                    {isError && error?.message && (
                      <div className="text-center bg-red-200 px-6 py-5 mb-3 rounded-xs">
                        <p className="text-[0.8rem] md:text-[0.85rem] text-red-600">
                          {error?.message}
                        </p>
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input autoComplete="username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center gap-2">
                        <Checkbox
                          className="border border-slate-400"
                          checked={showPassword}
                          onCheckedChange={(checked) =>
                            setShowPassword(checked === true)
                          }
                        />
                        <Label
                          className={cn(
                            showPassword ? "text-200" : "text-slate-400"
                          )}
                        >
                          Show Password
                        </Label>
                      </div>
                    </div>

                    <Button
                      className="bg-100 w-full py-6 text-[0.95rem]"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          Logging in
                          <LoaderCircle className="animate-spin" />
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>

                    <p className="text-[0.85rem] mt-3 flex items-center gap-2 mx-auto sm:text-[0.9rem] sm:mt-4">
                      Want to become a Seller?
                      <Link to="/register" className="font-semibold">
                        Register Now
                      </Link>
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </ContentGrid>
      </CenterLayout>
    </PadLayout>
  );
}

export default Login;

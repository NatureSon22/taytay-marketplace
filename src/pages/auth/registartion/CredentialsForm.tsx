import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import StyledText from "@/components/StyledText";
import type { FormStepProps } from "@/types";
import { useState } from "react";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" }),
    email: z.email({ message: "Email must be valid" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;
type CredentialsFormProps = FormStepProps;

function CredentialsForm({
  registrationData,
  goToNextStep,
  updateRegistrationData,
}: CredentialsFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: registrationData.username ?? "",
      email: registrationData.email ?? "",
      password: registrationData.password ?? "",
      confirmPassword: registrationData.password ?? "",
    },
  });

  const onSubmit = (values: FormData) => {
    updateRegistrationData(values);
    goToNextStep();
  };

  return (
    <div className="max-w-[500px] mx-auto shadow-100 py-9 px-7 rounded-xl md:py-14 md:px-12">
      <Form {...form}>
        <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mr-auto">
            <StyledText text="Account Information" size="" />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full border">
                <FormLabel>Password</FormLabel>

                <div className="flex gap-2 w-full items-center">
                  <FormControl className="flex-1">
                    <Input
                      className="w-full"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>

                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>

                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>

                  <Button
                    className="cursor-pointer"
                    variant={"secondary"}
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="ml-auto mt-2 cursor-poi" type="submit">
            Submit
            <MoveRight />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CredentialsForm;

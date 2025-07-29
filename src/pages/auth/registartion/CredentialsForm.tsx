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
import { MoveRight } from "lucide-react";
import StyledText from "@/components/StyledText";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" }),
    email: z.string().email({ message: "Email must be valid" }),
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

function CredentialsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
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

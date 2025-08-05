import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const phoneRe = /^(09|\+639)\d{9}$/;

const formSchema = z.object({
  firstname: z.string().min(1, { message: "Firstname is required" }),
  middlename: z.string().optional().or(z.literal("")),
  surname: z.string().min(1, { message: "Surname is required" }),
  number: z.string().regex(phoneRe, { message: "Valid phone is required" }),
  birthday: z.coerce.date({
    required_error: "Birthday is required",
    invalid_type_error: "invalid_type_error",
  }),
  age: z.coerce
    .number()
    .min(1, { message: "Age is required" })
    .max(120, { message: "Age is too high" })
    .int({ message: "Age must be a whole number" })
    .positive({ message: "Age must be a positive number" }),
  province: z.string().min(1, { message: "Province is required" }),
  municipality: z.string().min(1, { message: "Municipality is required" }),
  baranggay: z.string().min(1, { message: "Baranggay is required" }),
});

type FormData = z.infer<typeof formSchema>;

const ProfileForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      middlename: "",
      surname: "",
      number: "",
      birthday: new Date(),
      age: 0,
      province: "",
      municipality: "",
      baranggay: "",
    },
  });

  return <div>ProfileForm</div>;
};

export default ProfileForm;

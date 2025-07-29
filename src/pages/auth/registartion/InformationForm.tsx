import StyledText from "@/components/StyledText";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MoveRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getBaranggays, getMunicipalities, getProvinces } from "@/api/location";
import ComboBox from "@/components/ComboBox";
import { useState } from "react";

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

function InformationForm() {
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedMunicipalCode, setSelectedMunicipalCode] = useState("");

  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });
  const { data: municipalities } = useQuery({
    queryKey: ["municipalities", selectedProvinceCode],
    queryFn: () => getMunicipalities(selectedProvinceCode),
    enabled: !!selectedProvinceCode,
  });
  const { data: barangays } = useQuery({
    queryKey: ["barangays", selectedMunicipalCode],
    queryFn: () => getBaranggays(selectedMunicipalCode),
    enabled: !!selectedMunicipalCode,
  });

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
  // const birthdayValue = form.watch("birthday");

  // useEffect(() => {
  //   const date = new Date(birthdayValue);
  //   console.log("Date: " + calculateAge(date));
  // }, [birthdayValue]);

  const onSubmit = (values: FormData) => {
    console.log(values);
  };

  return (
    <div className="max-w-[500px] mx-auto shadow-100 py-9 px-7 rounded-xl md:py-14 md:px-12">
      <Form {...form}>
        <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mr-auto">
            <StyledText text="Personal Information" size="" />
          </div>

          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middlename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Middle Name
                  <span className="text-[0.8rem] font-light">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-5">
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Birthday</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : field.value
                      }
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <ComboBox
                    items={provinces}
                    term="province"
                    selectItem={setSelectedProvinceCode}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="municipality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Municipality</FormLabel>
                <FormControl>
                  <ComboBox
                    items={municipalities}
                    term="municipality"
                    selectItem={setSelectedMunicipalCode}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="baranggay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Baranggay</FormLabel>
                <FormControl>
                  <ComboBox items={barangays} term="baranggay" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-2 flex justify-between">
            <Button
              className="cursor-pointer bg-white text-100 hover:bg-100 hover:text-white"
              variant={"ghost"}
              type="button"
            >
              Back
            </Button>

            <Button
              className="cursor-pointer bg-white border border-[var(--color-100)] text-100 hover:bg-100 hover:text-white"
              type="submit"
            >
              Next
              <MoveRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default InformationForm;

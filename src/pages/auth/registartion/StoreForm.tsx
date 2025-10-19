import ComboBox from "@/components/ComboBox";
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
import useOrganizationOptions from "@/hooks/useOrganizationOptions";
import type { FormStepProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight, X } from "lucide-react";
import { useState } from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

const FILESIZE_LIMIT = 5 * 1024 * 1024;

const formSchema = z.object({
  organization: z.string({ message: "Select organization" }),
  stallNumbers: z
    .string()
    .array()
    .min(1, { message: "At least one stall number is required" }),
  storeName: z.string().min(1, { message: "Store name is required" }),
  permit: z
    .instanceof(File, { message: "Permit file is required" })
    .refine((file) => file.size <= FILESIZE_LIMIT, {
      message: "File size should not exceed 5MB",
    })
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid image file type" }
    ),
});

type FormData = z.infer<typeof formSchema>;
type StoreFormProps = FormStepProps;

function StoreForm({
  registrationData,
  goToNextStep,
  goToPreviousStep,
  updateRegistrationData,
}: StoreFormProps) {
  const [stallNumber, setStallNumber] = useState("");
  const [stallNumbers, setStallNumbers] = useState<string[]>(
    registrationData?.stallNumbers ? [...registrationData.stallNumbers] : []
  );
  const [organizationId, setOrganization] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stallNumbers: registrationData.stallNumbers ?? [],
      storeName: registrationData.storeName ?? "",
      permit: registrationData.permit
        ? new File([registrationData.permit], registrationData.permit.name, {
            type: registrationData.permit.type,
          })
        : new File([], ""),
    },
  });

  const organizations = useOrganizationOptions();

  const chooseOrganization = (id: string) => {
    setOrganization(id);
    form.setValue("organization", id);
    form.trigger("organization");
  };

  const addStallNumber =
    (onChange: ControllerRenderProps<FormData, "stallNumbers">["onChange"]) =>
    () => {
      onChange([...form.getValues("stallNumbers"), stallNumber]);
      setStallNumbers((prev) => {
        const exists = prev.some((stall) => stall == stallNumber);

        if (exists) return prev;

        return [...prev, stallNumber];
      });
      setStallNumber("");
    };

  const deleteStallNumber = (stallNumber: string) => {
    setStallNumbers((prev) => prev.filter((stall) => stall != stallNumber));
  };

  const onSubmit = (values: FormData) => {
    updateRegistrationData(values);
    goToNextStep();
  };

  return (
    <div className="max-w-[500px] mx-auto shadow-100 py-9 px-7 rounded-xl md:py-14 md:px-12">
      <Form {...form}>
        <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mr-auto">
            <StyledText text="Store Details" size="" />
          </div>

          <FormField
            control={form.control}
            name="organization"
            render={() => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <ComboBox
                    items={organizations}
                    value={organizationId}
                    onChange={chooseOrganization}
                    term="organization"
                    enableSearch={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stallNumbers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stall Number</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={stallNumber}
                        onChange={(e) => setStallNumber(e.target.value)}
                      />
                      <Button
                        type={"button"}
                        onClick={addStallNumber(field.onChange)}
                      >
                        Add Stall
                      </Button>
                    </div>

                    <div className="flex items-center flex-wrap gap-3">
                      {stallNumbers.map((stallNumber) => {
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
                              onClick={() => deleteStallNumber(stallNumber)}
                            >
                              <X />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="permit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Business Permit</FormLabel>
                <FormControl>
                  <Input
                    accept=".jpg, .png"
                    type="file"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
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
              onClick={goToPreviousStep}
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

export default StoreForm;

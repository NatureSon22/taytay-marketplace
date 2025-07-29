import StyledText from "@/components/StyledText";
import CredentialsForm from "./CredentialsForm";
import CenterLayout from "@/layouts/CenterLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import InformationForm from "./InformationForm";
import StoreForm from "./StoreForm";
import AgreeForm from "./AgreeForm";
import RegistrationSuccess from "./RegistrationSuccess";

type FormWrapperProps = {
  step: number;
  handleStep: () => void;
};

function FormWrapper({ step, handleStep }: FormWrapperProps) {
  return (
    <div className="grid gap-10">
      <div className="space-y-1">
        <StyledText text="Register" size="text-3xl" />
        <p className="text-center text-[0.9rem]">
          Create your seller account to post and market your products!
        </p>
      </div>

      <CenterLayout>
        <div className="w-full">
          {step == 0 && <CredentialsForm />}
          {step == 1 && <InformationForm />}
          {step == 2 && <StoreForm />}
          {step == 3 && <AgreeForm />}
          {step == 4 && <RegistrationSuccess />}
        </div>
      </CenterLayout>

      <Button className="mx-auto cursor-pointer" variant={"ghost"}>
        <ChevronLeft className="size-7" />
        Return to Homepage
      </Button>
    </div>
  );
}

export default FormWrapper;

import StyledText from "@/components/StyledText";
import CredentialsForm from "./CredentialsForm";
import CenterLayout from "@/layouts/CenterLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import InformationForm from "./InformationForm";
import StoreForm from "./StoreForm";
import AgreeForm from "./AgreeForm";
import RegistrationSuccess from "./RegistrationSuccess";
import { useNavigate } from "react-router-dom";
import type { RegistrationData } from "@/types/registration";

type FormWrapperProps = {
  registrationData: RegistrationData;
  step: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateRegistrationData: (data: Partial<RegistrationData>) => void;
  registerAccount: () => void;
};

function FormWrapper({
  registrationData,
  step,
  goToNextStep,
  goToPreviousStep,
  updateRegistrationData,
  registerAccount,
}: FormWrapperProps) {
  const navigate = useNavigate();

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
          {step === 0 && (
            <CredentialsForm
              registrationData={registrationData}
              goToNextStep={goToNextStep}
              updateRegistrationData={updateRegistrationData}
            />
          )}

          {step === 1 && (
            <InformationForm
              registrationData={registrationData}
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
              updateRegistrationData={updateRegistrationData}
            />
          )}

          {step === 2 && (
            <StoreForm
              registrationData={registrationData}
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
              updateRegistrationData={updateRegistrationData}
            />
          )}

          {step === 3 && (
            <AgreeForm
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
              registerAccount={registerAccount}
            />
          )}
          {step === 4 && <RegistrationSuccess />}
        </div>
      </CenterLayout>

      <Button
        className="mx-auto cursor-pointer"
        variant={"ghost"}
        onClick={() => navigate("/")}
      >
        <ChevronLeft className="size-7" />
        Return to Homepage
      </Button>
    </div>
  );
}

export default FormWrapper;

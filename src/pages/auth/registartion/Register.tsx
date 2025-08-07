import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import FormStep from "./FormStep";
import { useState } from "react";
import FormWrapper from "./FormWrapper";
import type { RegistrationData } from "@/types/registration";
import { useRegistrationFlow } from "@/hooks/useRegistrationFlow";

function Register() {
  const { step, goToNextStep, goToPreviousStep } = useRegistrationFlow();
  const [registrationData, setRegistrationData] = useState<RegistrationData>(
    {} as RegistrationData
  );

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...data } as RegistrationData));
  };

  return (
    <PadLayout>
      <CenterLayout>
        <div className="w-[80%] my-20 space-y-10 lg:w-[60%] xl:w-[50%]">
          <FormStep step={step} />
          <FormWrapper
            registrationData={registrationData}
            step={step}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            updateRegistrationData={updateRegistrationData}
          />
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default Register;

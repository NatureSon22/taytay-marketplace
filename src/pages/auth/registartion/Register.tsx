import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import FormStep from "./FormStep";
import { useState } from "react";
import FormWrapper from "./FormWrapper";
import type { RegistrationData } from "@/types/registration";
import { useRegistrationFlow } from "@/hooks/useRegistrationFlow";
import { useRegister } from "@/hooks/useRegister";

function Register() {
  const { step, goToNextStep, goToPreviousStep } = useRegistrationFlow();
  const [registrationData, setRegistrationData] = useState<RegistrationData>(
    {} as RegistrationData
  );

  const registerMutation = useRegister();

  const registerAccount = () => {
    const formData = new FormData();

    // AccountCredentials
    formData.append("username", registrationData.username);
    formData.append("email", registrationData.email);
    formData.append("password", registrationData.password);

    // UserProfile
    formData.append("firstName", registrationData.firstName);
    if (registrationData.middleName)
      formData.append("middleName", registrationData.middleName);
    formData.append("lastName", registrationData.lastName);
    formData.append("birthday", registrationData.birthday.toISOString()); // Date → string
    formData.append("age", registrationData.age.toString());
    formData.append("contactNumber", registrationData.contactNumber);
    formData.append("province", registrationData.province);
    formData.append("municipality", registrationData.municipality);
    formData.append("barangay", registrationData.barangay);

    // StoreDetails
    formData.append("storeName", registrationData.storeName);
    registrationData.stallNumbers.forEach((stall) => {
      formData.append("stallNumbers[]", stall); // repeated key for arrays
    });
    if (registrationData.permit) {
      formData.append("permit", registrationData.permit);
    }

    registerMutation.mutate(formData);
  };

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
            registerAccount={registerAccount}
          />
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default Register;

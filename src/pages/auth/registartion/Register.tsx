import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import FormStep from "./FormStep";
import { useState } from "react";
import FormWrapper from "./FormWrapper";
import type { RegistrationData } from "@/types/registration";
import { useRegistrationFlow } from "@/hooks/useRegistrationFlow";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function Register() {
  const { step, goToNextStep, goToPreviousStep, reset } = useRegistrationFlow();
  const [registrationData, setRegistrationData] = useState<RegistrationData>(
    {} as RegistrationData
  );
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => register(data),
    onSuccess: () => {
      goToNextStep();
    },
    onError: (error) => {
      toast.error(error.message);
      setRegistrationData({} as RegistrationData);
      reset();
      navigate("/register");
    },
  });

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

    mutate(formData);
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
            loading={isPending}
          />
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default Register;

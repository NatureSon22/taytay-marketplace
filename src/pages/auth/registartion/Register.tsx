import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import FormStep from "./FormStep";
import { useState } from "react";
import FormWrapper from "./FormWrapper";

function Register() {
  const [step, setStep] = useState(4);

  const handleStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <PadLayout>
      <CenterLayout>
        <div className="w-[80%] my-20 space-y-10 lg:w-[60%] xl:w-[50%]">
          <FormStep step={step} />
          <FormWrapper step={step} handleStep={handleStep} />
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default Register;

import { useState } from "react";

const FINAL_STEP = 5;

export function useRegistrationFlow() {
  const [step, setStep] = useState(4);

  const goToNextStep = () => {
    setStep((prev) => {
      const updatedStep = prev + 1;

      // if (updatedStep == FINAL_STEP) {
      //   navigate("/thank-you");
      // }

      return updatedStep;
    });
  };

  const goToPreviousStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return { step, goToNextStep, goToPreviousStep };
}

import { useState } from "react";

export function useRegistrationFlow() {
  const [step, setStep] = useState(0);

  const goToNextStep = () => {
    setStep((prev) => {
      const updatedStep = prev + 1;

      return updatedStep;
    });
  };

  const goToPreviousStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const reset = () => {
    setStep(0);
  };

  return { step, goToNextStep, goToPreviousStep, reset };
}

import { useState } from "react";
import { useNavigate } from "react-router";

const FINAL_STEP = 5;

export function useRegistrationFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const goToNextStep = () => {
    setStep((prev) => {
      const updatedStep = prev + 1;

      if (updatedStep == FINAL_STEP) {
        navigate("/thank-you");
      }

      return updatedStep;
    });
  };

  const goToPreviousStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return { step, goToNextStep, goToPreviousStep };
}

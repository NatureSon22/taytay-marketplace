import type { RegistrationData } from "./registration";

export type FormStepProps = {
  registrationData: RegistrationData;
  goToNextStep: () => void;
  goToPreviousStep?: () => void;
  updateRegistrationData: (data: Partial<RegistrationData>) => void;
};

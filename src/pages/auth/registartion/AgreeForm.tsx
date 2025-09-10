import StyledText from "@/components/StyledText";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router";

type AgreeFormProps = {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  registerAccount: () => void;
};

function AgreeForm({ goToPreviousStep, registerAccount }: AgreeFormProps) {
  return (
    <div className="max-w-[500px] mx-auto shadow-100 py-9 px-7 rounded-xl md:py-14 md:px-12">
      <div className="grid gap-5">
        <div className="mr-auto">
          <StyledText text="Agreement Section" size="" />
        </div>

        <p className="text-[0.95rem] text-justify">
          I agree to the
          <Link to="" className="mx-1.5 font-bold">
            Terms and Conditions
          </Link>
          and acknowledge that my personal data will be collected, stored, and
          processed in accordance with the
          <Link to="" className="ml-1.5 font-bold">
            Privacy Policy
          </Link>
          . By checking the box below, I confirm that I have read, understood,
          and accept these terms.
        </p>

        <div className="flex gap-4 items-start">
          <Checkbox className="border-slate-400 mt-1" />
          <p>
            By checking this box, I acknowledge and agree to the above statement
          </p>
        </div>

        <div className="mt-2 flex justify-between">
          <Button
            className="cursor-pointer bg-white text-100 hover:bg-100 hover:text-white"
            variant={"ghost"}
            type="button"
            onClick={goToPreviousStep}
          >
            Back
          </Button>

          <Button
            className="cursor-pointer bg-100 text-white"
            type="submit"
            onClick={registerAccount}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AgreeForm;

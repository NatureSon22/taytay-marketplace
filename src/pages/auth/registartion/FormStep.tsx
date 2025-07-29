import formstep from "@/data/formstep";
import { cn } from "@/lib/utils";

type FormStepProps = {
  step: number;
};

function FormStep({ step }: FormStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:px-10 lg:px-14">
        {Object.entries(formstep).map(([stepNum, stepLabel], i) => {
          return (
            <div className="flex-1 gap-3 grid place-items-center" key={stepNum}>
              <div
                className={cn(
                  "size-12 grid place-items-center rounded-full font-bold",
                  i <= step
                    ? "bg-100 text-white"
                    : "bg-white border border-solid border-[var(--color-100)] text-100"
                )}
              >
                {stepNum}
              </div>
              <p
                className={
                  "text-center font-medium text-100 text-[0.85rem] md:text-[0.9rem]"
                }
              >
                {stepLabel}
              </p>
            </div>
          );
        })}
      </div>

      <div className="w-full bg-100/15 rounded-full">
        <div
          className={cn(
            "py-[5px] bg-100 rounded-full",
            step == 0
              ? "w-0"
              : step == 1
              ? "w-1/4"
              : step === 2
              ? "w-1/2"
              : step === 3
              ? "w-3/4"
              : "w-full"
          )}
        ></div>
      </div>
    </div>
  );
}

export default FormStep;

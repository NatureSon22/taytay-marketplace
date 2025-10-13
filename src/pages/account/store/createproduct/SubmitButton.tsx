import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

type SubmitButtonProps = {
  isPending: boolean;
  isEdit?: boolean;
};

const SubmitButton = ({ isPending, isEdit }: SubmitButtonProps) => {
  return (
    <div className="mt-5 flex justify-end">
      <Button className="bg-100 flex items-center gap-2" type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle className="animate-spin" />
            {isEdit ? "Editing product" : "Adding product"}
          </>
        ) : (
          <p>{isEdit ? "Edit product" : "Add product"}</p>
        )}
      </Button>
    </div>
  );
};

export default SubmitButton;
 
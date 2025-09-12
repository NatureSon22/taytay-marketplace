import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type SaveButtonProps = {
  isEditing: boolean;
  isSaving: boolean;
};

export default function SaveButton({ isEditing, isSaving }: SaveButtonProps) {
  if (!isEditing) return null;

  return (
    <Button
      type="submit"
      disabled={isSaving}
      className="bg-100 ml-auto py-5 px-6 flex items-center gap-2"
    >
      {isSaving ? (
        <>
          <LoaderCircle className="animate-spin" size={18} />
          <span>Saving...</span>
        </>
      ) : (
        <span>Save</span>
      )}
    </Button>
  );
}

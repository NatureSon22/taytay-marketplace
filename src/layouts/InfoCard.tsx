import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { Pencil } from "lucide-react";

type InfoCardProps = {
  header: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
  isSaving?: boolean;
  disableActions?: () => void;
  children: ReactNode;
};

function InfoCard({
  header,
  isEditing,
  enableEditing,
  disableEditing,
  isSaving = false,
  disableActions = () => {},
  children,
}: InfoCardProps) {
  const clickCancel = () => {
    disableEditing();
    disableActions();
  };

  return (
    <div className="px-5 py-6 space-y-5 border border-slate-300 rounded-xl lg:px-6">
      <div className="flex items-center justify-between">
        <p className="text-100 font-bold">{header}</p>

        {isEditing ? (
          <Button
            variant={"secondary"}
            disabled={isSaving}
            onClick={clickCancel}
          >
            Cancel
          </Button>
        ) : (
          <Button
            className="cursor-pointer"
            variant={"secondary"}
            onClick={enableEditing}
            disabled={isSaving}
          >
            <Pencil /> Edit
          </Button>
        )}
      </div>

      {children}
    </div>
  );
}

export default InfoCard;

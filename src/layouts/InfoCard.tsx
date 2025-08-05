import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router";

type InfoCardProps = {
  header: string;
  path: string;
  children: ReactNode;
};

function InfoCard({ header, path, children }: InfoCardProps) {
  const navigate = useNavigate();

  return (
    <div className="px-5 py-6 space-y-5 border border-slate-300 rounded-xl lg:px-6">
      <div className="flex items-center justify-between">
        <p className="text-100 font-bold">{header}</p>

        <Button
          className="cursor-pointer"
          variant={"secondary"}
          onClick={() => navigate(path)}
        >
          <Pencil />
          <p>Edit</p>
        </Button>
      </div>

      {children}
    </div>
  );
}

export default InfoCard;

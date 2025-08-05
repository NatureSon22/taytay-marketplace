import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Seller } from "@/data/userData";
import { Button } from "@/components/ui/button";

type PermitModalProps = {
  open: boolean;
  onClose: () => void;
  seller: Seller | null;
};

export default function PermitModal({ open, onClose, seller }: PermitModalProps) {
  if (!seller) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="pt-6">
        <div className="flex pt-6 flex-col items-center gap-4">
          <img
            src={seller.image}
            alt={seller.fullName}
            className="w-100 h-100 border rounded-md object-cover"
          />
          <div className="text-center">
            <h3 className="text-lg font-semibold">{seller.fullName}</h3>
            <p className="text-sm text-muted-foreground">{seller.email}</p>
            <p className="text-sm font-medium mt-1">{seller.storeName}</p>
            <p
              className={`mt-2 px-2 py-1 rounded text-sm font-medium ${
                seller.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {seller.status}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

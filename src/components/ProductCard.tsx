import { Skeleton } from "./ui/skeleton";
import clsx from "clsx";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash } from "lucide-react";

type ProductCardProps = {
  productName: string;
  productPrice: string;
  productPictures: string[];
  isLoading: boolean;
  onClick?: () => void;
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

function ProductCard({
  productName,
  productPrice,
  productPictures,
  isLoading,
  onClick = () => {},
  editable = false,
  onEdit = () => {},
  onDelete = () => {},
}: ProductCardProps) {
  return (
    <div
      className={clsx(
        "relative w-full max-w-[330px] cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300",
        !isLoading &&
          "group hover:shadow-md hover:scale-[1.02] hover:-translate-y-1 hover:border-gray-200"
      )}
      onClick={onClick}
    >
      {/* Popover for Edit/Delete */}
      {editable && !isLoading && (
        <div className="absolute top-3 right-3 z-10">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                onClick={(e) => e.stopPropagation()} // prevent triggering card click
              >
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-40 p-2 flex flex-col gap-2"
              align="end"
              onClick={(e) => e.stopPropagation()} // stop bubbling to card
            >
              <Button
                variant="ghost"
                className="flex items-center gap-2 justify-start"
                onClick={onEdit}
              >
                <Edit className="h-4 w-4" /> Edit
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 justify-start text-red-500 hover:text-red-600"
                onClick={onDelete}
              >
                <Trash className="h-4 w-4" /> Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-[280px] w-full overflow-hidden bg-gray-50">
        {isLoading ? (
          <Skeleton className="h-[280px] w-full bg-slate-300" />
        ) : (
          <img
            src={productPictures[0]}
            alt={productName}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        )}

        {!isLoading && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      {/* Product Info */}
      <div className="px-4 py-5 space-y-3">
        <div className="space-y-1 pl-2">
          {isLoading ? (
            <Skeleton className="w-[10rem] py-2 bg-slate-300 mb-2" />
          ) : (
            <p
              className={clsx(
                "text-[0.95rem] font-medium line-clamp-2 transition-colors duration-200",
                !isLoading && "group-hover:text-gray-700"
              )}
            >
              {productName}
            </p>
          )}

          <div className="flex items-center justify-between">
            {isLoading ? (
              <Skeleton className="w-[5rem] py-2 bg-slate-300 mb-2" />
            ) : (
              <p className="text-[1.1rem] font-bold transition-colors duration-200">
                ₱{Number(productPrice).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Subtle shine effect */}
      {!isLoading && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      )}
    </div>
  );
}

export type { ProductCardProps };
export { ProductCard };
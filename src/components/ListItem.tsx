import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ListItemProps = React.HTMLAttributes<HTMLDivElement> & {
  label: React.ReactNode;
  onPrimary?: () => void;
  onRemove?: () => void;
};

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ label, onPrimary, onRemove, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...rest}
      >
        <p
          className="text-slate-400 font-medium text-sm cursor-pointer hover:text-slate-600"
          onClick={onPrimary}
        >
          {label}
        </p>

        {onRemove && (
          <Button
            variant="secondary"
            type="button"
            className="cursor-pointer p-1 border border-transparent hover:border-slate-300"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X size={16} />
          </Button>
        )}
      </div>
    );
  }
);

import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  suffixAriaLabel?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type, suffix, prefix, suffixAriaLabel, ...props },
  ref
) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-1",
        className && typeof className === "string" ? "" : ""
      )}
    >
      {prefix && (
        <div
          data-slot="prefix"
          className="flex items-center select-none px-2 text-sm text-muted-foreground"
        >
          {prefix}
        </div>
      )}

      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex-1 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

          className
        )}
        {...props}
      />

      {suffix && (
        <div
          data-slot="suffix"
          className="ml-1 flex items-center select-none px-2"
          aria-hidden={suffixAriaLabel ? undefined : true}
          aria-label={suffixAriaLabel}
        >
          {suffix}
        </div>
      )}
    </div>
  );
});

export { Input };

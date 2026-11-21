import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {required && (
              <span className="text-danger ml-0.5">*</span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            aria-invalid={!!error}
            className={cn(
              "w-full h-11 rounded-md border bg-surface px-3 text-sm",
              "placeholder:text-muted/60",
              "focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light",
              leftIcon ? "pl-10" : false,
              error && "border-danger focus:border-danger",
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-1 text-xs text-danger">{error}</p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-xs text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
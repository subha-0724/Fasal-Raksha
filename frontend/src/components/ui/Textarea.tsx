import {
  forwardRef,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
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

        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-md border bg-surface px-3 py-2 text-sm resize-y min-h-[100px]",
            "focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light",
            error ? "border-danger" : "border-border",
            className
          )}
          {...props}
        />

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

Textarea.displayName = "Textarea";
import { type ReactNode, useId } from "react";
import { cn } from "@/lib/cn";

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: (id: string) => ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-800"
      >
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      {children(id)}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={describedBy}
          role="alert"
          className="text-xs text-red-600 font-medium"
        >
          {error}
        </p>
      )}
    </div>
  );
}
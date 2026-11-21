import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
}

export function Card({
  children,
  className,
  padding = "md",
  interactive = false,
  ...props
}: CardProps) {
  const pad = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
  }[padding];

  return (
    <div
      className={cn(
        "bg-surface rounded-lg shadow-sm border border-border",
        pad,
        interactive &&
          "cursor-pointer transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex items-start justify-between gap-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
      {children}
    </h3>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-sm text-muted", className)}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-4 pt-4 border-t border-border flex items-center justify-end gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}
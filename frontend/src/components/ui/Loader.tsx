import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function Spinner({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const s = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-9 w-9",
  }[size];

  return (
    <Loader2
      className={cn(
        "animate-spin text-primary",
        s,
        className
      )}
    />
  );
}

export function PageLoader({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Spinner size="lg" />
      <p className="text-sm text-muted">{message}</p>
    </div>
  );
}

export function Skeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200/70",
        className
      )}
    />
  );
}
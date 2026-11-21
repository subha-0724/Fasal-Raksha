import { type ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-4",
        className
      )}
    >
      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon || <Inbox className="h-7 w-7" />}
      </div>

      <h3 className="text-base font-semibold text-gray-900">
        {title}
      </h3>

      {description && (
        <p className="mt-1 text-sm text-muted max-w-sm">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}
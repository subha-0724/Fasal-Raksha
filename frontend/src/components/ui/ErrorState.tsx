import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h3 className="text-base font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-muted max-w-sm">
        {message}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          className="mt-5"
          onClick={onRetry}
        >
          Try again
        </Button>
      )}
    </div>
  );
}
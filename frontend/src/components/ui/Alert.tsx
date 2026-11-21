import { type ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Variant =
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface AlertProps {
  variant?: Variant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

const config: Record<
  Variant,
  { icon: ReactNode; wrap: string }
> = {
  info: {
    icon: <Info className="h-5 w-5" />,
    wrap: "bg-blue-50 border-blue-200 text-blue-900",
  },
  success: {
    icon: <CheckCircle2 className="h-5 w-5" />,
    wrap: "bg-green-50 border-green-200 text-green-900",
  },
  warning: {
    icon: <TriangleAlert className="h-5 w-5" />,
    wrap: "bg-yellow-50 border-yellow-200 text-yellow-900",
  },
  danger: {
    icon: <AlertCircle className="h-5 w-5" />,
    wrap: "bg-red-50 border-red-200 text-red-900",
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  onClose,
  className,
}: AlertProps) {
  const c = config[variant];

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-md border p-3 text-sm",
        c.wrap,
        className
      )}
    >
      <span className="shrink-0 mt-0.5">
        {c.icon}
      </span>

      <div className="flex-1">
        {title && (
          <p className="font-semibold mb-0.5">
            {title}
          </p>
        )}

        <div>{children}</div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 rounded p-1 hover:bg-black/5"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle, Info, X, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  message?: string;
  duration: number;
}

interface ToastContextValue {
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const config: Record<
  ToastVariant,
  { icon: ReactNode; iconColor: string; border: string }
> = {
  success: {
    icon: <CheckCircle2 className="h-5 w-5" />,
    iconColor: "text-green-600",
    border: "border-green-200",
  },
  error: {
    icon: <AlertCircle className="h-5 w-5" />,
    iconColor: "text-red-600",
    border: "border-red-200",
  },
  info: {
    icon: <Info className="h-5 w-5" />,
    iconColor: "text-blue-600",
    border: "border-blue-200",
  },
  warning: {
    icon: <TriangleAlert className="h-5 w-5" />,
    iconColor: "text-yellow-600",
    border: "border-yellow-200",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const show = useCallback(
    (variant: ToastVariant, title: string, message?: string) => {
      const id = Math.random().toString(36).slice(2);
      const duration = 4000;
      setToasts((prev) => [...prev, { id, variant, title, message, duration }]);
      setTimeout(() => remove(id), duration);
    },
    []
  );

  const api: ToastContextValue = {
    success: (t, m) => show("success", t, m),
    error: (t, m) => show("error", t, m),
    info: (t, m) => show("info", t, m),
    warning: (t, m) => show("warning", t, m),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => {
          const c = config[toast.variant];
          return (
            <div
              key={toast.id}
              role="status"
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-lg border bg-white shadow-lg p-4 min-w-[300px] max-w-md",
                c.border
              )}
            >
              <span className={cn("shrink-0 mt-0.5", c.iconColor)}>
                {c.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {toast.title}
                </p>
                {toast.message && (
                  <p className="text-xs text-muted mt-0.5">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => remove(toast.id)}
                aria-label="Dismiss"
                className="shrink-0 rounded p-1 text-muted hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
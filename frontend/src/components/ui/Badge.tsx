import { type ReactNode } from "react";
import {
  CheckCircle2,
  Clock,
  Info,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Tone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary";

export interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  size?: "sm" | "md";
  withIcon?: boolean;
  className?: string;
}

const toneStyles: Record<Tone, string> = {
  neutral: "bg-gray-100 text-gray-700 border-gray-200",
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  danger: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

const toneIcon: Record<Tone, ReactNode> = {
  neutral: null,
  primary: null,
  success: <CheckCircle2 className="h-3.5 w-3.5" />,
  warning: <Clock className="h-3.5 w-3.5" />,
  danger: <XCircle className="h-3.5 w-3.5" />,
  info: <Info className="h-3.5 w-3.5" />,
};

export function Badge({
  children,
  tone = "neutral",
  size = "sm",
  withIcon = true,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        size === "sm"
          ? "px-2 py-0.5 text-xs"
          : "px-2.5 py-1 text-sm",
        toneStyles[tone],
        className
      )}
    >
      {withIcon && toneIcon[tone]}
      {children}
    </span>
  );
}

export type IncidentStatus =
  | "pending"
  | "acknowledged"
  | "verified"
  | "approved"
  | "rejected"
  | "paid";

const statusMap: Record<IncidentStatus, { tone: Tone; label: string }> = {
  pending: { tone: "warning", label: "Pending" },
  acknowledged: { tone: "info", label: "Acknowledged" },
  verified: { tone: "primary", label: "Verified" },
  approved: { tone: "success", label: "Approved" },
  rejected: { tone: "danger", label: "Rejected" },
  paid: { tone: "primary", label: "Paid" },
};

export function StatusBadge({
  status,
}: {
  status: IncidentStatus;
}) {
  const cfg = statusMap[status];

  return (
    <Badge tone={cfg.tone}>
      {cfg.label}
    </Badge>
  );
}
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TooltipProps {
  content: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  const pos = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[side];

  return (
    <span
      className={cn(
        "relative inline-flex",
        className
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}

      {open && (
        <span
          role="tooltip"
          className={cn(
            "absolute z-40 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 shadow-md pointer-events-none",
            pos
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
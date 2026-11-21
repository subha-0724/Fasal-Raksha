import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  Map,
  FileText,
  User,
} from "lucide-react";
import { cn } from "@/lib/cn";

export interface BottomNavItem {
  to: string;
  label: string;
  icon: "dashboard" | "incidents" | "map" | "claims" | "profile";
}

const iconMap = {
  dashboard: LayoutDashboard,
  incidents: AlertTriangle,
  map: Map,
  claims: FileText,
  profile: User,
};

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  return (
    <nav
      aria-label="Bottom navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex justify-around">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                end
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center gap-0.5 py-2 text-xs",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light",
                    isActive ? "text-primary font-medium" : "text-muted"
                  )
                }
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
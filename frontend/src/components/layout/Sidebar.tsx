import { NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";

export interface SidebarItem {
  to: string;
  label: string;
}

export interface SidebarProps {
  items: SidebarItem[];
}

export function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-white h-full">
      <nav className="p-3 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-appbg"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
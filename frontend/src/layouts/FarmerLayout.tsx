import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout";
import {
  LayoutDashboard,
  Plus,
  Map,
  DollarSign,
  User,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { mockFarmer } from "@/data/mockData";

const navItems = [
  { to: "/farmer", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/farmer/report", label: "Report", icon: Plus },
  { to: "/farmer/map", label: "Map", icon: Map },
  { to: "/farmer/claims", label: "Claims", icon: DollarSign },
  { to: "/farmer/profile", label: "Profile", icon: User },
];

export function FarmerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (item: (typeof navItems)[number]) =>
    item.end
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);

  return (
    <div className="min-h-screen bg-appbg">
      <Navbar user={{ name: mockFarmer.name, role: "Farmer" }} />

      <div className="flex">
        <aside className="hidden lg:flex w-60 shrink-0 border-r border-border bg-surface min-h-[calc(100vh-3.5rem)]">
          <nav className="w-full p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <button
                  key={item.to}
                  onClick={() => navigate(item.to)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-left transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-appbg"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      <nav
        aria-label="Farmer bottom navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-border"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <li key={item.to} className="flex-1">
                <button
                  onClick={() => navigate(item.to)}
                  className={cn(
                    "w-full flex flex-col items-center justify-center gap-0.5 py-2 text-xs",
                    active ? "text-primary font-medium" : "text-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
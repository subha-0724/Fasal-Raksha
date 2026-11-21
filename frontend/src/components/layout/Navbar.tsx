import { Bell, UserCircle } from "lucide-react";
import { Button } from "@/components/ui";

export interface NavbarProps {
  user?: {
    name: string;
    role: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border">
      <div className="h-14 px-4 flex items-center gap-3">
        <div className="flex items-center gap-2 font-bold text-primary">
          <span className="text-xl">🌾</span>
          <span className="hidden sm:inline">
            Fasal Raksha
          </span>
        </div>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {user ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium leading-tight">
                {user.name}
              </p>

              <p className="text-xs text-muted capitalize">
                {user.role}
              </p>
            </div>

            <UserCircle className="h-8 w-8 text-muted" />
          </div>
        ) : (
          <Button size="sm">
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  mockFarmer,
  mockAgriOfficer,
  mockForestOfficer,
  type User,
  type UserRole,
} from "@/data/mockData";

interface AuthContextValue {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  canSeeAnimalOnly: boolean; // true for forest_officer
  canProcessClaims: boolean; // true for agri_officer + admin
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    if (role === "farmer") setUser(mockFarmer);
    else if (role === "agri_officer") setUser(mockAgriOfficer);
    else if (role === "forest_officer") setUser(mockForestOfficer);
    else setUser({ ...mockAgriOfficer, role: "admin" });
  };

  const logout = () => setUser(null);

  const value: AuthContextValue = {
    user,
    login,
    logout,
    canSeeAnimalOnly: user?.role === "forest_officer",
    canProcessClaims:
      user?.role === "agri_officer" || user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
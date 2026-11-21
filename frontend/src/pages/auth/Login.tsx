import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Input } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/data/mockData";

type LoginRole = "farmer" | "agri_officer" | "forest_officer";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<LoginRole>("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(role as UserRole);
      setLoading(false);
      navigate(role === "farmer" ? "/farmer" : "/officer");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-appbg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 font-bold text-primary text-xl mb-8"
        >
          <span className="text-2xl">🌾</span> Fasal Raksha
        </Link>

        <Card>
          <CardBody className="pt-5">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-muted mb-6">
              Login to access your dashboard.
            </p>

            <div className="flex p-1 bg-appbg rounded-md mb-5">
              {(
                [
                  { value: "farmer", label: "Farmer" },
                  { value: "agri_officer", label: "Agri Officer" },
                  { value: "forest_officer", label: "Forest Officer" },
                ] as const
              ).map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
                    role === r.value
                      ? "bg-surface text-primary shadow-sm"
                      : "text-muted"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Phone or Email"
                placeholder="9876543210"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button type="submit" className="w-full" isLoading={loading}>
                Login
              </Button>
            </form>

            <p className="text-sm text-center text-muted mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Register
              </Link>
            </p>
          </CardBody>
        </Card>

        <p className="text-xs text-center text-muted mt-6">
          Demo: click Login to enter the app
        </p>
      </div>
    </div>
  );
}
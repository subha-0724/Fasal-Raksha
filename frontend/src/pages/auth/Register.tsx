import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Input, Select } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/data/mockData";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState("farmer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
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
              Create account
            </h1>
            <p className="text-sm text-muted mb-6">
              Join the platform in under a minute.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Select
                label="I am a"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { value: "farmer", label: "Farmer / Community member" },
                  { value: "agri_officer", label: "Agriculture Officer" },
                  { value: "forest_officer", label: "Forest Officer" },
                ]}
              />

              <Input
                label="Full name"
                placeholder="Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Phone number"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              {role === "farmer" && (
                <Input
                  label="Village"
                  placeholder="Bandipur"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                />
              )}

              <Button type="submit" className="w-full" isLoading={loading}>
                Create Account
              </Button>
            </form>

            <p className="text-sm text-center text-muted mt-6">
              Already registered?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Login
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
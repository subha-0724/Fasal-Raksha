import { User, Phone, MapPin, LogOut } from "lucide-react";
import { Button, Card, CardBody, CardHeader, CardTitle, Input } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function OfficerProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const roleLabel =
    user?.role === "forest_officer" ? "Forest Officer" : "Agriculture Officer";

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <Card>
        <CardBody className="text-center">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-3xl mb-3 font-bold">
            {user?.name?.[0] || "O"}
          </div>
          <h2 className="text-lg font-semibold">{user?.name || "Officer"}</h2>
          <p className="text-sm text-muted">{roleLabel}</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Full name"
            defaultValue={user?.name}
            leftIcon={<User className="h-4 w-4" />}
          />
          <Input
            label="Phone"
            defaultValue={user?.phone}
            leftIcon={<Phone className="h-4 w-4" />}
          />
          <Input
            label="District"
            defaultValue={user?.district}
            leftIcon={<MapPin className="h-4 w-4" />}
          />
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardBody>
      </Card>

      <Button
        variant="danger"
        leftIcon={<LogOut className="h-4 w-4" />}
        onClick={() => navigate("/login")}
        className="w-full"
      >
        Logout
      </Button>
    </div>
  );
}
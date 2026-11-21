import {
  User,
  Phone,
  MapPin,
  LogOut,
} from "lucide-react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/ui";

import { mockFarmer } from "@/data/mockData";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">
        Profile
      </h1>

      {/* Profile summary */}
      <Card>
        <CardBody className="text-center">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-3xl mb-3">
            {mockFarmer.name[0]}
          </div>

          <h2 className="text-lg font-semibold">
            {mockFarmer.name}
          </h2>

          <p className="text-sm text-muted capitalize">
            {mockFarmer.role}
          </p>
        </CardBody>
      </Card>

      {/* Account details */}
      <Card>
        <CardHeader>
          <CardTitle>
            Account Details
          </CardTitle>
        </CardHeader>

        <CardBody className="space-y-4">
          <Input
            label="Full name"
            defaultValue={mockFarmer.name}
            leftIcon={
              <User className="h-4 w-4" />
            }
          />

          <Input
            label="Phone"
            defaultValue={mockFarmer.phone}
            leftIcon={
              <Phone className="h-4 w-4" />
            }
          />

          <Input
            label="Village"
            defaultValue={mockFarmer.village}
            leftIcon={
              <MapPin className="h-4 w-4" />
            }
          />

          <div className="flex justify-end">
            <Button>
              Save Changes
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Logout */}
      <Button
        variant="danger"
        leftIcon={
          <LogOut className="h-4 w-4" />
        }
        onClick={() => navigate("/login")}
        className="w-full"
      >
        Logout
      </Button>
    </div>
  );
}
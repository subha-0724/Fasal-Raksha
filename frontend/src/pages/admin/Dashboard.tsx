import { Users, MapPin, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui";
import { mockIncidents, mockClaims } from "@/data/mockData";

export default function AdminDashboard() {
  const kpis = [
    { label: "Total Users", value: 248, icon: Users },
    { label: "Active Regions", value: 12, icon: MapPin },
    { label: "Incidents (30d)", value: mockIncidents.length, icon: AlertTriangle },
    { label: "Claims (30d)", value: mockClaims.length, icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-appbg p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <Card key={k.label}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted uppercase">{k.label}</p>
                    <p className="text-2xl font-bold mt-1">{k.value}</p>
                  </div>
                  <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-muted">
              Full analytics coming in Phase 10.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
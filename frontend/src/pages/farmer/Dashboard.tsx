import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Camera,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Bell,
} from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  StatusBadge,
} from "@/components/ui";
import {
  mockIncidents,
  mockClaims,
  mockNotifications,
  mockFarmer,
  damageTypeMeta,
} from "@/data/mockData";

export default function FarmerDashboard() {
  const navigate = useNavigate();

  const myIncidents = mockIncidents.filter(
    (i) => i.reporterName === mockFarmer.name
  );
  const myClaims = mockClaims.filter(
    (c) => c.farmerName === mockFarmer.name
  );
  const pendingClaims = myClaims.filter((c) =>
    ["submitted", "under_review"].includes(c.status)
  );

  const kpis = [
    {
      label: "My Reports",
      value: myIncidents.length,
      icon: AlertTriangle,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Active",
      value: myIncidents.filter(
        (i) => !["approved", "rejected", "paid"].includes(i.status)
      ).length,
      icon: TrendingUp,
      color: "text-amber-600 bg-amber-100",
    },
    {
      label: "Claims",
      value: myClaims.length,
      icon: DollarSign,
      color: "text-primary bg-primary/10",
    },
    {
      label: "Pending Claims",
      value: pendingClaims.length,
      icon: TrendingUp,
      color: "text-red-600 bg-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Namaste, {mockFarmer.name.split(" ")[0]} 🌾
          </h1>
          <p className="text-sm text-muted mt-1">
            {mockFarmer.village}, {mockFarmer.district}
          </p>
        </div>
        <Button
          size="lg"
          leftIcon={<Camera className="h-5 w-5" />}
          onClick={() => navigate("/farmer/report")}
        >
          Report Damage
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted font-medium uppercase tracking-wide">
                    {kpi.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {kpi.value}
                  </p>
                </div>
                <div
                  className={`h-10 w-10 rounded-md flex items-center justify-center ${kpi.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" /> Recent Updates
          </CardTitle>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </CardHeader>
        <CardBody className="space-y-3">
          {mockNotifications.slice(0, 3).map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 p-3 rounded-md bg-appbg/50"
            >
              <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{n.title}</p>
                <p className="text-xs text-muted mt-0.5">{n.message}</p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Recent Reports</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            View all
          </Button>
        </CardHeader>
        <CardBody>
          {myIncidents.length === 0 ? (
            <p className="text-sm text-muted text-center py-6">
              No reports yet. Click "Report Damage" to start.
            </p>
          ) : (
            <div className="space-y-3">
              {myIncidents.map((inc) => {
                const meta = damageTypeMeta[inc.type];
                return (
                  <div
                    key={inc.id}
                    className="flex items-center gap-4 p-3 rounded-md border border-border hover:bg-appbg cursor-pointer transition-colors"
                    onClick={() => navigate(`/farmer/incidents/${inc.id}`)}
                  >
                    <div className="text-2xl">{meta.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {inc.title}
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        {inc.id} · {inc.location.village} ·{" "}
                        {new Date(inc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <StatusBadge status={inc.status} />
                  </div>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
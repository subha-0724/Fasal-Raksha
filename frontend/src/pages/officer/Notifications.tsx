import { Bell, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@/components/ui";
import { mockNotifications } from "@/data/mockData";

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" /> Notifications
        </h1>
        <p className="text-sm text-muted mt-1">
          Recent activity on incidents and claims
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <Button variant="ghost" size="sm">
            Mark all read
          </Button>
        </CardHeader>
        <CardBody className="space-y-3">
          {mockNotifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 p-3 rounded-md ${
                n.isRead ? "bg-appbg/50" : "bg-primary/5 border border-primary/20"
              }`}
            >
              <CheckCircle2
                className={`h-5 w-5 mt-0.5 shrink-0 ${
                  n.isRead ? "text-muted" : "text-primary"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{n.title}</p>
                <p className="text-xs text-muted mt-0.5">{n.message}</p>
                <p className="text-xs text-muted mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              {n.link && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(n.link!)}
                >
                  View
                </Button>
              )}
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
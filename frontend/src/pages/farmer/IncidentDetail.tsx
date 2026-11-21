import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Camera, User } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  StatusBadge,
  Badge,
  EmptyState,
} from "@/components/ui";
import { getIncidentById, damageTypeMeta } from "@/data/mockData";

export default function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = id ? getIncidentById(id) : undefined;

  if (!incident) {
    return (
      <EmptyState
        title="Incident not found"
        action={<Button onClick={() => navigate("/farmer")}>Back</Button>}
      />
    );
  }

  const meta = damageTypeMeta[incident.type];

  return (
    <div className="space-y-6 max-w-3xl">
      <button
        onClick={() => navigate("/farmer")}
        className="flex items-center gap-2 text-sm text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-muted">{incident.id}</span>
          <StatusBadge status={incident.status} />
          <Badge tone="neutral">
            {meta.emoji} {meta.label}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold">{incident.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm">{incident.description}</p>
        </CardBody>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardBody>
            <User className="h-4 w-4 text-muted mb-2" />
            <p className="text-xs text-muted uppercase">Reported by</p>
            <p className="text-sm font-medium">{incident.reporterName}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <MapPin className="h-4 w-4 text-muted mb-2" />
            <p className="text-xs text-muted uppercase">Location</p>
            <p className="text-sm font-medium">
              {incident.location.village}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Calendar className="h-4 w-4 text-muted mb-2" />
            <p className="text-xs text-muted uppercase">Reported on</p>
            <p className="text-sm font-medium">
              {new Date(incident.createdAt).toLocaleString()}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Camera className="h-4 w-4 text-muted mb-2" />
            <p className="text-xs text-muted uppercase">Evidence</p>
            <p className="text-sm font-medium">
              {incident.images} files
            </p>
          </CardBody>
        </Card>
      </div>

      {incident.notifiedForestOfficer && (
        <Card className="border-l-4 border-l-green-500">
          <CardBody>
            <p className="text-sm">
              🌳 <strong>Forest Officer notified</strong> — this incident
              involves animal damage.
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
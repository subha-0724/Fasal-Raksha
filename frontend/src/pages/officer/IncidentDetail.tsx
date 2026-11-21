import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  Camera,
  User,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  StatusBadge,
  Badge,
  Alert,
  EmptyState,
} from "@/components/ui";
import {
  getIncidentById,
  damageTypeMeta,
  type IncidentStatus,
} from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function OfficerIncidentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { canProcessClaims, canSeeAnimalOnly } = useAuth();

  const baseIncident = useMemo(
    () => (id ? getIncidentById(id) : undefined),
    [id]
  );

  const [status, setStatus] = useState<IncidentStatus>(
    baseIncident?.status ?? "pending"
  );

  if (!baseIncident) {
    return (
      <EmptyState
        title="Incident not found"
        description="It may have been removed or the ID is wrong."
        action={
          <Button onClick={() => navigate("/officer/incidents")}>
            Back to incidents
          </Button>
        }
      />
    );
  }

  const meta = damageTypeMeta[baseIncident.type];

  const updateStatus = (next: IncidentStatus, message: string) => {
    setStatus(next);
    toast.success("Status updated", message);
  };

  const isVerified = ["verified", "approved", "paid"].includes(status);
  const isApproved = ["approved", "paid"].includes(status);
  const isPaid = status === "paid";

  const timeline = [
    {
      icon: Camera,
      title: "Report submitted",
      time: new Date(baseIncident.createdAt).toLocaleString(),
      done: true,
    },
    {
      icon: CheckCircle2,
      title: "Acknowledged by officer",
      time: status !== "pending" ? "Yes" : "Pending",
      done: status !== "pending",
    },
    {
      icon: ShieldCheck,
      title: "Field verified",
      time: isVerified ? "Yes" : "Pending",
      done: isVerified,
    },
    {
      icon: CheckCircle2,
      title: "Approved for payment",
      time: isApproved ? "Yes" : "Pending",
      done: isApproved,
    },
    {
      icon: CheckCircle2,
      title: "Paid",
      time: isPaid ? "Yes" : "Pending",
      done: isPaid,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/officer/incidents")}
        className="flex items-center gap-2 text-sm text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to incidents
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-mono text-muted">
              {baseIncident.id}
            </span>
            <StatusBadge status={status} />
            <Badge tone="neutral">
              {meta.emoji} {meta.label}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold">{baseIncident.title}</h1>
          <p className="text-sm text-muted mt-1">
            Reported by {baseIncident.reporterName}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            leftIcon={<Phone className="h-4 w-4" />}
            onClick={() =>
              toast.info("Call feature", "Will open dialer in Phase 7.")
            }
          >
            Call
          </Button>
          <Button
            disabled={status !== "pending"}
            leftIcon={<CheckCircle2 className="h-4 w-4" />}
            onClick={() =>
              updateStatus("acknowledged", "Incident acknowledged.")
            }
          >
            Acknowledge
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {baseIncident.severity === "critical" && (
        <Alert variant="danger" title="Critical incident">
          Requires immediate attention.
        </Alert>
      )}

      {baseIncident.notifiedForestOfficer && (
        <Alert variant="info" title="Forest Officer notified">
          This incident involves animal damage. The Forest Officer has been
          notified and can view this report.
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-sm">{baseIncident.description}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {timeline.map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
                          t.done
                            ? "bg-success/10 text-success"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p
                          className={`text-sm font-medium ${
                            t.done ? "" : "text-muted"
                          }`}
                        >
                          {t.title}
                        </p>
                        <p className="text-xs text-muted mt-0.5">{t.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {canProcessClaims && (
            <Card>
              <CardHeader>
                <CardTitle>Agriculture Officer Actions</CardTitle>
              </CardHeader>
              <CardBody className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  disabled={status !== "acknowledged"}
                  leftIcon={<ShieldCheck className="h-4 w-4" />}
                  onClick={() =>
                    updateStatus(
                      "verified",
                      "Field verification marked complete."
                    )
                  }
                >
                  Mark Verified
                </Button>
                <Button
                  variant="outline"
                  disabled={status !== "verified"}
                  leftIcon={<CheckCircle2 className="h-4 w-4" />}
                  onClick={() =>
                    updateStatus("approved", "Compensation approved.")
                  }
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  disabled={status !== "approved"}
                  leftIcon={<CheckCircle2 className="h-4 w-4" />}
                  onClick={() =>
                    updateStatus("paid", "Payment marked as transferred.")
                  }
                >
                  Mark Paid
                </Button>
                <Button
                  variant="danger"
                  disabled={["rejected", "paid"].includes(status)}
                  leftIcon={<XCircle className="h-4 w-4" />}
                  onClick={() =>
                    updateStatus("rejected", "Incident rejected.")
                  }
                >
                  Reject
                </Button>
              </CardBody>
            </Card>
          )}

          {canSeeAnimalOnly && (
            <Card>
              <CardBody>
                <p className="text-sm text-muted">
                  🌳 As a Forest Officer, you can view this incident but
                  cannot process compensation. Please coordinate with the
                  Agriculture Officer.
                </p>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted mt-0.5" />
                <div>
                  <p className="text-xs text-muted uppercase">Reporter</p>
                  <p className="text-sm font-medium">
                    {baseIncident.reporterName}
                  </p>
                  <p className="text-xs text-muted">
                    {baseIncident.reporterPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted mt-0.5" />
                <div>
                  <p className="text-xs text-muted uppercase">Location</p>
                  <p className="text-sm font-medium">
                    {baseIncident.location.village}
                  </p>
                  <p className="text-xs text-muted">
                    {baseIncident.location.district}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted mt-0.5" />
                <div>
                  <p className="text-xs text-muted uppercase">Reported</p>
                  <p className="text-sm font-medium">
                    {new Date(baseIncident.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted uppercase">Crop</p>
                <p className="text-sm font-medium">
                  {baseIncident.cropType} — {baseIncident.areaAffected}
                </p>
              </div>

              {baseIncident.animalSpecies && (
                <div>
                  <p className="text-xs text-muted uppercase">
                    Animal species
                  </p>
                  <p className="text-sm font-medium">
                    {baseIncident.animalSpecies}
                  </p>
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evidence ({baseIncident.images})</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: baseIncident.images }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md bg-appbg flex items-center justify-center"
                  >
                    <Camera className="h-6 w-6 text-muted" />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
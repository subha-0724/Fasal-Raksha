import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle2, Clock } from "lucide-react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  EmptyState,
} from "@/components/ui";
import { getClaimById, getIncidentById } from "@/data/mockData";

const steps = ["submitted", "under_review", "approved", "paid"];

export default function ClaimDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const claim = id ? getClaimById(id) : undefined;

  if (!claim) {
    return (
      <EmptyState
        title="Claim not found"
        action={<Button onClick={() => navigate("/farmer/claims")}>Back</Button>}
      />
    );
  }

  const incident = getIncidentById(claim.incidentId);
  const currentIdx = steps.indexOf(claim.status);

  return (
    <div className="space-y-6 max-w-3xl">
      <button
        onClick={() => navigate("/farmer/claims")}
        className="flex items-center gap-2 text-sm text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to claims
      </button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> {claim.id}
          </CardTitle>
          <Badge tone={claim.status === "approved" ? "success" : "info"}>
            {claim.status.replace("_", " ")}
          </Badge>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted uppercase">Crop</p>
              <p className="text-sm font-medium mt-1">{claim.cropType}</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase">Area</p>
              <p className="text-sm font-medium mt-1">{claim.areaAffected}</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase">Claimed</p>
              <p className="text-sm font-medium mt-1">
                ₹{claim.claimAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase">Approved</p>
              <p className="text-sm font-medium mt-1">
                {claim.approvedAmount
                  ? `₹${claim.approvedAmount.toLocaleString("en-IN")}`
                  : "—"}
              </p>
            </div>
          </div>

          {incident && (
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted uppercase mb-2">
                Linked Incident
              </p>
              <button
                onClick={() => navigate(`/farmer/incidents/${incident.id}`)}
                className="text-sm text-primary hover:underline"
              >
                {incident.id} — {incident.title}
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted uppercase mb-4">Progress</p>
            <div className="flex items-center">
              {steps.map((s, i) => {
                const done = i <= currentIdx && claim.status !== "rejected";
                return (
                  <div
                    key={s}
                    className="flex items-center flex-1 last:flex-initial"
                  >
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center text-xs ${
                        done
                          ? "bg-success text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 ${
                          done ? "bg-success" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted capitalize">
              {steps.map((s) => (
                <span key={s}>{s.replace("_", " ")}</span>
              ))}
            </div>
          </div>

          {claim.status === "paid" && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-success/10 text-success text-sm">
              <CheckCircle2 className="h-4 w-4" />
              Payment transferred to your bank account.
            </div>
          )}

          {claim.status === "under_review" && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-warning/10 text-yellow-800 text-sm">
              <Clock className="h-4 w-4" />
              Under review by the Agriculture Officer.
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
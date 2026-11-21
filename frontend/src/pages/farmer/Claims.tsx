import { DollarSign, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  EmptyState,
} from "@/components/ui";
import { mockClaims, mockFarmer } from "@/data/mockData";

const statusTone: Record<
  string,
  "info" | "warning" | "success" | "danger" | "primary"
> = {
  submitted: "info",
  under_review: "warning",
  approved: "success",
  rejected: "danger",
  paid: "primary",
};

export default function Claims() {
  const navigate = useNavigate();
  const myClaims = mockClaims.filter(
    (c) => c.farmerName === mockFarmer.name
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Compensation Tracker</h1>
        <p className="text-sm text-muted">
          Track your claims from submission to payment.
        </p>
      </div>

      {myClaims.length === 0 ? (
        <Card>
          <EmptyState
            icon={<DollarSign className="h-7 w-7" />}
            title="No claims yet"
            description="File a claim after reporting an incident."
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {myClaims.map((claim) => (
            <Card
              key={claim.id}
              interactive
              onClick={() => navigate(`/farmer/claims/${claim.id}`)}
            >
              <CardHeader>
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {claim.id}
                  </CardTitle>
                  <p className="text-xs text-muted mt-1">
                    Linked to {claim.incidentId}
                  </p>
                </div>
                <Badge tone={statusTone[claim.status]}>
                  {claim.status.replace("_", " ")}
                </Badge>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted uppercase">Crop</p>
                    <p className="text-sm font-medium mt-1">{claim.cropType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase">Area</p>
                    <p className="text-sm font-medium mt-1">
                      {claim.areaAffected}
                    </p>
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
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
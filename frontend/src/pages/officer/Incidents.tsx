import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Input, StatusBadge, Badge } from "@/components/ui";
import { Search } from "lucide-react";
import {
  mockIncidents,
  damageTypeMeta,
  type IncidentStatus,
} from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

const filters: { value: "all" | IncidentStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "acknowledged", label: "Acknowledged" },
  { value: "verified", label: "Verified" },
  { value: "approved", label: "Approved" },
  { value: "paid", label: "Paid" },
];

export default function Incidents() {
  const navigate = useNavigate();
  const { canSeeAnimalOnly } = useAuth();
  const [filter, setFilter] = useState<"all" | IncidentStatus>("all");
  const [query, setQuery] = useState("");

  const base = canSeeAnimalOnly
    ? mockIncidents.filter((i) => i.type === "animal")
    : mockIncidents;

  const filtered = base.filter((incident) => {
    const matchesFilter =
      filter === "all" || incident.status === filter;
    const matchesQuery =
      !query ||
      incident.title.toLowerCase().includes(query.toLowerCase()) ||
      incident.id.toLowerCase().includes(query.toLowerCase()) ||
      incident.animalSpecies?.toLowerCase().includes(query.toLowerCase()) ||
      incident.cropType.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {canSeeAnimalOnly ? "Animal Damage Incidents" : "All Incidents"}
        </h1>
        <p className="text-sm text-muted">
          {canSeeAnimalOnly
            ? "You see only incidents caused by animals"
            : "Manage and respond to every crop damage report"}
        </p>
      </div>

      <Card>
        <CardBody>
          <Input
            placeholder="Search by title, ID, or crop..."
            leftIcon={<Search className="h-4 w-4" />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex gap-2 mt-4 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === f.value
                    ? "bg-primary text-white"
                    : "bg-appbg text-gray-700 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardBody className="text-center py-8 text-sm text-muted">
              No incidents match your filters.
            </CardBody>
          </Card>
        ) : (
          filtered.map((incident) => {
            const meta = damageTypeMeta[incident.type];
            return (
              <Card
                key={incident.id}
                interactive
                onClick={() =>
                  navigate(`/officer/incidents/${incident.id}`)
                }
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{meta.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-mono text-muted">
                        {incident.id}
                      </p>
                      <Badge tone="neutral">{incident.severity}</Badge>
                    </div>
                    <p className="text-base font-semibold truncate">
                      {incident.title}
                    </p>
                    <p className="text-xs text-muted mt-1">
                      {incident.location.village},{" "}
                      {incident.location.district} ·{" "}
                      {incident.reporterName}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <StatusBadge status={incident.status} />
                    <p className="text-xs text-muted mt-2">
                      {new Date(incident.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
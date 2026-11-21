import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  StatusBadge,
} from "@/components/ui";
import { mockIncidents, damageTypeMeta } from "@/data/mockData";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function IncidentMap() {
  const [filter, setFilter] = useState<"all" | string>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filtered = mockIncidents.filter(
    (i) => filter === "all" || i.type === filter
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Incident Map</h1>
        <p className="text-sm text-muted">
          Recent crop damage incidents in your area
        </p>
      </div>

      <Card padding="none">
        <CardHeader className="p-4 mb-0 border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" /> Live Map
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "bg-appbg text-muted hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {Object.entries(damageTypeMeta).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  filter === key
                    ? "bg-primary text-white"
                    : "bg-appbg text-muted hover:bg-gray-200"
                }`}
              >
                {meta.emoji} {meta.label}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {mounted && (
            <MapContainer
              center={[11.6655, 76.6345]}
              zoom={12}
              style={{ height: "500px", width: "100%" }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map((inc) => (
                <Marker
                  key={inc.id}
                  position={[inc.location.lat, inc.location.lng]}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <p className="font-semibold text-sm">
                        {damageTypeMeta[inc.type].emoji} {inc.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {inc.location.village}
                      </p>
                      <div className="mt-2">
                        <StatusBadge status={inc.status} />
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents ({filtered.length})</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {filtered.map((inc) => (
              <div
                key={inc.id}
                className="flex items-center gap-3 p-3 rounded-md border border-border"
              >
                <div className="text-2xl">
                  {damageTypeMeta[inc.type].emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{inc.title}</p>
                  <p className="text-xs text-muted">
                    {inc.location.village} ·{" "}
                    {new Date(inc.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={inc.status} />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
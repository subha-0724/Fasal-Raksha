import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  StatusBadge,
} from "@/components/ui";

import { mockIncidents } from "@/data/mockData";

import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LiveMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">
          Live Map
        </h1>

        <p className="text-sm text-muted">
          All incidents and field activity
        </p>
      </div>

      <Card padding="none">
        <CardHeader className="p-4 mb-0 border-b border-border">
          <CardTitle>
            All Incidents & Team Locations
          </CardTitle>
        </CardHeader>

        <CardBody className="p-0">
          {mounted && (
            <MapContainer
              center={[11.6655, 76.6345]}
              zoom={12}
              style={{
                height: "600px",
                width: "100%",
              }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {mockIncidents.map((incident) => (
                <Marker
                  key={incident.id}
                  position={[
                    incident.location.lat,
                    incident.location.lng,
                  ]}
                >
                  <Popup>
                    <p className="font-semibold text-sm">
                      {incident.title}
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      {incident.location.village}
                    </p>

                    <div className="mt-2">
                      <StatusBadge
                        status={incident.status}
                      />
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
import { useState } from "react";
import {
  Megaphone,
  MapPin,
} from "lucide-react";

import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  Textarea,
  Alert,
} from "@/components/ui";

export default function Broadcast() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Megaphone className="h-6 w-6" />
          Broadcast Alert
        </h1>

        <p className="text-sm text-muted">
          Send a verified alert to farmers in a
          specific area
        </p>
      </div>

      {sent && (
        <Alert
          variant="success"
          title="Alert sent"
          onClose={() => setSent(false)}
        >
          Your broadcast has been delivered to
          farmers in the selected zone.
        </Alert>
      )}

      <Card>
        <CardBody className="space-y-4">
          <Input
            label="Alert title"
            placeholder="E.g., Elephant herd movement detected"
          />

          <Textarea
            label="Message"
            placeholder="Details for farmers..."
          />

          <Select
            label="Severity"
            options={[
              {
                value: "info",
                label: "Info",
              },
              {
                value: "warning",
                label: "Warning",
              },
              {
                value: "danger",
                label: "Danger",
              },
            ]}
          />

          <div className="border border-border rounded-md p-4 bg-appbg">
            <p className="text-sm font-medium flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4" />
              Target area
            </p>

            <Input
              placeholder="Village or draw on map..."
            />

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="Latitude"
                defaultValue="11.6655"
              />

              <Input
                label="Longitude"
                defaultValue="76.6345"
              />

              <Input
                label="Radius (km)"
                defaultValue="5"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setSent(true)}>
              Send Alert
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
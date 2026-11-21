import { useState } from "react";
import {
  ShieldAlert,
  MapPin,
} from "lucide-react";

import {
  Button,
  Card,
  CardBody,
  Alert,
} from "@/components/ui";

export default function SOS() {
  const [active, setActive] = useState(false);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-red-600" />
          Officer SOS
        </h1>

        <p className="text-sm text-muted">
          Emergency signal to control room and nearby
          officers
        </p>
      </div>

      {active && (
        <Alert
          variant="danger"
          title="SOS ACTIVE"
        >
          Your location has been shared with the
          control room and nearby officers. Help is
          on the way.
        </Alert>
      )}

      <Card>
        <CardBody className="text-center py-12">
          <button
            type="button"
            aria-label={
              active
                ? "Cancel SOS"
                : "Activate SOS"
            }
            onClick={() =>
              setActive((current) => !current)
            }
            className={`h-40 w-40 rounded-full mx-auto flex flex-col items-center justify-center text-white font-bold text-xl transition-all ${
              active
                ? "bg-red-700 animate-pulse"
                : "bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl"
            }`}
          >
            <ShieldAlert className="h-12 w-12 mb-2" />

            {active
              ? "SOS ACTIVE"
              : "PRESS SOS"}
          </button>

          <p className="text-sm text-muted mt-6 flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            Lat 11.6655, Lng 76.6345
          </p>

          {active && (
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setActive(false)}
            >
              Cancel SOS
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
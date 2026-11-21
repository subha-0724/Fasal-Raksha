
import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { cropRates } from "@/data/mockData";
import { Input, Select, Alert, Card, CardBody } from "@/components/ui";

export default function CompensationEstimator() {
  const [cropType, setCropType] = useState("");
  const [area, setArea] = useState("");

  const estimatedAmount = useMemo(() => {
    const acres = Number(area);

    if (
      !cropType ||
      !Number.isFinite(acres) ||
      acres <= 0
    ) {
      return 0;
    }

    const rate = cropRates[cropType];

    if (rate === undefined) return 0;

    return rate * acres;
  }, [cropType, area]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">
            Compensation Estimator
          </h2>
        </div>

        <p className="text-sm text-muted">
          Estimate the indicative crop-loss amount based on crop
          type and affected land area.
        </p>

        <Select
          label="Crop type"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          placeholder="Select your crop"
          options={Object.keys(cropRates).map((crop) => ({
            value: crop,
            label: crop,
          }))}
        />

        <Input
          label="Affected area (acres)"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Example: 2.5"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
          <p className="text-sm text-muted">
            Estimated amount
          </p>

          <p className="text-2xl font-bold text-primary mt-1">
            {formatCurrency(estimatedAmount)}
          </p>

          {cropType && (
            <p className="text-xs text-muted mt-2">
              Rate: {formatCurrency(cropRates[cropType])} per acre
            </p>
          )}
        </div>

        <Alert variant="info">
          This is an indicative project estimate based on sample
          crop rates. It is not an official insurance calculation
          or guaranteed payout. Actual compensation depends on
          policy terms and verification.
        </Alert>
      </CardBody>
    </Card>
  );
}

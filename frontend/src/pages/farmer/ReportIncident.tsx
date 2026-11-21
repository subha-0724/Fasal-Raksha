
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LocateFixed,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  Textarea,
  Alert,
} from "@/components/ui";

import {
  incidentSchema,
  type IncidentInput,
} from "@/lib/validators/incident";

import {
  damageTypeMeta,
  type IncidentType,
  cropRates,
} from "@/data/mockData";

import DocumentUpload from "@/components/DocumentUpload";
import CompensationEstimator from "@/components/CompensationEstimator";

type Step = 1 | 2 | 3 | 4;

export default function ReportIncident() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState("");
  const [manualLatitude, setManualLatitude] = useState("");
  const [manualLongitude, setManualLongitude] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IncidentInput>({
    resolver: zodResolver(incidentSchema),
    mode: "onTouched",
    defaultValues: {
      type: "flood",
      title: "",
      description: "",
      severity: "medium",
      cropType: "",
      areaAffected: "",
      latitude: Number.NaN,
      longitude: Number.NaN,
      village: "",
      district: "",
      animalSpecies: "",
    },
  });

  const selectedType = watch("type");

  const typeOptions: IncidentType[] = [
    "flood",
    "rain",
    "animal",
    "pest",
    "other",
  ];

  const handleNext = async () => {
    let fieldsValid = false;

    if (step === 1) {
      fieldsValid = await trigger(["type", "title"]);
    } else if (step === 2) {
      fieldsValid = await trigger([
        "description",
        "severity",
        "cropType",
        "areaAffected",
      ]);
    } else {
      fieldsValid = true;
    }

    if (fieldsValid && step < 4) {
      setStep((current) => (current + 1) as Step);
    }
  };

  const captureGPS = () => {
    if (!navigator.geolocation) {
      setGpsError("GPS is not supported by this browser.");
      return;
    }

    setGpsLoading(true);
    setGpsError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setManualLatitude(latitude.toFixed(6));
        setManualLongitude(longitude.toFixed(6));

        setValue("latitude", latitude, {
          shouldValidate: true,
        });

        setValue("longitude", longitude, {
          shouldValidate: true,
        });

        setGpsLoading(false);
      },
      () => {
        setGpsError(
          "Unable to access your location. Allow location permission or enter coordinates manually."
        );
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleReportSubmit = async (data: IncidentInput) => {
    setSubmitting(true);

    try {
      // Frontend demo only.
      // API submission and file upload will be connected later.

      console.log("Validated incident report:", data);
      console.log("Selected evidence files:", files);

      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <div className="h-16 w-16 rounded-full bg-success/10 text-success mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h1 className="text-2xl font-bold mb-2">
          Report Prepared Successfully!
        </h1>

        <p className="text-muted mb-4">
          Your incident details passed frontend validation.
          The backend submission will be enabled in a later phase.
        </p>

        {selectedType === "animal" && (
          <Alert variant="info" className="mb-6">
            Animal damage reports will be routed to both the
            Agriculture Officer and Forest Officer when backend
            notifications are connected.
          </Alert>
        )}

        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/farmer")}
          >
            Back to Dashboard
          </Button>

          <Button
            onClick={() => {
              setDone(false);
              setStep(1);
              setFiles([]);
            }}
          >
            Create Another Report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Progress indicator */}
      <div className="flex items-center mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className="flex items-center flex-1 last:flex-initial"
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                s === step
                  ? "bg-primary text-white"
                  : s < step
                  ? "bg-primary/20 text-primary"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {s < step ? "✓" : s}
            </div>

            {s < 4 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  s < step ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardBody className="pt-6">

          {/* STEP 1: Damage type and title */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-2">
                What caused the damage?
              </h2>

              <p className="text-sm text-muted mb-6">
                Select the type of damage to your crops.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {typeOptions.map((option) => {
                  const meta = damageTypeMeta[option];

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setValue("type", option, {
                          shouldValidate: true,
                        })
                      }
                      className={`p-5 rounded-lg border-2 text-center transition-all ${
                        selectedType === option
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="text-3xl mb-2">
                        {meta.emoji}
                      </div>

                      <div className="text-sm font-medium">
                        {meta.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {errors.type && (
                <p className="text-xs text-danger mt-2">
                  {errors.type.message}
                </p>
              )}

              <div className="mt-6">
                <Input
                  label="Incident title"
                  placeholder="E.g. Elephant damage to sugarcane field"
                  required
                  {...register("title")}
                  error={errors.title?.message}
                />
              </div>

              {selectedType === "animal" && (
                <Alert variant="info" className="mt-4">
                  Animal damage reports will be shared with both
                  Agriculture and Forest Officers.
                </Alert>
              )}
            </div>
          )}

          {/* STEP 2: Incident details */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">
                Tell us more
              </h2>

              <Textarea
                label="Damage description"
                placeholder="Describe what happened and how your crops were damaged..."
                required
                {...register("description")}
                error={errors.description?.message}
                helperText={`${watch("description")?.length || 0} characters (minimum 10)`}
              />

              {selectedType === "animal" && (
                <Input
                  label="Animal species (if known)"
                  placeholder="E.g. Asian Elephant"
                  {...register("animalSpecies")}
                />
              )}

              <Select
                label="Crop type"
                required
                placeholder="Select your crop"
                options={Object.keys(cropRates).map((crop) => ({
                  value: crop,
                  label: crop,
                }))}
                {...register("cropType")}
                error={errors.cropType?.message}
              />

              <Input
                label="Affected area (acres)"
                placeholder="E.g. 2 or 1.5 acres"
                required
                {...register("areaAffected")}
                error={errors.areaAffected?.message}
              />

              <Select
                label="Damage severity"
                required
                options={[
                  { value: "low", label: "Low — Minor damage" },
                  { value: "medium", label: "Medium — Significant damage" },
                  { value: "high", label: "High — Major loss" },
                  { value: "critical", label: "Critical — Emergency" },
                ]}
                {...register("severity")}
                error={errors.severity?.message}
              />

              <div className="pt-3">
                <CompensationEstimator />
              </div>
            </div>
          )}

          {/* STEP 3: Evidence upload */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-2">
                Add photos or videos
              </h2>

              <p className="text-sm text-muted mb-6">
                Evidence helps officers verify your report.
                Upload is optional.
              </p>

              <DocumentUpload
                files={files}
                onChange={setFiles}
                maxFiles={5}
              />

              <Alert variant="info" className="mt-4">
                Your files are currently held in frontend state.
                Actual server upload will be connected in a later phase.
              </Alert>
            </div>
          )}

          {/* STEP 4: Location */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-2">
                Confirm incident location
              </h2>

              <p className="text-sm text-muted mb-6">
                Capture GPS coordinates or enter them manually.
              </p>

              <div className="bg-appbg rounded-lg p-4 border border-border mb-4">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <MapPin className="h-5 w-5" />

                  <span className="text-sm font-medium">
                    Incident Location
                  </span>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Village"
                    placeholder="Enter village name"
                    required
                    {...register("village")}
                    error={errors.village?.message}
                  />

                  <Input
                    label="District"
                    placeholder="Enter district name"
                    required
                    {...register("district")}
                    error={errors.district?.message}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={captureGPS}
                    isLoading={gpsLoading}
                    leftIcon={<LocateFixed className="h-4 w-4" />}
                  >
                    Capture Current GPS Location
                  </Button>

                  {gpsError && (
                    <Alert variant="warning">
                      {gpsError}
                    </Alert>
                  )}

                  <Input
                    label="Latitude"
                    type="number"
                    step="any"
                    placeholder="Enter latitude"
                    value={manualLatitude}
                    onChange={(e) => {
                      const value = e.target.value;
                      setManualLatitude(value);

                      setValue(
                        "latitude",
                        value === "" ? Number.NaN : Number(value),
                        { shouldValidate: true }
                      );
                    }}
                    error={errors.latitude?.message}
                  />

                  <Input
                    label="Longitude"
                    type="number"
                    step="any"
                    placeholder="Enter longitude"
                    value={manualLongitude}
                    onChange={(e) => {
                      const value = e.target.value;
                      setManualLongitude(value);

                      setValue(
                        "longitude",
                        value === "" ? Number.NaN : Number(value),
                        { shouldValidate: true }
                      );
                    }}
                    error={errors.longitude?.message}
                  />
                </div>
              </div>

              <Alert variant="info">
                Please verify that the coordinates point to the
                affected field, not necessarily your current position.
              </Alert>
            </div>
          )}

        </CardBody>

        {/* Navigation */}
        <div className="px-5 py-4 border-t border-border flex justify-between">
          <Button
            type="button"
            variant="ghost"
            disabled={step === 1}
            onClick={() =>
              setStep((current) => (current - 1) as Step)
            }
            leftIcon={<ChevronLeft className="h-4 w-4" />}
          >
            Back
          </Button>

          {step < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              rightIcon={<ChevronRight className="h-4 w-4" />}
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              isLoading={submitting}
              onClick={() => {
                void handleSubmit(handleReportSubmit)();
              }}
            >
              Submit Report
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

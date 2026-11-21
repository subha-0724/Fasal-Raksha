import { z } from "zod";
import {
  incidentTypeEnum,
  incidentStatusEnum,
  severityEnum,
} from "./common";

// Wizard step 1 — basic details
export const incidentStep1Schema = z.object({
  type: incidentTypeEnum,
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Please add at least 10 characters of detail"),
  severity: severityEnum,
});

// Wizard step 2 — crop + area
export const incidentStep2Schema = z.object({
  cropType: z.string().trim().min(1, "Select a crop"),
  areaAffected: z
    .string()
    .trim()
    .regex(/^\d+(\.\d+)?\s*(acre|acres)?$/i, "Enter area, e.g. 2 or 1.5 acres"),
});

// Wizard step 3 — location (GPS or manual)
export const incidentStep3Schema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  village: z.string().trim().min(1, "Village is required"),
  district: z.string().trim().min(1, "District is required"),
});

// Combined (full submission)
export const incidentSchema = incidentStep1Schema
  .merge(incidentStep2Schema)
  .merge(incidentStep3Schema)
  .extend({
    animalSpecies: z.string().trim().optional(),
  });

export type IncidentInput = z.infer<typeof incidentSchema>;

// Officer transition update — status machine is enforced in Step 7
export const incidentUpdateSchema = z.object({
  status: incidentStatusEnum,
  note: z.string().trim().optional(),
});

export type IncidentUpdateInput = z.infer<typeof incidentUpdateSchema>;
import { z } from "zod";

// Mirrors IncidentType in mockData.ts — DO NOT add values without updating mockData.ts
export const incidentTypeEnum = z.enum([
  "flood",
  "rain",
  "animal",
  "pest",
  "other",
]);

// Mirrors IncidentStatus in mockData.ts
export const incidentStatusEnum = z.enum([
  "pending",
  "acknowledged",
  "verified",
  "approved",
  "rejected",
  "paid",
]);

// Mirrors Claim["status"] in mockData.ts — NOTE: different from IncidentStatus
export const claimStatusEnum = z.enum([
  "submitted",
  "under_review",
  "approved",
  "rejected",
  "paid",
]);

export const severityEnum = z.enum(["low", "medium", "high", "critical"]);

export const userRoleEnum = z.enum([
  "farmer",
  "agri_officer",
  "forest_officer",
  "admin",
]);

// Indian phone — digits only, 10 digits, optional +91 / spaces tolerated
export const phoneSchema = z
  .string()
  .trim()
  .refine((v) => /^(\+91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/\s|-/g, "")), {
    message: "Enter a valid 10-digit Indian mobile number",
  });

// Password — min 8 chars, at least one letter and one digit
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Za-z]/, "Password must contain a letter")
  .regex(/\d/, "Password must contain a number");
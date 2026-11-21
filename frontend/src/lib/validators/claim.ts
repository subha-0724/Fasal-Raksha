
import { z } from "zod";
import { claimStatusEnum } from "./common";

// Farmer claim submission validation
export const claimSchema = z.object({
  incidentId: z
    .string()
    .trim()
    .min(1, "Incident ID is required"),

  farmerName: z
    .string()
    .trim()
    .min(2, "Farmer name is required"),

  cropType: z
    .string()
    .trim()
    .min(1, "Select a crop"),

  areaAffected: z
    .string()
    .trim()
    .regex(
      /^\d+(\.\d+)?\s*(acre|acres)?$/i,
      "Enter a valid area, e.g. 2 acres"
    ),

  claimAmount: z.coerce
    .number()
    .positive("Claim amount must be greater than zero"),
});

export type ClaimInput = z.infer<typeof claimSchema>;

// Officer claim review validation
export const claimUpdateSchema = z.object({
  status: claimStatusEnum,

  approvedAmount: z.coerce
    .number()
    .nonnegative("Approved amount cannot be negative")
    .optional(),

  verifiedBy: z.string().trim().optional(),
});

export type ClaimUpdateInput = z.infer<
  typeof claimUpdateSchema
>;
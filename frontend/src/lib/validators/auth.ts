import { z } from "zod";
import { userRoleEnum, phoneSchema, passwordSchema } from "./common";

export const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(1, "Password is required"),
  role: userRoleEnum,
});

export type LoginInput = z.infer<typeof loginSchema>;

// Register: role-conditional fields via superRefine
export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    phone: phoneSchema,
    password: passwordSchema,
    role: userRoleEnum,
    // Farmer fields
    village: z.string().trim().optional(),
    district: z.string().trim().optional(),
    // Officer fields
    employeeId: z.string().trim().optional(),
    department: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "farmer") {
      if (!data.village || data.village.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["village"],
          message: "Village is required for farmers",
        });
      }
      if (!data.district || data.district.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["district"],
          message: "District is required for farmers",
        });
      }
    }
    if (data.role === "agri_officer" || data.role === "forest_officer") {
      if (!data.employeeId || data.employeeId.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["employeeId"],
          message: "Employee ID is required for officers",
        });
      }
      if (!data.department || data.department.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["department"],
          message: "Department is required for officers",
        });
      }
    }
  });

export type RegisterInput = z.infer<typeof registerSchema>;
import { z } from "zod";

export const updateUserRoleSchema = z.object({
  role: z.enum(["VIEWER", "ANALYST", "ADMIN"]),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type UpdateUserRolePayload = z.infer<typeof updateUserRoleSchema>;
export type UpdateUserStatusPayload = z.infer<typeof updateUserStatusSchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;

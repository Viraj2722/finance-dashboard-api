import { z } from "zod";
export declare const updateUserRoleSchema: z.ZodObject<{
    role: z.ZodEnum<["VIEWER", "ANALYST", "ADMIN"]>;
}, "strip", z.ZodTypeAny, {
    role: "VIEWER" | "ANALYST" | "ADMIN";
}, {
    role: "VIEWER" | "ANALYST" | "ADMIN";
}>;
export declare const updateUserStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["ACTIVE", "INACTIVE"]>;
}, "strip", z.ZodTypeAny, {
    status: "ACTIVE" | "INACTIVE";
}, {
    status: "ACTIVE" | "INACTIVE";
}>;
export declare const listUsersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type UpdateUserRolePayload = z.infer<typeof updateUserRoleSchema>;
export type UpdateUserStatusPayload = z.infer<typeof updateUserStatusSchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;

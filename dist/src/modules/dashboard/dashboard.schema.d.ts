import { z } from "zod";
export declare const dashboardTrendsQuerySchema: z.ZodObject<{
    period: z.ZodDefault<z.ZodEnum<["monthly"]>>;
}, "strip", z.ZodTypeAny, {
    period: "monthly";
}, {
    period?: "monthly" | undefined;
}>;
export type DashboardTrendsQuery = z.infer<typeof dashboardTrendsQuerySchema>;

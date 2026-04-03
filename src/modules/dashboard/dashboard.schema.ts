import { z } from "zod";

export const dashboardTrendsQuerySchema = z.object({
  period: z.enum(["monthly"]).default("monthly"),
});

export type DashboardTrendsQuery = z.infer<typeof dashboardTrendsQuerySchema>;

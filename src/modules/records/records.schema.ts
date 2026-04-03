import { z } from "zod";

export const createRecordSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.enum([
    "SALARY",
    "FOOD",
    "TRANSPORT",
    "UTILITIES",
    "ENTERTAINMENT",
    "HEALTHCARE",
    "OTHER",
  ]),
  date: z.string().datetime(),
  notes: z.string().optional(),
});

export const updateRecordSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0").optional(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  category: z
    .enum([
      "SALARY",
      "FOOD",
      "TRANSPORT",
      "UTILITIES",
      "ENTERTAINMENT",
      "HEALTHCARE",
      "OTHER",
    ])
    .optional(),
  date: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export const listRecordsQuerySchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  category: z
    .enum([
      "SALARY",
      "FOOD",
      "TRANSPORT",
      "UTILITIES",
      "ENTERTAINMENT",
      "HEALTHCARE",
      "OTHER",
    ])
    .optional(),
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
}).refine(
  (query) => {
    if (!query.startDate || !query.endDate) {
      return true;
    }
    return new Date(query.startDate) <= new Date(query.endDate);
  },
  {
    message: "startDate must be before or equal to endDate",
    path: ["endDate"],
  }
);

export type CreateRecordPayload = z.infer<typeof createRecordSchema>;
export type UpdateRecordPayload = z.infer<typeof updateRecordSchema>;
export type ListRecordsQuery = z.infer<typeof listRecordsQuerySchema>;

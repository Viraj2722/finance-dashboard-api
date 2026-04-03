import { z } from "zod";

export const createRecordSchema = z.object({
  amount: z.string().transform((val) => parseFloat(val)),
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
  amount: z
    .string()
    .transform((val) => parseFloat(val))
    .optional(),
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
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

export type CreateRecordPayload = z.infer<typeof createRecordSchema>;
export type UpdateRecordPayload = z.infer<typeof updateRecordSchema>;
export type ListRecordsQuery = z.infer<typeof listRecordsQuerySchema>;

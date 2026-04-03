import { z } from "zod";
export declare const createRecordSchema: z.ZodObject<{
    amount: z.ZodEffects<z.ZodString, number, string>;
    type: z.ZodEnum<["INCOME", "EXPENSE"]>;
    category: z.ZodEnum<["SALARY", "FOOD", "TRANSPORT", "UTILITIES", "ENTERTAINMENT", "HEALTHCARE", "OTHER"]>;
    date: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "INCOME" | "EXPENSE";
    date: string;
    amount: number;
    category: "SALARY" | "FOOD" | "TRANSPORT" | "UTILITIES" | "ENTERTAINMENT" | "HEALTHCARE" | "OTHER";
    notes?: string | undefined;
}, {
    type: "INCOME" | "EXPENSE";
    date: string;
    amount: string;
    category: "SALARY" | "FOOD" | "TRANSPORT" | "UTILITIES" | "ENTERTAINMENT" | "HEALTHCARE" | "OTHER";
    notes?: string | undefined;
}>;
export declare const updateRecordSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
    type: z.ZodOptional<z.ZodEnum<["INCOME", "EXPENSE"]>>;
    category: z.ZodOptional<z.ZodEnum<["SALARY", "FOOD", "TRANSPORT", "UTILITIES", "ENTERTAINMENT", "HEALTHCARE", "OTHER"]>>;
    date: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "INCOME" | "EXPENSE" | undefined;
    date?: string | undefined;
    amount?: number | undefined;
    category?: "SALARY" | "FOOD" | "TRANSPORT" | "UTILITIES" | "ENTERTAINMENT" | "HEALTHCARE" | "OTHER" | undefined;
    notes?: string | undefined;
}, {
    type?: "INCOME" | "EXPENSE" | undefined;
    date?: string | undefined;
    amount?: string | undefined;
    category?: "SALARY" | "FOOD" | "TRANSPORT" | "UTILITIES" | "ENTERTAINMENT" | "HEALTHCARE" | "OTHER" | undefined;
    notes?: string | undefined;
}>;
export declare const listRecordsQuerySchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["INCOME", "EXPENSE"]>>;
    category: z.ZodOptional<z.ZodEnum<["SALARY", "FOOD", "TRANSPORT", "UTILITIES", "ENTERTAINMENT", "HEALTHCARE", "OTHER"]>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    type?: "INCOME" | "EXPENSE" | undefined;
    category?: "SALARY" | "FOOD" | "TRANSPORT" | "UTILITIES" | "ENTERTAINMENT" | "HEALTHCARE" | "OTHER" | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    type?: "INCOME" | "EXPENSE" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    category?: "SALARY" | "FOOD" | "TRANSPORT" | "UTILITIES" | "ENTERTAINMENT" | "HEALTHCARE" | "OTHER" | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export type CreateRecordPayload = z.infer<typeof createRecordSchema>;
export type UpdateRecordPayload = z.infer<typeof updateRecordSchema>;
export type ListRecordsQuery = z.infer<typeof listRecordsQuerySchema>;

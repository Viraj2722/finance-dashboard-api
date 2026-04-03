"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRecordsQuerySchema = exports.updateRecordSchema = exports.createRecordSchema = void 0;
const zod_1 = require("zod");
exports.createRecordSchema = zod_1.z.object({
    amount: zod_1.z.coerce.number().positive("Amount must be greater than 0"),
    type: zod_1.z.enum(["INCOME", "EXPENSE"]),
    category: zod_1.z.enum([
        "SALARY",
        "FOOD",
        "TRANSPORT",
        "UTILITIES",
        "ENTERTAINMENT",
        "HEALTHCARE",
        "OTHER",
    ]),
    date: zod_1.z.string().datetime(),
    notes: zod_1.z.string().optional(),
});
exports.updateRecordSchema = zod_1.z.object({
    amount: zod_1.z.coerce.number().positive("Amount must be greater than 0").optional(),
    type: zod_1.z.enum(["INCOME", "EXPENSE"]).optional(),
    category: zod_1.z
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
    date: zod_1.z.string().datetime().optional(),
    notes: zod_1.z.string().optional(),
});
exports.listRecordsQuerySchema = zod_1.z.object({
    type: zod_1.z.enum(["INCOME", "EXPENSE"]).optional(),
    category: zod_1.z
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
    startDate: zod_1.z.string().date().optional(),
    endDate: zod_1.z.string().date().optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
}).refine((query) => {
    if (!query.startDate || !query.endDate) {
        return true;
    }
    return new Date(query.startDate) <= new Date(query.endDate);
}, {
    message: "startDate must be before or equal to endDate",
    path: ["endDate"],
});
//# sourceMappingURL=records.schema.js.map
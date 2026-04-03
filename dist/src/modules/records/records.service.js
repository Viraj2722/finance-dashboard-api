"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordsService = exports.RecordsService = void 0;
const db_1 = require("../../config/db");
const errors_1 = require("../../utils/errors");
const library_1 = require("@prisma/client/runtime/library");
class RecordsService {
    async createRecord(payload, createdById) {
        const record = await db_1.prisma.financialRecord.create({
            data: {
                amount: new library_1.Decimal(Math.abs(payload.amount)),
                type: payload.type,
                category: payload.category,
                date: new Date(payload.date),
                notes: payload.notes,
                createdById,
            },
            select: {
                id: true,
                amount: true,
                type: true,
                category: true,
                date: true,
                notes: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return {
            ...record,
            amount: record.amount.toString(),
        };
    }
    async listRecords(query) {
        const skip = (query.page - 1) * query.limit;
        // Build filter conditions
        const where = { isDeleted: false };
        if (query.type) {
            where.type = query.type;
        }
        if (query.category) {
            where.category = query.category;
        }
        if (query.startDate) {
            where.date = { gte: new Date(query.startDate) };
        }
        if (query.endDate) {
            const endOfDay = new Date(query.endDate);
            endOfDay.setHours(23, 59, 59, 999);
            if (where.date) {
                where.date.lte = endOfDay;
            }
            else {
                where.date = { lte: endOfDay };
            }
        }
        const [records, total] = await Promise.all([
            db_1.prisma.financialRecord.findMany({
                where,
                select: {
                    id: true,
                    amount: true,
                    type: true,
                    category: true,
                    date: true,
                    notes: true,
                    createdBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    createdAt: true,
                    updatedAt: true,
                },
                skip,
                take: query.limit,
                orderBy: { date: "desc" },
            }),
            db_1.prisma.financialRecord.count({ where }),
        ]);
        return {
            records: records.map((r) => ({
                ...r,
                amount: r.amount.toString(),
            })),
            pagination: {
                total,
                page: query.page,
                limit: query.limit,
                totalPages: Math.ceil(total / query.limit),
            },
        };
    }
    async getRecordById(recordId) {
        const record = await db_1.prisma.financialRecord.findUnique({
            where: { id: recordId },
            select: {
                id: true,
                amount: true,
                type: true,
                category: true,
                date: true,
                notes: true,
                isDeleted: true,
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!record || record.isDeleted) {
            throw new errors_1.NotFoundError(`Record with ID ${recordId} not found`);
        }
        return {
            ...record,
            amount: record.amount.toString(),
        };
    }
    async updateRecord(recordId, payload) {
        const record = await db_1.prisma.financialRecord.findUnique({
            where: { id: recordId },
        });
        if (!record || record.isDeleted) {
            throw new errors_1.NotFoundError(`Record with ID ${recordId} not found`);
        }
        const updateData = {};
        if (payload.amount !== undefined) {
            updateData.amount = new library_1.Decimal(Math.abs(payload.amount));
        }
        if (payload.type !== undefined) {
            updateData.type = payload.type;
        }
        if (payload.category !== undefined) {
            updateData.category = payload.category;
        }
        if (payload.date !== undefined) {
            updateData.date = new Date(payload.date);
        }
        if (payload.notes !== undefined) {
            updateData.notes = payload.notes;
        }
        const updatedRecord = await db_1.prisma.financialRecord.update({
            where: { id: recordId },
            data: updateData,
            select: {
                id: true,
                amount: true,
                type: true,
                category: true,
                date: true,
                notes: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return {
            ...updatedRecord,
            amount: updatedRecord.amount.toString(),
        };
    }
    async deleteRecord(recordId) {
        const record = await db_1.prisma.financialRecord.findUnique({
            where: { id: recordId },
        });
        if (!record || record.isDeleted) {
            throw new errors_1.NotFoundError(`Record with ID ${recordId} not found`);
        }
        const deletedRecord = await db_1.prisma.financialRecord.update({
            where: { id: recordId },
            data: { isDeleted: true },
            select: {
                id: true,
                amount: true,
                type: true,
                category: true,
                date: true,
                notes: true,
            },
        });
        return {
            ...deletedRecord,
            amount: deletedRecord.amount.toString(),
        };
    }
}
exports.RecordsService = RecordsService;
exports.recordsService = new RecordsService();
//# sourceMappingURL=records.service.js.map
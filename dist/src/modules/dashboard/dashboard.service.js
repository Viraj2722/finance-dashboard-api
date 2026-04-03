"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = exports.DashboardService = void 0;
const db_1 = require("../../config/db");
const library_1 = require("@prisma/client/runtime/library");
class DashboardService {
    async getSummary() {
        // Get all non-deleted records
        const records = await db_1.prisma.financialRecord.findMany({
            where: { isDeleted: false },
            select: {
                amount: true,
                type: true,
            },
        });
        let totalIncome = new library_1.Decimal(0);
        let totalExpenses = new library_1.Decimal(0);
        for (const record of records) {
            if (record.type === "INCOME") {
                totalIncome = totalIncome.plus(record.amount);
            }
            else {
                totalExpenses = totalExpenses.plus(record.amount);
            }
        }
        const netBalance = totalIncome.minus(totalExpenses);
        return {
            totalIncome: totalIncome.toString(),
            totalExpenses: totalExpenses.toString(),
            netBalance: netBalance.toString(),
            totalRecords: records.length,
        };
    }
    async getByCategory() {
        const records = await db_1.prisma.financialRecord.findMany({
            where: { isDeleted: false },
            select: {
                amount: true,
                type: true,
                category: true,
            },
        });
        // Group by category and type
        const grouped = {};
        for (const record of records) {
            if (!grouped[record.category]) {
                grouped[record.category] = {
                    INCOME: new library_1.Decimal(0),
                    EXPENSE: new library_1.Decimal(0),
                };
            }
            if (record.type === "INCOME") {
                grouped[record.category].INCOME = grouped[record.category].INCOME.plus(record.amount);
            }
            else {
                grouped[record.category].EXPENSE = grouped[record.category].EXPENSE.plus(record.amount);
            }
        }
        // Format the response
        const result = Object.entries(grouped).map(([category, amounts]) => ({
            category,
            income: amounts.INCOME.toString(),
            expense: amounts.EXPENSE.toString(),
            net: amounts.INCOME.minus(amounts.EXPENSE).toString(),
        }));
        return result;
    }
    async getTrends(query) {
        if (query.period !== "monthly") {
            throw new Error("Only monthly period is supported");
        }
        // Get last 6 months of data using raw SQL
        const trends = await db_1.prisma.$queryRaw `
      SELECT 
        DATE_TRUNC('month', "date") as month,
        SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as totalIncome,
        SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as totalExpenses
      FROM financial_records
      WHERE "isDeleted" = false
        AND "date" >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', "date")
      ORDER BY month DESC
    `;
        return trends.map((t) => ({
            month: t.month.toISOString(),
            totalIncome: t.totalIncome === null ? "0" : t.totalIncome.toString(),
            totalExpenses: t.totalExpenses === null ? "0" : t.totalExpenses.toString(),
        }));
    }
    async getRecent() {
        const records = await db_1.prisma.financialRecord.findMany({
            where: { isDeleted: false },
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
            },
            orderBy: { date: "desc" },
            take: 10,
        });
        return records.map((r) => ({
            ...r,
            amount: r.amount.toString(),
        }));
    }
}
exports.DashboardService = DashboardService;
exports.dashboardService = new DashboardService();
//# sourceMappingURL=dashboard.service.js.map
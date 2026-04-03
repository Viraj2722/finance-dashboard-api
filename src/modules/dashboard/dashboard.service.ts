import { prisma } from "../../config/db";
import { Decimal } from "@prisma/client/runtime/library";
import type { DashboardTrendsQuery } from "./dashboard.schema";

export class DashboardService {
  async getSummary() {
    // Get all non-deleted records
    const records = await prisma.financialRecord.findMany({
      where: { isDeleted: false },
      select: {
        amount: true,
        type: true,
      },
    });

    let totalIncome = new Decimal(0);
    let totalExpenses = new Decimal(0);

    for (const record of records) {
      if (record.type === "INCOME") {
        totalIncome = totalIncome.plus(record.amount);
      } else {
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
    const records = await prisma.financialRecord.findMany({
      where: { isDeleted: false },
      select: {
        amount: true,
        type: true,
        category: true,
      },
    });

    // Group by category and type
    const grouped: {
      [key: string]: { INCOME: Decimal; EXPENSE: Decimal };
    } = {};

    for (const record of records) {
      if (!grouped[record.category]) {
        grouped[record.category] = {
          INCOME: new Decimal(0),
          EXPENSE: new Decimal(0),
        };
      }

      if (record.type === "INCOME") {
        grouped[record.category].INCOME = grouped[record.category].INCOME.plus(
          record.amount
        );
      } else {
        grouped[record.category].EXPENSE = grouped[record.category].EXPENSE.plus(
          record.amount
        );
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

  async getTrends(query: DashboardTrendsQuery) {
    if (query.period !== "monthly") {
      throw new Error("Only monthly period is supported");
    }

    // Get last 6 months of data using raw SQL
    const trends = await prisma.$queryRaw<
      Array<{
        month: Date;
        totalIncome: string | null;
        totalExpenses: string | null;
      }>
    >`
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

    return trends.map((t: (typeof trends)[number]) => ({
      month: t.month.toISOString(),
      totalIncome: t.totalIncome === null ? "0" : t.totalIncome.toString(),
      totalExpenses: t.totalExpenses === null ? "0" : t.totalExpenses.toString(),
    }));
  }

  async getRecent() {
    const records = await prisma.financialRecord.findMany({
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

    return records.map((r: (typeof records)[number]) => ({
      ...r,
      amount: r.amount.toString(),
    }));
  }
}

export const dashboardService = new DashboardService();

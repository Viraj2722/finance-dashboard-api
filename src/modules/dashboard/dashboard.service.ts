import { prisma } from "../../config/db";
import { Decimal } from "@prisma/client/runtime/library";
import type { DashboardTrendsQuery } from "./dashboard.schema";

export class DashboardService {
  async getSummary() {
    const [incomeAgg, expenseAgg, totalRecords] = await Promise.all([
      prisma.financialRecord.aggregate({
        where: { isDeleted: false, type: "INCOME" },
        _sum: { amount: true },
      }),
      prisma.financialRecord.aggregate({
        where: { isDeleted: false, type: "EXPENSE" },
        _sum: { amount: true },
      }),
      prisma.financialRecord.count({ where: { isDeleted: false } }),
    ]);

    const totalIncome = incomeAgg._sum.amount ?? new Decimal(0);
    const totalExpenses = expenseAgg._sum.amount ?? new Decimal(0);
    const netBalance = totalIncome.minus(totalExpenses);

    return {
      totalIncome: totalIncome.toString(),
      totalExpenses: totalExpenses.toString(),
      netBalance: netBalance.toString(),
      totalRecords,
    };
  }

  async getByCategory() {
    const groupedRows = await prisma.financialRecord.groupBy({
      by: ["category", "type"],
      where: { isDeleted: false },
      _sum: {
        amount: true,
      },
    });

    // Convert grouped rows into category totals split by type.
    const grouped: {
      [key: string]: { INCOME: Decimal; EXPENSE: Decimal };
    } = {};

    for (const row of groupedRows) {
      if (!grouped[row.category]) {
        grouped[row.category] = {
          INCOME: new Decimal(0),
          EXPENSE: new Decimal(0),
        };
      }

      const amount = row._sum.amount ?? new Decimal(0);

      if (row.type === "INCOME") {
        grouped[row.category].INCOME = grouped[row.category].INCOME.plus(
          amount
        );
      } else {
        grouped[row.category].EXPENSE = grouped[row.category].EXPENSE.plus(
          amount
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

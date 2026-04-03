import type { DashboardTrendsQuery } from "./dashboard.schema";
export declare class DashboardService {
    getSummary(): Promise<{
        totalIncome: string;
        totalExpenses: string;
        netBalance: string;
        totalRecords: number;
    }>;
    getByCategory(): Promise<{
        category: string;
        income: string;
        expense: string;
        net: string;
    }[]>;
    getTrends(query: DashboardTrendsQuery): Promise<{
        month: string;
        totalIncome: string;
        totalExpenses: string;
    }[]>;
    getRecent(): Promise<{
        amount: string;
        type: import(".prisma/client").$Enums.RecordType;
        id: string;
        createdAt: Date;
        date: Date;
        category: import(".prisma/client").$Enums.Category;
        notes: string | null;
        createdBy: {
            name: string;
            email: string;
            id: string;
        };
    }[]>;
}
export declare const dashboardService: DashboardService;

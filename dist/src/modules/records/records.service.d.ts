import type { CreateRecordPayload, UpdateRecordPayload, ListRecordsQuery } from "./records.schema";
export declare class RecordsService {
    createRecord(payload: CreateRecordPayload, createdById: string): Promise<{
        amount: string;
        type: import(".prisma/client").$Enums.RecordType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        category: import(".prisma/client").$Enums.Category;
        notes: string | null;
    }>;
    listRecords(query: ListRecordsQuery): Promise<{
        records: {
            amount: string;
            type: import(".prisma/client").$Enums.RecordType;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            date: Date;
            category: import(".prisma/client").$Enums.Category;
            notes: string | null;
            createdBy: {
                name: string;
                email: string;
                id: string;
            };
        }[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getRecordById(recordId: string): Promise<{
        amount: string;
        type: import(".prisma/client").$Enums.RecordType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        category: import(".prisma/client").$Enums.Category;
        notes: string | null;
        isDeleted: boolean;
        createdBy: {
            name: string;
            email: string;
            id: string;
        };
    }>;
    updateRecord(recordId: string, payload: UpdateRecordPayload): Promise<{
        amount: string;
        type: import(".prisma/client").$Enums.RecordType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        category: import(".prisma/client").$Enums.Category;
        notes: string | null;
    }>;
    deleteRecord(recordId: string): Promise<{
        amount: string;
        type: import(".prisma/client").$Enums.RecordType;
        id: string;
        date: Date;
        category: import(".prisma/client").$Enums.Category;
        notes: string | null;
    }>;
}
export declare const recordsService: RecordsService;

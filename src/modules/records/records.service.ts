import { prisma } from "../../config/db";
import { NotFoundError } from "../../utils/errors";
import type {
  CreateRecordPayload,
  UpdateRecordPayload,
  ListRecordsQuery,
} from "./records.schema";
import { Decimal } from "@prisma/client/runtime/library";

export class RecordsService {
  async createRecord(payload: CreateRecordPayload, createdById: string) {
    const record = await prisma.financialRecord.create({
      data: {
        amount: new Decimal(payload.amount),
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

  async listRecords(query: ListRecordsQuery) {
    const skip = (query.page - 1) * query.limit;

    // Build filter conditions
    const where: any = { isDeleted: false };

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
      } else {
        where.date = { lte: endOfDay };
      }
    }

    const [records, total] = await Promise.all([
      prisma.financialRecord.findMany({
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
      prisma.financialRecord.count({ where }),
    ]);

    return {
      records: records.map((r: (typeof records)[number]) => ({
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

  async getRecordById(recordId: string) {
    const record = await prisma.financialRecord.findUnique({
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
      throw new NotFoundError(`Record with ID ${recordId} not found`);
    }

    return {
      ...record,
      amount: record.amount.toString(),
    };
  }

  async updateRecord(
    recordId: string,
    payload: UpdateRecordPayload
  ) {
    const record = await prisma.financialRecord.findUnique({
      where: { id: recordId },
    });

    if (!record || record.isDeleted) {
      throw new NotFoundError(`Record with ID ${recordId} not found`);
    }

    const updateData: any = {};

    if (payload.amount !== undefined) {
      updateData.amount = new Decimal(payload.amount);
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

    const updatedRecord = await prisma.financialRecord.update({
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

  async deleteRecord(recordId: string) {
    const record = await prisma.financialRecord.findUnique({
      where: { id: recordId },
    });

    if (!record || record.isDeleted) {
      throw new NotFoundError(`Record with ID ${recordId} not found`);
    }

    const deletedRecord = await prisma.financialRecord.update({
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

export const recordsService = new RecordsService();

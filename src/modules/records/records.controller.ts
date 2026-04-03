import { FastifyRequest, FastifyReply } from "fastify";
import { recordsService } from "./records.service";
import {
  createRecordSchema,
  updateRecordSchema,
  listRecordsQuerySchema,
} from "./records.schema";
import { successResponse } from "../../utils/response";
import { AppError } from "../../utils/errors";

export class RecordsController {
  async createRecord(request: FastifyRequest, reply: FastifyReply) {
    try {
      const validatedData = createRecordSchema.parse(request.body);
      const record = await recordsService.createRecord(
        validatedData,
        request.user!.id
      );

      reply.code(201).send(
        successResponse("Record created successfully", record)
      );
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode).send({
          success: false,
          message: error.message,
        });
      } else {
        throw error;
      }
    }
  }

  async listRecords(request: FastifyRequest, reply: FastifyReply) {
    try {
      const query = listRecordsQuerySchema.parse(request.query);
      const result = await recordsService.listRecords(query);

      reply.code(200).send(
        successResponse("Records retrieved successfully", result.records, {
          pagination: result.pagination,
        })
      );
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode).send({
          success: false,
          message: error.message,
        });
      } else {
        throw error;
      }
    }
  }

  async getRecordById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const record = await recordsService.getRecordById(id);

      reply.code(200).send(
        successResponse("Record retrieved successfully", record)
      );
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode).send({
          success: false,
          message: error.message,
        });
      } else {
        throw error;
      }
    }
  }

  async updateRecord(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const validatedData = updateRecordSchema.parse(request.body);
      const record = await recordsService.updateRecord(id, validatedData);

      reply.code(200).send(
        successResponse("Record updated successfully", record)
      );
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode).send({
          success: false,
          message: error.message,
        });
      } else {
        throw error;
      }
    }
  }

  async deleteRecord(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const record = await recordsService.deleteRecord(id);

      reply.code(200).send(
        successResponse("Record deleted successfully", record)
      );
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode).send({
          success: false,
          message: error.message,
        });
      } else {
        throw error;
      }
    }
  }
}

export const recordsController = new RecordsController();

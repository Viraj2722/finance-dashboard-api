"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordsController = exports.RecordsController = void 0;
const records_service_1 = require("./records.service");
const records_schema_1 = require("./records.schema");
const response_1 = require("../../utils/response");
const errors_1 = require("../../utils/errors");
class RecordsController {
    async createRecord(request, reply) {
        try {
            const validatedData = records_schema_1.createRecordSchema.parse(request.body);
            const record = await records_service_1.recordsService.createRecord(validatedData, request.user.id);
            reply.code(201).send((0, response_1.successResponse)("Record created successfully", record));
        }
        catch (error) {
            if (error instanceof errors_1.AppError) {
                reply.code(error.statusCode).send({
                    success: false,
                    message: error.message,
                });
            }
            else {
                throw error;
            }
        }
    }
    async listRecords(request, reply) {
        try {
            const query = records_schema_1.listRecordsQuerySchema.parse(request.query);
            const result = await records_service_1.recordsService.listRecords(query);
            reply.code(200).send((0, response_1.successResponse)("Records retrieved successfully", result.records, {
                pagination: result.pagination,
            }));
        }
        catch (error) {
            if (error instanceof errors_1.AppError) {
                reply.code(error.statusCode).send({
                    success: false,
                    message: error.message,
                });
            }
            else {
                throw error;
            }
        }
    }
    async getRecordById(request, reply) {
        try {
            const { id } = request.params;
            const record = await records_service_1.recordsService.getRecordById(id);
            reply.code(200).send((0, response_1.successResponse)("Record retrieved successfully", record));
        }
        catch (error) {
            if (error instanceof errors_1.AppError) {
                reply.code(error.statusCode).send({
                    success: false,
                    message: error.message,
                });
            }
            else {
                throw error;
            }
        }
    }
    async updateRecord(request, reply) {
        try {
            const { id } = request.params;
            const validatedData = records_schema_1.updateRecordSchema.parse(request.body);
            const record = await records_service_1.recordsService.updateRecord(id, validatedData);
            reply.code(200).send((0, response_1.successResponse)("Record updated successfully", record));
        }
        catch (error) {
            if (error instanceof errors_1.AppError) {
                reply.code(error.statusCode).send({
                    success: false,
                    message: error.message,
                });
            }
            else {
                throw error;
            }
        }
    }
    async deleteRecord(request, reply) {
        try {
            const { id } = request.params;
            const record = await records_service_1.recordsService.deleteRecord(id);
            reply.code(200).send((0, response_1.successResponse)("Record deleted successfully", record));
        }
        catch (error) {
            if (error instanceof errors_1.AppError) {
                reply.code(error.statusCode).send({
                    success: false,
                    message: error.message,
                });
            }
            else {
                throw error;
            }
        }
    }
}
exports.RecordsController = RecordsController;
exports.recordsController = new RecordsController();
//# sourceMappingURL=records.controller.js.map
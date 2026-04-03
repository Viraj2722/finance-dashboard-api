"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = exports.UsersController = void 0;
const users_service_1 = require("./users.service");
const users_schema_1 = require("./users.schema");
const response_1 = require("../../utils/response");
const errors_1 = require("../../utils/errors");
class UsersController {
    async listUsers(request, reply) {
        try {
            const query = users_schema_1.listUsersQuerySchema.parse(request.query);
            const result = await users_service_1.usersService.listUsers(query.page, query.limit);
            reply.code(200).send((0, response_1.successResponse)("Users retrieved successfully", result.users, result.pagination));
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
    async getUserById(request, reply) {
        try {
            const { id } = request.params;
            const user = await users_service_1.usersService.getUserById(id);
            reply.code(200).send((0, response_1.successResponse)("User retrieved successfully", user));
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
    async updateUserRole(request, reply) {
        try {
            const { id } = request.params;
            const validatedData = users_schema_1.updateUserRoleSchema.parse(request.body);
            const user = await users_service_1.usersService.updateUserRole(id, validatedData);
            reply.code(200).send((0, response_1.successResponse)("User role updated successfully", user));
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
    async updateUserStatus(request, reply) {
        try {
            const { id } = request.params;
            const validatedData = users_schema_1.updateUserStatusSchema.parse(request.body);
            const user = await users_service_1.usersService.updateUserStatus(id, validatedData);
            reply.code(200).send((0, response_1.successResponse)("User status updated successfully", user));
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
exports.UsersController = UsersController;
exports.usersController = new UsersController();
//# sourceMappingURL=users.controller.js.map
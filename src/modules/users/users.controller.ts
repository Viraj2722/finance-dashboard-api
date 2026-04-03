import { FastifyRequest, FastifyReply } from "fastify";
import { usersService } from "./users.service";
import {
  updateUserRoleSchema,
  updateUserStatusSchema,
  listUsersQuerySchema,
} from "./users.schema";
import { successResponse } from "../../utils/response";
import { AppError } from "../../utils/errors";

export class UsersController {
  async listUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const query = listUsersQuerySchema.parse(request.query);
      const result = await usersService.listUsers(query.page, query.limit);

      reply.code(200).send(
        successResponse("Users retrieved successfully", result.users, {
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

  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await usersService.getUserById(id);

      reply.code(200).send(successResponse("User retrieved successfully", user));
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

  async updateUserRole(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const validatedData = updateUserRoleSchema.parse(request.body);
      const user = await usersService.updateUserRole(id, validatedData);

      reply.code(200).send(successResponse("User role updated successfully", user));
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

  async updateUserStatus(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const validatedData = updateUserStatusSchema.parse(request.body);
      const user = await usersService.updateUserStatus(id, validatedData);

      reply.code(200).send(successResponse("User status updated successfully", user));
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

export const usersController = new UsersController();

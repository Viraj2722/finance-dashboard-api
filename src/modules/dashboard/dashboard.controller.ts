import { FastifyRequest, FastifyReply } from "fastify";
import { dashboardService } from "./dashboard.service";
import { dashboardTrendsQuerySchema } from "./dashboard.schema";
import { successResponse } from "../../utils/response";
import { AppError } from "../../utils/errors";

export class DashboardController {
  async getSummary(request: FastifyRequest, reply: FastifyReply) {
    try {
      const summary = await dashboardService.getSummary();
      reply.code(200).send(
        successResponse("Dashboard summary retrieved successfully", summary)
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

  async getByCategory(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await dashboardService.getByCategory();
      reply.code(200).send(
        successResponse("Category breakdown retrieved successfully", data)
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

  async getTrends(request: FastifyRequest, reply: FastifyReply) {
    try {
      const query = dashboardTrendsQuerySchema.parse(request.query);
      const trends = await dashboardService.getTrends(query);
      reply.code(200).send(
        successResponse("Trends data retrieved successfully", trends)
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

  async getRecent(request: FastifyRequest, reply: FastifyReply) {
    try {
      const records = await dashboardService.getRecent();
      reply.code(200).send(
        successResponse("Recent transactions retrieved successfully", records)
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

export const dashboardController = new DashboardController();

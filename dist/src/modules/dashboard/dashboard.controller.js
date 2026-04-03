"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = exports.DashboardController = void 0;
const dashboard_service_1 = require("./dashboard.service");
const dashboard_schema_1 = require("./dashboard.schema");
const response_1 = require("../../utils/response");
const errors_1 = require("../../utils/errors");
class DashboardController {
    async getSummary(request, reply) {
        try {
            const summary = await dashboard_service_1.dashboardService.getSummary();
            reply.code(200).send((0, response_1.successResponse)("Dashboard summary retrieved successfully", summary));
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
    async getByCategory(request, reply) {
        try {
            const data = await dashboard_service_1.dashboardService.getByCategory();
            reply.code(200).send((0, response_1.successResponse)("Category breakdown retrieved successfully", data));
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
    async getTrends(request, reply) {
        try {
            const query = dashboard_schema_1.dashboardTrendsQuerySchema.parse(request.query);
            const trends = await dashboard_service_1.dashboardService.getTrends(query);
            reply.code(200).send((0, response_1.successResponse)("Trends data retrieved successfully", trends));
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
    async getRecent(request, reply) {
        try {
            const records = await dashboard_service_1.dashboardService.getRecent();
            reply.code(200).send((0, response_1.successResponse)("Recent transactions retrieved successfully", records));
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
exports.DashboardController = DashboardController;
exports.dashboardController = new DashboardController();
//# sourceMappingURL=dashboard.controller.js.map
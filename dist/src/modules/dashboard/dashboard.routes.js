"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = dashboardRoutes;
const dashboard_controller_1 = require("./dashboard.controller");
const authenticate_1 = require("../../middleware/authenticate");
const authorize_1 = require("../../middleware/authorize");
async function dashboardRoutes(app) {
    // GET /api/dashboard/summary — VIEWER, ANALYST, ADMIN
    app.get("/api/dashboard/summary", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["VIEWER", "ANALYST", "ADMIN"])] }, (request, reply) => dashboard_controller_1.dashboardController.getSummary(request, reply));
    // GET /api/dashboard/by-category — ANALYST, ADMIN
    app.get("/api/dashboard/by-category", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["ANALYST", "ADMIN"])] }, (request, reply) => dashboard_controller_1.dashboardController.getByCategory(request, reply));
    // GET /api/dashboard/trends — ANALYST, ADMIN
    app.get("/api/dashboard/trends", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["ANALYST", "ADMIN"])] }, (request, reply) => dashboard_controller_1.dashboardController.getTrends(request, reply));
    // GET /api/dashboard/recent — VIEWER, ANALYST, ADMIN
    app.get("/api/dashboard/recent", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["VIEWER", "ANALYST", "ADMIN"])] }, (request, reply) => dashboard_controller_1.dashboardController.getRecent(request, reply));
}
//# sourceMappingURL=dashboard.routes.js.map
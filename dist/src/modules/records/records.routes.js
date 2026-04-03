"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordsRoutes = recordsRoutes;
const records_controller_1 = require("./records.controller");
const authenticate_1 = require("../../middleware/authenticate");
const authorize_1 = require("../../middleware/authorize");
async function recordsRoutes(app) {
    // POST /api/records — ADMIN only
    app.post("/api/records", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["ADMIN"])] }, (request, reply) => records_controller_1.recordsController.createRecord(request, reply));
    // GET /api/records — all authenticated roles
    app.get("/api/records", { preHandler: [authenticate_1.authenticate] }, (request, reply) => records_controller_1.recordsController.listRecords(request, reply));
    // GET /api/records/:id — all authenticated roles
    app.get("/api/records/:id", { preHandler: [authenticate_1.authenticate] }, (request, reply) => records_controller_1.recordsController.getRecordById(request, reply));
    // PATCH /api/records/:id — ADMIN only
    app.patch("/api/records/:id", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["ADMIN"])] }, (request, reply) => records_controller_1.recordsController.updateRecord(request, reply));
    // DELETE /api/records/:id — ADMIN only (soft delete)
    app.delete("/api/records/:id", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["ADMIN"])] }, (request, reply) => records_controller_1.recordsController.deleteRecord(request, reply));
}
//# sourceMappingURL=records.routes.js.map
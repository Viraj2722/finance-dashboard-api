"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = usersRoutes;
const users_controller_1 = require("./users.controller");
const authenticate_1 = require("../../middleware/authenticate");
const authorize_1 = require("../../middleware/authorize");
async function usersRoutes(app) {
    // All users routes require authentication and ADMIN role
    app.get("/api/users", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["ADMIN"])] }, (request, reply) => users_controller_1.usersController.listUsers(request, reply));
    app.get("/api/users/:id", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["ADMIN"])] }, (request, reply) => users_controller_1.usersController.getUserById(request, reply));
    app.patch("/api/users/:id/role", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["ADMIN"])] }, (request, reply) => users_controller_1.usersController.updateUserRole(request, reply));
    app.patch("/api/users/:id/status", { preHandler: [authenticate_1.authenticate, (0, authorize_1.authorize)(["ADMIN"])] }, (request, reply) => users_controller_1.usersController.updateUserStatus(request, reply));
}
//# sourceMappingURL=users.routes.js.map
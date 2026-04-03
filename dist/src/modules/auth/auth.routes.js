"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const auth_controller_1 = require("./auth.controller");
async function authRoutes(app) {
    app.post("/api/auth/register", (request, reply) => auth_controller_1.authController.register(request, reply));
    app.post("/api/auth/login", (request, reply) => auth_controller_1.authController.login(request, reply));
}
//# sourceMappingURL=auth.routes.js.map
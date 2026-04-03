"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const auth_schema_1 = require("./auth.schema");
const response_1 = require("../../utils/response");
const errors_1 = require("../../utils/errors");
class AuthController {
    async register(request, reply) {
        try {
            const validatedData = auth_schema_1.registerSchema.parse(request.body);
            const user = await auth_service_1.authService.register(validatedData);
            reply.code(201).send((0, response_1.successResponse)("User registered successfully", user));
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
    async login(request, reply) {
        try {
            const validatedData = auth_schema_1.loginSchema.parse(request.body);
            const user = await auth_service_1.authService.login(validatedData);
            // Sign JWT with 7 days expiry
            const token = request.server.jwt.sign(user, { expiresIn: "7d" });
            reply.code(200).send((0, response_1.successResponse)("Login successful", {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
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
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map
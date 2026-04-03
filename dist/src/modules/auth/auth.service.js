"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../config/db");
const errors_1 = require("../../utils/errors");
class AuthService {
    async register(payload) {
        // Check if user exists
        const existingUser = await db_1.prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (existingUser) {
            throw new errors_1.BadRequestError("User with this email already exists");
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(payload.password, 10);
        // Create user with default role VIEWER
        const user = await db_1.prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword,
                role: "VIEWER",
                status: "ACTIVE",
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
        return user;
    }
    async login(payload) {
        // Find user by email
        const user = await db_1.prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!user) {
            throw new errors_1.UnauthorizedError("Invalid email or password");
        }
        // Check if user is active
        if (user.status !== "ACTIVE") {
            throw new errors_1.UnauthorizedError("User account is inactive");
        }
        // Compare password
        const isPasswordValid = await bcryptjs_1.default.compare(payload.password, user.password);
        if (!isPasswordValid) {
            throw new errors_1.UnauthorizedError("Invalid email or password");
        }
        // Return user data for JWT payload
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status,
        };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map
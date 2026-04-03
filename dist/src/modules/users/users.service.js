"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = exports.UsersService = void 0;
const db_1 = require("../../config/db");
const errors_1 = require("../../utils/errors");
class UsersService {
    async listUsers(page, limit) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            db_1.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                },
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            db_1.prisma.user.count(),
        ]);
        return {
            users,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getUserById(userId) {
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new errors_1.NotFoundError(`User with ID ${userId} not found`);
        }
        return user;
    }
    async updateUserRole(userId, payload) {
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new errors_1.NotFoundError(`User with ID ${userId} not found`);
        }
        const updatedUser = await db_1.prisma.user.update({
            where: { id: userId },
            data: { role: payload.role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return updatedUser;
    }
    async updateUserStatus(userId, payload) {
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new errors_1.NotFoundError(`User with ID ${userId} not found`);
        }
        const updatedUser = await db_1.prisma.user.update({
            where: { id: userId },
            data: { status: payload.status },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return updatedUser;
    }
}
exports.UsersService = UsersService;
exports.usersService = new UsersService();
//# sourceMappingURL=users.service.js.map
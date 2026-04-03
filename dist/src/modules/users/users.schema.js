"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersQuerySchema = exports.updateUserStatusSchema = exports.updateUserRoleSchema = void 0;
const zod_1 = require("zod");
exports.updateUserRoleSchema = zod_1.z.object({
    role: zod_1.z.enum(["VIEWER", "ANALYST", "ADMIN"]),
});
exports.updateUserStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["ACTIVE", "INACTIVE"]),
});
exports.listUsersQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().default(1),
    limit: zod_1.z.coerce.number().default(10),
});
//# sourceMappingURL=users.schema.js.map
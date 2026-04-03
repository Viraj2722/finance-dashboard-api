"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const db_1 = require("../config/db");
const errors_1 = require("../utils/errors");
async function authenticate(request, reply) {
    try {
        // Verify and decode JWT
        await request.jwtVerify();
        // Extract user info from JWT payload
        const { id } = request.user;
        // Fetch fresh user data from DB to ensure they exist and are up-to-date
        const user = await db_1.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
            },
        });
        if (!user) {
            throw new errors_1.UnauthorizedError("User not found");
        }
        if (user.status !== "ACTIVE") {
            throw new errors_1.UnauthorizedError("User account is inactive");
        }
        // Attach user to request
        request.user = user;
    }
    catch (error) {
        if (error instanceof errors_1.UnauthorizedError) {
            reply.code(401).send({
                success: false,
                message: error.message,
            });
        }
        else {
            reply.code(401).send({
                success: false,
                message: "Unauthorized",
            });
        }
    }
}
//# sourceMappingURL=authenticate.js.map
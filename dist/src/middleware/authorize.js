"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
function authorize(allowedRoles) {
    return async (request, reply) => {
        if (!request.user) {
            reply.code(401).send({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        if (!allowedRoles.includes(request.user.role)) {
            reply.code(403).send({
                success: false,
                message: "Forbidden: insufficient permissions",
            });
            return;
        }
    };
}
//# sourceMappingURL=authorize.js.map
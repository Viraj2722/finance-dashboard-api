"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.ValidationError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.details = details;
        this.name = "AppError";
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(message, details) {
        super(404, message, details);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized", details) {
        super(401, message, details);
        this.name = "UnauthorizedError";
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = "Forbidden", details) {
        super(403, message, details);
        this.name = "ForbiddenError";
    }
}
exports.ForbiddenError = ForbiddenError;
class ValidationError extends AppError {
    constructor(message, details) {
        super(422, message, details);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class BadRequestError extends AppError {
    constructor(message, details) {
        super(400, message, details);
        this.name = "BadRequestError";
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=errors.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResponse = buildResponse;
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
function buildResponse(success, message, data, meta) {
    return {
        success,
        message,
        ...(data !== undefined && { data }),
        ...(meta && { meta }),
    };
}
function successResponse(message, data, meta) {
    return buildResponse(true, message, data, meta);
}
function errorResponse(message, data, meta) {
    return buildResponse(false, message, data, meta);
}
//# sourceMappingURL=response.js.map
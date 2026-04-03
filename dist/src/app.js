"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const env_1 = __importDefault(require("./config/env"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const users_routes_1 = require("./modules/users/users.routes");
const records_routes_1 = require("./modules/records/records.routes");
const dashboard_routes_1 = require("./modules/dashboard/dashboard.routes");
const errors_1 = require("./utils/errors");
const response_1 = require("./utils/response");
const fastifyJwt = require("@fastify/jwt");
async function createApp() {
    const protocol = env_1.default.NODE_ENV === "production" ? "https" : "http";
    const serverUrl = env_1.default.API_BASE_URL ?? `${protocol}://${env_1.default.HOST}:${env_1.default.PORT}`;
    const app = (0, fastify_1.default)({
        logger: {
            level: env_1.default.NODE_ENV === "production" ? "error" : "debug",
        },
    });
    // Register plugins
    await app.register(helmet_1.default);
    await app.register(cors_1.default, {
        origin: true,
    });
    await app.register(fastifyJwt, {
        secret: env_1.default.JWT_SECRET,
    });
    await app.register(swagger_1.default, {
        openapi: {
            openapi: "3.0.3",
            info: {
                title: "Finance Dashboard API",
                version: "1.0.0",
            },
            servers: [{ url: serverUrl }],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
            security: [{ bearerAuth: [] }],
            tags: [
                { name: "auth", description: "Authentication endpoints" },
                { name: "users", description: "User and role management" },
                { name: "records", description: "Financial record operations" },
                { name: "dashboard", description: "Dashboard analytics" },
            ],
        },
    });
    await app.register(swagger_ui_1.default, {
        routePrefix: "/docs/swagger",
        uiConfig: {
            docExpansion: "list",
            deepLinking: false,
        },
    });
    app.get("/openapi.json", async () => app.swagger());
    const { default: apiReference } = await import("@scalar/fastify-api-reference");
    await app.register(apiReference, {
        routePrefix: "/docs",
        configuration: {
            url: "/openapi.json",
        },
    });
    // Health check route (no auth required)
    app.get("/health", async (request, reply) => {
        reply.send({ success: true, message: "API is healthy" });
    });
    // Register all module routes
    await (0, auth_routes_1.authRoutes)(app);
    await (0, users_routes_1.usersRoutes)(app);
    await (0, records_routes_1.recordsRoutes)(app);
    await (0, dashboard_routes_1.dashboardRoutes)(app);
    // Centralized error handler
    app.setErrorHandler((error, request, reply) => {
        console.error("Error:", error);
        if (error instanceof errors_1.AppError) {
            reply.code(error.statusCode).send((0, response_1.errorResponse)(error.message, undefined, {
                details: error.details,
            }));
            return;
        }
        // Handle Zod validation errors
        if (error.name === "ZodError") {
            const validationErrors = error.errors;
            reply.code(422).send((0, response_1.errorResponse)("Validation failed", undefined, {
                errors: validationErrors,
            }));
            return;
        }
        // Handle JWT errors
        if (error.name === "UnauthorizedError") {
            reply.code(401).send((0, response_1.errorResponse)("Unauthorized"));
            return;
        }
        // Default error response
        reply.code(500).send((0, response_1.errorResponse)("Internal server error"));
    });
    return app;
}
//# sourceMappingURL=app.js.map
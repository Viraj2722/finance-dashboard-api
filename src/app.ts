import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import env from "./config/env";
import { authRoutes } from "./modules/auth/auth.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { recordsRoutes } from "./modules/records/records.routes";
import { dashboardRoutes } from "./modules/dashboard/dashboard.routes";
import { AppError } from "./utils/errors";
import { errorResponse } from "./utils/response";

const fastifyJwt = require("@fastify/jwt");

export async function createApp() {
  const protocol = env.NODE_ENV === "production" ? "https" : "http";
  const serverUrl = env.API_BASE_URL ?? `${protocol}://${env.HOST}:${env.PORT}`;

  const app = Fastify({
    logger: {
      level: env.NODE_ENV === "production" ? "error" : "debug",
    },
  });

  // Register plugins
  await app.register(fastifyHelmet);
  await app.register(fastifyCors, {
    origin: true,
  });

  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  await app.register(fastifySwagger, {
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

  await app.register(fastifySwaggerUi, {
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
  await authRoutes(app);
  await usersRoutes(app);
  await recordsRoutes(app);
  await dashboardRoutes(app);

  // Centralized error handler
  app.setErrorHandler((error, request, reply) => {
    console.error("Error:", error);

    if (error instanceof AppError) {
      reply.code(error.statusCode).send(
        errorResponse(error.message, undefined, {
          details: error.details,
        })
      );
      return;
    }

    // Handle Zod validation errors
    if (error.name === "ZodError") {
      const validationErrors = (error as any).errors;
      reply.code(422).send(
        errorResponse("Validation failed", undefined, {
          errors: validationErrors,
        })
      );
      return;
    }

    // Handle JWT errors
    if (error.name === "UnauthorizedError") {
      reply.code(401).send(
        errorResponse("Unauthorized")
      );
      return;
    }

    // Default error response
    reply.code(500).send(
      errorResponse("Internal server error")
    );
  });

  return app;
}

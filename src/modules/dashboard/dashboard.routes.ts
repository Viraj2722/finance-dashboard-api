import { FastifyInstance } from "fastify";
import { dashboardController } from "./dashboard.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

export async function dashboardRoutes(app: FastifyInstance) {
  // GET /api/dashboard/summary — VIEWER, ANALYST, ADMIN
  app.get(
    "/api/dashboard/summary",
    {
      preHandler: [authenticate, authorize(["VIEWER", "ANALYST", "ADMIN"])],
      schema: {
        tags: ["dashboard"],
        summary: "Get total income, expenses and net balance",
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
              data: { type: "object", additionalProperties: true },
            },
          },
          401: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          403: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          500: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    (request, reply) => dashboardController.getSummary(request, reply)
  );

  // GET /api/dashboard/by-category — ANALYST, ADMIN
  app.get(
    "/api/dashboard/by-category",
    {
      preHandler: [authenticate, authorize(["ANALYST", "ADMIN"])],
      schema: {
        tags: ["dashboard"],
        summary: "Get totals grouped by category",
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
              data: { type: "object", additionalProperties: true },
            },
          },
          401: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          403: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          500: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    (request, reply) => dashboardController.getByCategory(request, reply)
  );

  // GET /api/dashboard/trends — ANALYST, ADMIN
  app.get(
    "/api/dashboard/trends",
    {
      preHandler: [authenticate, authorize(["ANALYST", "ADMIN"])],
      schema: {
        tags: ["dashboard"],
        summary: "Get monthly income vs expense trends for last 6 months",
        security: [{ bearerAuth: [] }],
        querystring: {
          type: "object",
          properties: {
            period: { type: "string", enum: ["monthly", "weekly"], default: "monthly" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
              data: { type: "object", additionalProperties: true },
            },
          },
          401: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          403: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          422: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          500: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    (request, reply) => dashboardController.getTrends(request, reply)
  );

  // GET /api/dashboard/recent — VIEWER, ANALYST, ADMIN
  app.get(
    "/api/dashboard/recent",
    {
      preHandler: [authenticate, authorize(["VIEWER", "ANALYST", "ADMIN"])],
      schema: {
        tags: ["dashboard"],
        summary: "Get last 10 transactions",
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
              data: { type: "object", additionalProperties: true },
            },
          },
          401: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          403: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          500: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    (request, reply) => dashboardController.getRecent(request, reply)
  );
}

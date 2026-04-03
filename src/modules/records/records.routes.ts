import { FastifyInstance } from "fastify";
import { recordsController } from "./records.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

export async function recordsRoutes(app: FastifyInstance) {
  // POST /api/records — ADMIN only
  app.post(
    "/api/records",
    {
      preHandler: [authenticate, authorize(["ADMIN"])],
      schema: {
        tags: ["records"],
        summary: "Create a financial record (Admin only)",
        security: [{ bearerAuth: [] }],
        body: {
          type: "object",
          required: ["amount", "type", "category", "date"],
          properties: {
            amount: { type: "number" },
            type: { type: "string", enum: ["INCOME", "EXPENSE"] },
            category: {
              type: "string",
              enum: [
                "SALARY",
                "FOOD",
                "TRANSPORT",
                "UTILITIES",
                "ENTERTAINMENT",
                "HEALTHCARE",
                "OTHER",
              ],
            },
            date: { type: "string", format: "date" },
            notes: { type: "string" },
          },
        },
        response: {
          201: {
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
    (request, reply) => recordsController.createRecord(request, reply)
  );

  // GET /api/records — all authenticated roles
  app.get(
    "/api/records",
    {
      preHandler: [authenticate],
      schema: {
        tags: ["records"],
        summary: "Get all records with optional filters",
        security: [{ bearerAuth: [] }],
        querystring: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["INCOME", "EXPENSE"] },
            category: {
              type: "string",
              enum: [
                "SALARY",
                "FOOD",
                "TRANSPORT",
                "UTILITIES",
                "ENTERTAINMENT",
                "HEALTHCARE",
                "OTHER",
              ],
            },
            startDate: { type: "string" },
            endDate: { type: "string" },
            page: { type: "integer", default: 1 },
            limit: { type: "integer", default: 10 },
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
    (request, reply) => recordsController.listRecords(request, reply)
  );

  // GET /api/records/:id — all authenticated roles
  app.get(
    "/api/records/:id",
    {
      preHandler: [authenticate],
      schema: {
        tags: ["records"],
        summary: "Get single record by ID",
        security: [{ bearerAuth: [] }],
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
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
          404: {
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
    (request, reply) => recordsController.getRecordById(request, reply)
  );

  // PATCH /api/records/:id — ADMIN only
  app.patch(
    "/api/records/:id",
    {
      preHandler: [authenticate, authorize(["ADMIN"])],
      schema: {
        tags: ["records"],
        summary: "Update a record (Admin only)",
        security: [{ bearerAuth: [] }],
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
          },
        },
        body: {
          type: "object",
          properties: {
            amount: { type: "number" },
            type: { type: "string", enum: ["INCOME", "EXPENSE"] },
            category: {
              type: "string",
              enum: [
                "SALARY",
                "FOOD",
                "TRANSPORT",
                "UTILITIES",
                "ENTERTAINMENT",
                "HEALTHCARE",
                "OTHER",
              ],
            },
            date: { type: "string" },
            notes: { type: "string" },
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
          404: {
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
    (request, reply) => recordsController.updateRecord(request, reply)
  );

  // DELETE /api/records/:id — ADMIN only (soft delete)
  app.delete(
    "/api/records/:id",
    {
      preHandler: [authenticate, authorize(["ADMIN"])],
      schema: {
        tags: ["records"],
        summary: "Soft delete a record (Admin only)",
        security: [{ bearerAuth: [] }],
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
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
          404: {
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
    (request, reply) => recordsController.deleteRecord(request, reply)
  );
}

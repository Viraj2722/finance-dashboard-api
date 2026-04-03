import { FastifyInstance } from "fastify";
import { recordsController } from "./records.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

export async function recordsRoutes(app: FastifyInstance) {
  // POST /api/records — ADMIN only
  app.post(
    "/api/records",
    { preHandler: [authenticate, authorize(["ADMIN"])] },
    (request, reply) => recordsController.createRecord(request, reply)
  );

  // GET /api/records — all authenticated roles
  app.get(
    "/api/records",
    { preHandler: [authenticate] },
    (request, reply) => recordsController.listRecords(request, reply)
  );

  // GET /api/records/:id — all authenticated roles
  app.get(
    "/api/records/:id",
    { preHandler: [authenticate] },
    (request, reply) => recordsController.getRecordById(request, reply)
  );

  // PATCH /api/records/:id — ADMIN only
  app.patch(
    "/api/records/:id",
    { preHandler: [authenticate, authorize(["ADMIN"])] },
    (request, reply) => recordsController.updateRecord(request, reply)
  );

  // DELETE /api/records/:id — ADMIN only (soft delete)
  app.delete(
    "/api/records/:id",
    { preHandler: [authenticate, authorize(["ADMIN"])] },
    (request, reply) => recordsController.deleteRecord(request, reply)
  );
}

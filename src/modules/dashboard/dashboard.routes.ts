import { FastifyInstance } from "fastify";
import { dashboardController } from "./dashboard.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

export async function dashboardRoutes(app: FastifyInstance) {
  // GET /api/dashboard/summary — VIEWER, ANALYST, ADMIN
  app.get(
    "/api/dashboard/summary",
    { preHandler: [authenticate, authorize(["VIEWER", "ANALYST", "ADMIN"])] },
    (request, reply) => dashboardController.getSummary(request, reply)
  );

  // GET /api/dashboard/by-category — ANALYST, ADMIN
  app.get(
    "/api/dashboard/by-category",
    { preHandler: [authenticate, authorize(["ANALYST", "ADMIN"])] },
    (request, reply) => dashboardController.getByCategory(request, reply)
  );

  // GET /api/dashboard/trends — ANALYST, ADMIN
  app.get(
    "/api/dashboard/trends",
    { preHandler: [authenticate, authorize(["ANALYST", "ADMIN"])] },
    (request, reply) => dashboardController.getTrends(request, reply)
  );

  // GET /api/dashboard/recent — VIEWER, ANALYST, ADMIN
  app.get(
    "/api/dashboard/recent",
    { preHandler: [authenticate, authorize(["VIEWER", "ANALYST", "ADMIN"])] },
    (request, reply) => dashboardController.getRecent(request, reply)
  );
}

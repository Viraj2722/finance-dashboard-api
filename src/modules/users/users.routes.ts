import { FastifyInstance } from "fastify";
import { usersController } from "./users.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

export async function usersRoutes(app: FastifyInstance) {
  // All users routes require authentication and ADMIN role
  app.get(
    "/api/users",
    { preHandler: [authenticate, authorize(["ADMIN"])] },
    (request, reply) => usersController.listUsers(request, reply)
  );

  app.get(
    "/api/users/:id",
    { preHandler: [authenticate, authorize(["ADMIN"])] },
    (request, reply) => usersController.getUserById(request, reply)
  );

  app.patch(
    "/api/users/:id/role",
    { preHandler: [authenticate, authorize(["ADMIN"])] },
    (request, reply) => usersController.updateUserRole(request, reply)
  );

  app.patch(
    "/api/users/:id/status",
    { preHandler: [authenticate, authorize(["ADMIN"])] },
    (request, reply) => usersController.updateUserStatus(request, reply)
  );
}

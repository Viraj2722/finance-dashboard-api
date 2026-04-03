import { FastifyInstance } from "fastify";
import { authController } from "./auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/api/auth/register", (request, reply) =>
    authController.register(request, reply)
  );

  app.post("/api/auth/login", (request, reply) =>
    authController.login(request, reply)
  );
}

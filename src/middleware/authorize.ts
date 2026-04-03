import { FastifyRequest, FastifyReply } from "fastify";

export function authorize(allowedRoles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    if (!request.user) {
      reply.code(401).send({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!allowedRoles.includes(request.user.role)) {
      reply.code(403).send({
        success: false,
        message: "Forbidden: insufficient permissions",
      });
      return;
    }
  };
}

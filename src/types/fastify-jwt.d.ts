import "fastify";
import { FastifyPluginAsync } from "fastify";

declare module "@fastify/jwt" {
  const fastifyJwt: FastifyPluginAsync<{ secret: string }>;
  export default fastifyJwt;
}

declare module "fastify" {
  interface FastifyRequest {
    jwtVerify: () => Promise<void>;
    user: {
      id: string;
      email: string;
      role: "VIEWER" | "ANALYST" | "ADMIN";
      status?: "ACTIVE" | "INACTIVE";
    };
  }

  interface FastifyInstance {
    jwt: {
      sign: (
        payload: {
          id: string;
          email: string;
          role: "VIEWER" | "ANALYST" | "ADMIN";
          status?: "ACTIVE" | "INACTIVE";
        },
        options?: { expiresIn?: string }
      ) => string;
    };
  }
}
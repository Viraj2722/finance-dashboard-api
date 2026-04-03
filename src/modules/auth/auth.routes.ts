import { FastifyInstance } from "fastify";
import { authController } from "./auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/api/auth/register",
    {
      schema: {
        tags: ["auth"],
        summary: "Register a new user",
        body: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
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
          400: {
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
              error: { type: "object", additionalProperties: true },
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
    (request, reply) => authController.register(request, reply)
  );

  app.post(
    "/api/auth/login",
    {
      schema: {
        tags: ["auth"],
        summary: "Login and get JWT token",
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
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
              error: { type: "object", additionalProperties: true },
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
    (request, reply) => authController.login(request, reply)
  );
}

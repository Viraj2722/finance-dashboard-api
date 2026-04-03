import { FastifyRequest, FastifyReply } from "fastify";
import { authService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schema";
import { successResponse } from "../../utils/response";
import { AppError } from "../../utils/errors";

export class AuthController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const validatedData = registerSchema.parse(request.body);
      const user = await authService.register(validatedData);

      reply.code(201).send(
        successResponse("User registered successfully", user)
      );
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode).send({
          success: false,
          message: error.message,
        });
      } else {
        throw error;
      }
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const validatedData = loginSchema.parse(request.body);
      const user = await authService.login(validatedData);

      // Sign JWT with 7 days expiry
      const token = request.server.jwt.sign(user, { expiresIn: "7d" });

      reply.code(200).send(
        successResponse("Login successful", {
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        })
      );
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode).send({
          success: false,
          message: error.message,
        });
      } else {
        throw error;
      }
    }
  }
}

export const authController = new AuthController();

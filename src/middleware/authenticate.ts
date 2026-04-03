import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../config/db";
import { UnauthorizedError } from "../utils/errors";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
  status: string;
}

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    // Verify and decode JWT
    await request.jwtVerify();

    // Extract user info from JWT payload
    const { id } = request.user;

    // Fetch fresh user data from DB to ensure they exist and are up-to-date
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    if (user.status !== "ACTIVE") {
      throw new UnauthorizedError("User account is inactive");
    }

    // Attach user to request
    request.user = user;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      reply.code(401).send({
        success: false,
        message: error.message,
      });
    } else {
      reply.code(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
  }
}

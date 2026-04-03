import bcrypt from "bcryptjs";
import { prisma } from "../../config/db";
import {
  UnauthorizedError,
  BadRequestError,
} from "../../utils/errors";
import type { RegisterPayload, LoginPayload } from "./auth.schema";

export class AuthService {
  async register(payload: RegisterPayload) {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new BadRequestError("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    // Create user with default role VIEWER
    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        role: "VIEWER",
        status: "ACTIVE",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  async login(payload: LoginPayload) {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Check if user is active
    if (user.status !== "ACTIVE") {
      throw new UnauthorizedError("User account is inactive");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Return user data for JWT payload
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };
  }
}

export const authService = new AuthService();

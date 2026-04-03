import { prisma } from "../../config/db";
import { NotFoundError } from "../../utils/errors";
import type { UpdateUserRolePayload, UpdateUserStatusPayload } from "./users.schema";

export class UsersService {
  async listUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found`);
    }

    return user;
  }

  async updateUserRole(userId: string, payload: UpdateUserRolePayload) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found`);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: payload.role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async updateUserStatus(userId: string, payload: UpdateUserStatusPayload) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found`);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status: payload.status },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }
}

export const usersService = new UsersService();

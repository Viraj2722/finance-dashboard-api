import type { UpdateUserRolePayload, UpdateUserStatusPayload } from "./users.schema";
export declare class UsersService {
    listUsers(page: number, limit: number): Promise<{
        users: {
            status: import(".prisma/client").$Enums.Status;
            name: string;
            email: string;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getUserById(userId: string): Promise<{
        status: import(".prisma/client").$Enums.Status;
        name: string;
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserRole(userId: string, payload: UpdateUserRolePayload): Promise<{
        status: import(".prisma/client").$Enums.Status;
        name: string;
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserStatus(userId: string, payload: UpdateUserStatusPayload): Promise<{
        status: import(".prisma/client").$Enums.Status;
        name: string;
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export declare const usersService: UsersService;

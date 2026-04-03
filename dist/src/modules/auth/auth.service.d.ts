import type { RegisterPayload, LoginPayload } from "./auth.schema";
export declare class AuthService {
    register(payload: RegisterPayload): Promise<{
        name: string;
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    login(payload: LoginPayload): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        status: "ACTIVE";
    }>;
}
export declare const authService: AuthService;

import { FastifyRequest, FastifyReply } from "fastify";
export interface AuthenticatedUser {
    id: string;
    email: string;
    role: string;
    status: string;
}
export declare function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;

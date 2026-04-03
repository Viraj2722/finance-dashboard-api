import { FastifyRequest, FastifyReply } from "fastify";
export declare class UsersController {
    listUsers(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    getUserById(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    updateUserRole(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    updateUserStatus(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
export declare const usersController: UsersController;

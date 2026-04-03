import { FastifyRequest, FastifyReply } from "fastify";
export declare class AuthController {
    register(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    login(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
export declare const authController: AuthController;

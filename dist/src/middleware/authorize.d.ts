import { FastifyRequest, FastifyReply } from "fastify";
export declare function authorize(allowedRoles: string[]): (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

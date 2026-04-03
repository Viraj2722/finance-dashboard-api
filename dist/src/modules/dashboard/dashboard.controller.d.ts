import { FastifyRequest, FastifyReply } from "fastify";
export declare class DashboardController {
    getSummary(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    getByCategory(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    getTrends(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    getRecent(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
export declare const dashboardController: DashboardController;

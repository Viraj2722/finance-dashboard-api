import { FastifyRequest, FastifyReply } from "fastify";
export declare class RecordsController {
    createRecord(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    listRecords(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    getRecordById(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    updateRecord(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    deleteRecord(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
export declare const recordsController: RecordsController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardTrendsQuerySchema = void 0;
const zod_1 = require("zod");
exports.dashboardTrendsQuerySchema = zod_1.z.object({
    period: zod_1.z.enum(["monthly"]).default("monthly"),
});
//# sourceMappingURL=dashboard.schema.js.map
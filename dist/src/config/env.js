"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().url(),
    JWT_SECRET: zod_1.z.string().min(32, "JWT_SECRET must be at least 32 characters"),
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]).default("development"),
    HOST: zod_1.z.string().default("localhost"),
    PORT: zod_1.z.coerce.number().default(3000),
    API_BASE_URL: zod_1.z.string().url().optional(),
});
let env;
try {
    env = envSchema.parse(process.env);
}
catch (error) {
    if (error instanceof zod_1.z.ZodError) {
        console.error("Environment validation failed:", error.errors);
    }
    throw new Error("Invalid environment variables");
}
exports.default = env;
//# sourceMappingURL=env.js.map
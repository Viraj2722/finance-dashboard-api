import { z } from "zod";
declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
    PORT: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
}, {
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV?: "development" | "production" | "test" | undefined;
    PORT?: number | undefined;
}>;
type Env = z.infer<typeof envSchema>;
declare let env: Env;
export default env;

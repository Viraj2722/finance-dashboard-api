import { z } from "zod";
declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
    HOST: z.ZodDefault<z.ZodString>;
    PORT: z.ZodDefault<z.ZodNumber>;
    API_BASE_URL: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV: "development" | "production" | "test";
    HOST: string;
    PORT: number;
    API_BASE_URL?: string | undefined;
}, {
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV?: "development" | "production" | "test" | undefined;
    HOST?: string | undefined;
    PORT?: number | undefined;
    API_BASE_URL?: string | undefined;
}>;
type Env = z.infer<typeof envSchema>;
declare let env: Env;
export default env;

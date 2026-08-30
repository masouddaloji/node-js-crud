import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().int().positive(),
  JWT_ACCESS_SECRET: z.string().min(32),
  NODE_ENV: z.enum(["development", "production", "test"]),
  ACCESS_EXPIRES_IN: z.string().min(1),
  REFRESH_EXPIRES_DAYS: z.coerce.number().int().positive(),
});

export const env = envSchema.parse(process.env);

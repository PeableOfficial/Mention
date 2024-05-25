import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SOCKET_URL: z.string().url(),
  BASE_URL: z.string().url(),
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE_URL = process.env.DATABASE_URL;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const BASE_URL = process.env.BASE_URL;

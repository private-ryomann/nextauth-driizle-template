import serverEnv from "@/env/serverEnv.mjs";
import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(serverEnv.DATABASE_URL);

import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import serverEnv from "@/env/serverEnv.mjs";

export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/db/schemas/*ts",
	dialect: "postgresql",
	dbCredentials: {
		url: serverEnv.DATABASE_URL,
	},
});

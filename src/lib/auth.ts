import { db } from "@/db";
import { accounts } from "@/db/schemas/acounts";
import { sessions } from "@/db/schemas/sessions";
import { users } from "@/db/schemas/users";
import serverEnv from "@/env/serverEnv.mjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
	debug: true,
	secret: serverEnv.AUTH_SECRET,
	session: {
		strategy: "database",
		maxAge: 14 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
	}),
	providers: [
		Google({
			clientId: serverEnv.AUTH_GOOGLE_ID,
			clientSecret: serverEnv.AUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
});

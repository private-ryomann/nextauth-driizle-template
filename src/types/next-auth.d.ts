import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id?: string;
		} & DefaultSession["user"];
		accessToken?: string;
		error?: "RefreshTokenError";
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		accessToken?: string;
		expiresAt: number;
		refreshToken?: string;
		error?: "RefreshTokenError";
	}
}

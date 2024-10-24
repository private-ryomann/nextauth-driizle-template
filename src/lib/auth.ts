import serverEnv from "@/env/serverEnv.mjs";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";

const DEFAULT_EXPIRES_IN = 60 * 60 * 1000;

export const { handlers, signIn, signOut, auth } = NextAuth({
	debug: true,
	secret: serverEnv.AUTH_SECRET,
	session: { strategy: "jwt" },
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
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				//初回ログインの際
				return {
					...token,
					accessToken: account.access_token,
					expiresAt:
						Date.now() + (account?.expires_at ?? DEFAULT_EXPIRES_IN) * 1000,
					refreshToken: account.refresh_token,
				};
			}

			if (Date.now() < token.expiresAt) {
				return token;
			}

			return await refreshAccessToken(token);
		},
		async session({ session, token }) {
			session.error = token.error;
			return session;
		},
	},
});

const refreshAccessToken = async (token: JWT) => {
	try {
		if (!token.refreshToken)
			throw new TypeError("リフレッシュトークンが存在しません。");

		/**
		 * リフレッシュトークンから新しいトークンを得るためのエンドポイント
		 * [Google OAuth Document](https://developers.google.com/identity/protocols/oauth2/web-server?hl=ja#offline)
		 */
		const response = await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			body: new URLSearchParams({
				client_id: serverEnv.AUTH_GOOGLE_ID,
				client_secret: serverEnv.AUTH_GOOGLE_SECRET,
				grant_type: "refresh_token",
				refresh_token: token.refreshToken,
			}),
		});

		const tokensOrError = await response.json();

		if (!response.ok) throw tokensOrError;

		const newTokens = tokensOrError as {
			accessToken: string;
			expiresAt: number;
			refreshToken?: string;
		};

		return {
			...token,
			accessToken: newTokens.accessToken,
			accessTokenExpires: Date.now() + newTokens.expiresAt * 1000,
			refreshToken: newTokens.refreshToken ?? token.refreshToken,
		};
	} catch (error) {
		console.error("Error refreshing access_token", error);
		token.error = "RefreshTokenError";
		return token;
	}
};

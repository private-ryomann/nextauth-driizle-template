import { url, envsafe, str } from "envsafe";
import { browserEnv } from "./browserEnv.mjs";

const serverEnv = {
	...browserEnv,
	...envsafe(
		{
			DATABASE_URL: url({input: process.env.DATABASE_URL}),
			AUTH_SECRET: str({input: process.env.AUTH_SECRET}),
			AUTH_GOOGLE_ID: str({input: process.env.AUTH_GOOGLE_ID}),
			AUTH_GOOGLE_SECRET: str({input: process.env.AUTH_GOOGLE_SECRET}),
		},
		{
			strict: true,
		},
	),
};

export default serverEnv;

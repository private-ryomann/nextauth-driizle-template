import { url, envsafe } from "envsafe";
import { browserEnv } from "./browserEnv.mjs";

const serverEnv = {
	...browserEnv,
	...envsafe(
		{
			DATABASE_URL: url({
				input: process.env.DATABASE_URL,
			}),
		},
		{
			strict: true,
		},
	),
};

export default serverEnv;

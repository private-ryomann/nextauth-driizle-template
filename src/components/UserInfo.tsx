"use client";

import { useSession } from "next-auth/react";

export const UserInfo = () => {
	const { data: session } = useSession();
	return (
		<h1 className="font-bold">{`${session ? session.user?.name : "Gest User"}さん、こんにちは`}</h1>
	);
};

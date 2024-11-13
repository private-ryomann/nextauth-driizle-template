import { signOut } from "@/lib/auth";

export const SignOut = () => {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<button
				type="submit"
				className="group relative h-12 overflow-hidden rounded-md bg-red-500 px-6 text-neutral-50 transition"
			>
				<span>Signout</span>
				<div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full" />
			</button>
		</form>
	);
};

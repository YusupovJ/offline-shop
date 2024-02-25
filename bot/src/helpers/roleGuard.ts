import { NextFunction } from "grammy";
import { MyContext } from "../types";

export async function roleGuard(ctx: MyContext, next: NextFunction) {
	const role = ctx.session.me?.role;

	if (role === "admin") {
		await next();
	} else {
		await ctx.reply("Access denied🚫. You do not have admin rights!");
	}
}

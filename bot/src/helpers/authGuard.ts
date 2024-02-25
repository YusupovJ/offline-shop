import { NextFunction } from "grammy";
import { IUser, MyContext } from "../types";
import query from "../config/axios.config";

export async function authGuard(ctx: MyContext, next: NextFunction) {
	const userId = ctx.from?.id as number;
	const { data } = await query.get<IUser[]>(`/users?tgId=${userId}`);

	if (data[0]) {
		const me = JSON.stringify(data[0]);
		const savedUser = JSON.stringify(ctx.session.me);

		if (me !== savedUser) {
			ctx.session.me = data[0];
		}

		await next();
	} else {
		await ctx.reply("Please sign up! /start");
	}
}

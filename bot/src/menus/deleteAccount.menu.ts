import { Menu } from "@grammyjs/menu";
import { IUser, MyContext } from "../types";
import query from "../config/axios.config";
import { userMessage } from "../helpers/sendUserInfo";

export const deleteAccountMenu = new Menu<MyContext>("delete__menu").dynamic(async (ctx, range) => {
	const userInfo = ctx.session.searchUser as IUser;

	range.text("Yes", async (ctx) => {
		await query.delete(`/users/${userInfo._id}`);
		await ctx.editMessageText("You successfully deleted account!");
		ctx.menu.close();
	});

	range.back("No", async (ctx) => {
		await ctx.editMessageText(userMessage(userInfo), {
			parse_mode: "HTML",
		});
	});
});

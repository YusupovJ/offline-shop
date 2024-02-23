import { Menu } from "@grammyjs/menu";
import { MyContext } from "../types";

export const accountMenu = new Menu<MyContext>("account__menu").dynamic((ctx, range) => {
	range.text("Change first name", async (ctx) => {
		await ctx.conversation.enter("changeFirstNameConversation");
	});
	range.text("Change last name", async (ctx) => {
		await ctx.conversation.enter("changeLastNameConversation");
	});

	if (ctx.session.userInfo?.role === "admin") {
		range.row().text((ctx) => {
			const isAdmin = ctx.session.userInfo?.role === "admin" ? "✅" : "❌";

			return `admin ${isAdmin}`;
		});
	}
});

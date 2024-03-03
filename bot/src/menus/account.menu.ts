import { Menu } from "@grammyjs/menu";
import { MyContext } from "../types";
import query from "../config/axios.config";

export const accountMenu = new Menu<MyContext>("account__menu").dynamic((ctx, range) => {
	range.text("Change first name", async (ctx) => {
		await ctx.conversation.enter("changeFirstNameConversation");
	});
	range.text("Change last name", async (ctx) => {
		await ctx.conversation.enter("changeLastNameConversation");
	});

	range.row();

	range.text("Delete account", async (ctx) => {
		await ctx.menu.nav("delete__menu");
		await ctx.editMessageText("Are you sure you want to delete the account?");
	});

	if (ctx.session.user.me?.role === "admin") {
		range.text(
			(ctx) => {
				const isAdmin = ctx.session.user.searchUser?.role === "admin" ? "✅" : "❌";
				return `admin ${isAdmin}`;
			},
			async (ctx) => {
				if (ctx.session.user.searchUser) {
					const { searchUser } = ctx.session.user;
					const newRole = searchUser.role === "admin" ? "user" : "admin";

					await query.patch(`/users/${searchUser._id}`, {
						role: newRole,
					});

					ctx.session.user.searchUser.role = newRole;

					ctx.menu.update();
				}
			}
		);
	}
});

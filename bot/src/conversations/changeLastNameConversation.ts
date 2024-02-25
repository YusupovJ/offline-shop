import query from "../config/axios.config";
import { MyContext, MyConversation } from "../types";

export async function changeLastNameConversation(conversation: MyConversation, ctx: MyContext) {
	if (conversation.session.me) {
		await ctx.reply("Enter new last name:");
		const newLastName = (await conversation.waitFor(":text")).message?.text as string;

		await query.patch(`/users/${ctx.session.me?._id}`, {
			lastName: newLastName,
		});

		conversation.session.me.lastName = newLastName;

		await ctx.reply("You successfully changed last name!");
	}
}

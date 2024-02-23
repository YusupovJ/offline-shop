import query from "../config/axios.config";
import { MyContext, MyConversation } from "../types";

export async function changeLastNameConversation(conversation: MyConversation, ctx: MyContext) {
	try {
		if (conversation.session.userInfo) {
			await ctx.reply("Enter new last name");
			const newLastName = (await conversation.waitFor(":text")).message?.text as string;

			await query.patch(`/users/${ctx.session.userInfo?._id}`, {
				lastName: newLastName,
			});

			conversation.session.userInfo.lastName = newLastName;

			await ctx.reply("You successfully changed your last name!");
		}
	} catch (error) {
		await ctx.reply("Something went wrong :(");
	}
}

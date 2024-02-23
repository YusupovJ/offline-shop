import query from "../config/axios.config";
import { MyContext, MyConversation } from "../types";

export async function changeFirstNameConversation(conversation: MyConversation, ctx: MyContext) {
	try {
		if (conversation.session.userInfo) {
			await ctx.reply("Enter new first name:");
			const newFirstName = (await conversation.waitFor(":text")).message?.text as string;

			await query.patch(`/users/${ctx.session.userInfo?._id}`, {
				firstName: newFirstName,
			});

			conversation.session.userInfo.firstName = newFirstName;

			await ctx.reply("You successfully changed your first name!");
		}
	} catch (error) {
		await ctx.reply("Something went wrong :(");
	}
}

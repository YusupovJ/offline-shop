import query from "../../config/axios.config";
import { MyContext, MyConversation } from "../../types";

export async function changeFirstNameConversation(conversation: MyConversation, ctx: MyContext) {
	if (conversation.session.user.me) {
		await ctx.reply("Enter new first name:");
		const newFirstName = (await conversation.waitFor(":text")).message?.text as string;

		await query.patch(`/users/${ctx.session.user.me?._id}`, {
			firstName: newFirstName,
		});

		conversation.session.user.me.firstName = newFirstName;

		await ctx.reply("You successfully changed first name!");
	}
}

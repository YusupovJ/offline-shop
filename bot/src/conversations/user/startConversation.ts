import { Keyboard } from "grammy";
import { IUser, MyContext, MyConversation } from "../../types";
import query from "../../config/axios.config";

export async function startConversation(conversation: MyConversation, ctx: MyContext) {
	await ctx.reply("Hello. Welcome to offline shop! Please sign up!");

	await ctx.reply("Your first name:");
	const firstName = (await conversation.waitFor(":text")).message?.text;

	await ctx.reply("Your last name:");
	const lastName = (await conversation.waitFor(":text")).message?.text;

	await ctx.reply("Share your phone number:", {
		reply_markup: new Keyboard().requestContact("☎️ Share Contact").oneTime().resized(),
	});
	const phoneNumber = (await conversation.waitFor(":contact")).message?.contact.phone_number;

	const userInfo = {
		firstName,
		lastName,
		phoneNumber,
		tgId: ctx.from?.id,
	};

	const { data } = await query.post<IUser>("/users", userInfo);

	conversation.session.user.me = data;

	await ctx.reply(`Congratulations 🎉! Welcome ${data.lastName} ${data.firstName}.`, {
		reply_markup: {
			remove_keyboard: true,
		},
	});
}

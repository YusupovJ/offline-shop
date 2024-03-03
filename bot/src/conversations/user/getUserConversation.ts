import query from "../../config/axios.config";
import { sendUserInfo } from "../../helpers/sendUserInfo";
import { MyConversation, MyContext, IUser } from "../../types";

export async function getUserConversation(conversation: MyConversation, ctx: MyContext) {
	await ctx.reply("Please send phone number of the user:");

	let phoneNumber = (await conversation.waitFor("::phone_number")).message?.text;

	if (phoneNumber?.startsWith("+")) {
		phoneNumber = phoneNumber.slice(1);
	}

	const { data: userInfo } = await query.get<IUser[]>(`/users?phoneNumber=${phoneNumber}`);

	if (!userInfo[0]) {
		await ctx.reply("User does not exist");
		return;
	}

	conversation.session.user.searchUser = userInfo[0];

	await sendUserInfo(ctx, userInfo[0]);
}

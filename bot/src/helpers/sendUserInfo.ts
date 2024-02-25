import { accountMenu } from "../menus/account.menu";
import { IUser, MyContext } from "../types";

export function userMessage(userInfo: IUser) {
	return `<b>User information:</b>

<b>ID:</b> ${userInfo._id}
<b>First name:</b> ${userInfo.firstName}
<b>Last name:</b> ${userInfo.lastName}
<b>Phone number:</b> ${userInfo.phoneNumber}`;
}

export async function sendUserInfo(ctx: MyContext, userInfo: IUser) {
	const message = userMessage(userInfo);

	await ctx.reply(message, {
		parse_mode: "HTML",
		reply_markup: accountMenu,
	});
}

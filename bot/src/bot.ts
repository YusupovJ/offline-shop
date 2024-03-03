import { Bot } from "grammy";
import envConfig from "./config/env.config";
import { setupSession } from "./session/session";
import { IUser, MyContext } from "./types";
import query from "./config/axios.config";
import { sendUserInfo } from "./helpers/sendUserInfo";
import { AxiosError } from "axios";
import { authGuard } from "./helpers/authGuard";
import { roleGuard } from "./helpers/roleGuard";

// Menu imports
import { accountMenu } from "./menus/account.menu";
import { productMenu } from "./menus/product.menu";
import { categoryMenu } from "./menus/category.menu";
import { deleteAccountMenu } from "./menus/deleteAccount.menu";

// Conversation imports
import { conversations, createConversation } from "@grammyjs/conversations";
import { getCategoryConversation } from "./conversations/category/getCategoryConversation";
import { createCategoryConversation } from "./conversations/category/createCategoryConversation";
import { startConversation } from "./conversations/user/startConversation";
import { changeFirstNameConversation } from "./conversations/user/changeFirstNameConversation";
import { changeLastNameConversation } from "./conversations/user/changeLastNameConversation";
import { getUserConversation } from "./conversations/user/getUserConversation";

const bot = new Bot<MyContext>(envConfig.BOT_TOKEN);
bot.use(setupSession(bot.token));
bot.use(conversations());

// Account
bot.use(createConversation(changeFirstNameConversation));
bot.use(createConversation(changeLastNameConversation));
bot.use(accountMenu);
accountMenu.register(deleteAccountMenu);

// Category
bot.use(categoryMenu);
categoryMenu.register(productMenu);
bot.use(createConversation(getCategoryConversation));
bot.use(createConversation(createCategoryConversation));

// Other conversations
bot.use(createConversation(startConversation));
bot.use(createConversation(getUserConversation));

// Commands
bot.api.setMyCommands([
	{
		command: "start",
		description: "Starts the bot",
	},
	{
		command: "category",
		description: "Sees categories tap this command",
	},
	{
		command: "account",
		description: "Account settings",
	},
	{
		command: "searchuser",
		description: "Gets any user having phone number",
	},
	{
		command: "newcategory",
		description: "Creates new category",
	},
]);

bot.command("start", async (ctx) => {
	const userId = ctx.from?.id as number;
	const { data } = await query.get<IUser[]>(`/users?tgId=${userId}`);
	const me = data[0];

	if (me) {
		ctx.session.user.me = me;
		await ctx.reply(`Welcome ${me.lastName} ${me.firstName}!`);
	} else {
		await ctx.conversation.enter("startConversation");
	}
});

bot.command("account", authGuard, async (ctx) => {
	const userId = ctx.from?.id as number;
	const { data } = await query.get<IUser[]>(`/users?tgId=${userId}`);
	const me = data[0];

	if (me) {
		ctx.session.user.me = me;
		ctx.session.user.searchUser = me;
		await sendUserInfo(ctx, me);
	} else {
		await ctx.reply("Please sign up! /start");
	}
});

bot.command("searchuser", authGuard, roleGuard, async (ctx) => {
	await ctx.conversation.enter("getUserConversation");
});

bot.command("category", authGuard, async (ctx) => {
	await ctx.conversation.enter("getCategoryConversation");
});

bot.command("newcategory", authGuard, roleGuard, async (ctx) => {
	await ctx.conversation.enter("createCategoryConversation");
});

// Error handling
bot.catch((info) => {
	const error = info.error;
	if (error instanceof AxiosError) {
		console.log(info);
		info.ctx.reply(error.response?.data.message);
	} else {
		console.log(info);
	}
});

// Starting bot
bot.start({
	onStart() {
		console.log("Bot started");
	},
});

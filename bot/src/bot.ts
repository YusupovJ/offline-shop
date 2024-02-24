import { Bot } from "grammy";
import envConfig from "./config/env.config";
import { setupSession } from "./session/session";
import { IUser, MyContext } from "./types";
import query from "./config/axios.config";

// Menu imports
import { accountMenu } from "./menus/account.menu";
import { productMenu } from "./menus/product.menu";
import { categoryMenu } from "./menus/category.menu";

// Conversation imports
import { conversations, createConversation } from "@grammyjs/conversations";
import { categoryConversation } from "./conversations/category.conversation";
import { startConversation } from "./conversations/startConversation";
import { changeFirstNameConversation } from "./conversations/changeFirstNameConversation";
import { changeLastNameConversation } from "./conversations/changeLastNameConversation";
import { getUserConversation } from "./conversations/getUserConversation";
import { sendUserInfo } from "./helpers/sendUserInfo";

const bot = new Bot<MyContext>(envConfig.BOT_TOKEN);
bot.use(setupSession(bot.token));

// Menus
bot.use(categoryMenu);
bot.use(accountMenu);
categoryMenu.register(productMenu);

// Conversations
bot.use(conversations());
bot.use(createConversation(categoryConversation));
bot.use(createConversation(startConversation));
bot.use(createConversation(changeFirstNameConversation));
bot.use(createConversation(changeLastNameConversation));
bot.use(createConversation(getUserConversation));

// Commands
bot.api.setMyCommands([
  {
    command: "start",
    description: "Starts the bot",
  },
  {
    command: "category",
    description: "To see categories tap this command",
  },
  {
    command: "account",
    description: "Account settings",
  },
  {
    command: "searchuser",
    description: "Get any user having phone number",
  },
]);

bot.command("start", async (ctx) => {
  try {
    const userId = ctx.from?.id as number;
    const user = await query.get<IUser | null>(`/users/${userId}`);

    if (user.data) {
      ctx.session.userInfo = user.data;
      await ctx.reply(`Welcome ${user.data.lastName} ${user.data.firstName}!`);
    } else {
      await ctx.conversation.enter("startConversation");
    }
  } catch (error) {
    await ctx.reply("Something went wrong :(");
  }
});

bot.command("category", async (ctx) => {
  await ctx.conversation.enter("categoryConversation");
});

bot.command("account", async (ctx) => {
  try {
    const userId = ctx.from?.id as number;
    const { data: userInfo } = await query.get<IUser>(`/users/${userId}`);

    if (userInfo) {
      ctx.session.userInfo = userInfo;
      await sendUserInfo(ctx, userInfo);
    } else {
      await ctx.reply("Please sign up! /start");
    }
  } catch (error) {
    await ctx.reply("Something went wrong :(");
  }
});

bot.command("searchuser", async (ctx) => {
  await ctx.conversation.enter("getUserConversation");
});

// Error handling
bot.catch((error) => {
  console.log(error.message);
});

// Starting bot
bot.start({
  onStart() {
    console.log("Bot started");
  },
});

import { Bot } from "grammy";
import { MyContext, setupSession } from "./session/session";
import { conversations, createConversation } from "@grammyjs/conversations";
import { categoryConversation } from "./conversations/category.conversation";
import { categoryMenu } from "./menus/category.menu";
import { productMenu } from "./menus/product.menu";
import envConfig from "./config/env.config";

const bot = new Bot<MyContext>(envConfig.BOT_TOKEN);
bot.use(setupSession);

// Menus
bot.use(categoryMenu);
categoryMenu.register(productMenu);

// Conversations
bot.use(conversations());
bot.use(createConversation(categoryConversation));

bot.api.setMyCommands([
  {
    command: "start",
    description: "Starts the bot",
  },
  {
    command: "category",
    description: "To see categories tap this command",
  },
]);

bot.command("start", async (ctx) => {
  await ctx.reply("Welcome!");
});

bot.command("category", async (ctx) => {
  await ctx.conversation.enter("categoryConversation");
});

bot.catch((error) => {
  console.log(error.message);
});

bot.start({
  onStart(botInfo) {
    console.log("Bot started!");
  },
});

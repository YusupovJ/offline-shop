import { Conversation } from "@grammyjs/conversations";
import { MyContext } from "../session/session";
import { categories } from "../data";
import { categoryMenu } from "../menus/category.menu";

type MyConversation = Conversation<MyContext>;

export async function categoryConversation(conversation: MyConversation, ctx: MyContext) {
  await ctx.replyWithPhoto(categories[0].image, {
    reply_markup: categoryMenu,
    caption: categories[0].description,
  });
}

import { categories } from "../../data";
import { categoryMenu } from "../../menus/category.menu";
import { MyContext, MyConversation } from "../../types";

export async function getCategoryConversation(conversation: MyConversation, ctx: MyContext) {
	await ctx.replyWithPhoto(categories[0].image, {
		reply_markup: categoryMenu,
		caption: categories[0].description,
	});
}

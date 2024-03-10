import query from "../../config/axios.config";
import { categoryMenu } from "../../menus/category.menu";
import { ICategory, MyContext, MyConversation } from "../../types";

export async function getCategoryConversation(conversation: MyConversation, ctx: MyContext) {
	const { data } = await query.get("/category", {
		params: {
			limit: 1,
			page: ctx.session.category.page,
		},
	});

	const category = data.categories[0] as ICategory;

	if (!category) {
		await ctx.reply("There are no categories");
		return;
	}

	conversation.session.category.currentCategory = category;
	conversation.session.category.totalPages = data.pagination.totalPages;

	await ctx.replyWithPhoto(category.image, {
		caption: category.description,
		reply_markup: categoryMenu,
	});
}

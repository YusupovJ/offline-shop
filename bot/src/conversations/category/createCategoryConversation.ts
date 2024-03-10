import query from "../../config/axios.config";
import { ICategory, MyContext, MyConversation } from "../../types";

export async function createCategoryConversation(conversation: MyConversation, ctx: MyContext) {
	await ctx.reply("Enter the title:");
	const title = (await conversation.waitFor(":text")).message?.text;

	await ctx.reply("Now, write a description:");
	const description = (await conversation.waitFor(":text")).message?.text;

	await ctx.reply("And the last one is image:");
	const file = (await conversation.waitFor(":file")).message?.photo!;
	const image = file[file?.length - 1];

	const { data: newCategory } = await query.post<ICategory>("/category", {
		title,
		description,
		image: image.file_id,
	});

	await ctx.reply("You successfully created category!");

	await ctx.replyWithPhoto(newCategory.image, {
		caption: newCategory.description,
	});
}

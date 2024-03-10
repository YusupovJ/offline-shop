import { Menu } from "@grammyjs/menu";
import { ICategory, MyContext } from "../types";
import query from "../config/axios.config";
import { InputMediaBuilder } from "grammy";

const nextCategory = async (ctx: MyContext) => {
	const nextPage = ++ctx.session.category.page;

	const { data } = await query.get("/category", {
		params: {
			limit: 1,
			page: nextPage,
		},
	});

	const nextCategory = data.categories[0] as ICategory;

	ctx.session.category.currentCategory = nextCategory;

	await ctx.editMessageMedia(
		InputMediaBuilder.photo(nextCategory.image, {
			caption: nextCategory.description,
		})
	);
};

const prevCategory = async (ctx: MyContext) => {
	const prevPage = --ctx.session.category.page;

	const { data } = await query.get("/category", {
		params: {
			limit: 1,
			page: prevPage,
		},
	});

	const prevCategory = data.categories[0] as ICategory;

	ctx.session.category.currentCategory = prevCategory;

	await ctx.editMessageMedia(
		InputMediaBuilder.photo(prevCategory.image, {
			caption: prevCategory.description,
		})
	);
};

export const categoryMenu = new Menu<MyContext>("category__menu").dynamic((ctx, range) => {
	const category = ctx.session.category.currentCategory!;
	const totalPages = ctx.session.category.totalPages!;
	const page = ctx.session.category.page;

	range.text(category?.title);

	range.row();

	if (Number(ctx.session.category.totalPages) > 1) {
		const arrowLeft = page !== 1 ? "<" : " ";
		range.text(arrowLeft, async (ctx) => {
			if (page !== 1) {
				prevCategory(ctx);
			}
		});

		range.text(`${page} / ${totalPages}`);

		const arrowRight = page !== totalPages ? ">" : " ";
		range.text(arrowRight, async (ctx) => {
			if (page !== totalPages) {
				nextCategory(ctx);
			}
		});
	}

	if (ctx.session.user.me?.role === "admin") {
		range.row().text("Delete category", async (ctx) => {
			await query.delete(`/category/${category._id}`);

			ctx.session.category.totalPages = Number(ctx.session.category?.totalPages) - 1;

			if (!ctx.session.category.totalPages) {
				await ctx.deleteMessage();
				await ctx.reply("There are no categories");
				return;
			}

			if (page !== 1) {
				prevCategory(ctx);
			} else {
				nextCategory(ctx);
			}

			await ctx.reply("You successfully deleted category");
		});
	}
});
